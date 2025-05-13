<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Fix the paths - the leading slash was causing it to look at the filesystem root
require_once '../../db/db_methods.php';
require_once '../../includes/auth_middleware.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Authenticate request with improved error handling
$auth = new AuthMiddleware();
$userData = $auth->authenticate();

if (!$userData) {
    // Return detailed error response for invalid tokens
    header('Content-Type: application/json');
    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => 'Unauthorized access',
        'details' => 'Invalid or expired authentication token',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// Log successful authentication
error_log("User {$userData['id']} authenticated successfully");

// Proceed with API logic for authenticated user
$db = new DbMethods();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all users or a specific user
        if (isset($_GET['id'])) {
            $userId = $_GET['id'];
            $query = "SELECT id, username, email, role, created_at FROM users WHERE id = ?";
            $user = $db->select($query, [$userId]);
            
            if (empty($user)) {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
            } else {
                echo json_encode(['data' => $user[0]]);
            }
        } else {
            $query = "SELECT id, username, email, role, created_at FROM users ORDER BY id DESC";
            $users = $db->select($query);
            echo json_encode(['data' => $users]);
        }
        break;
    
    case 'POST':
        // Add a new user
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validate input
        if (!isset($data['username']) || !isset($data['password']) || !isset($data['email'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Username, password and email are required']);
            exit();
        }
        
        // Check if username or email already exists
        $checkQuery = "SELECT id FROM users WHERE username = ? OR email = ?";
        $existing = $db->select($checkQuery, [$data['username'], $data['email']]);
        
        if (!empty($existing)) {
            http_response_code(409);
            echo json_encode(['error' => 'Username or email already exists']);
            exit();
        }
        
        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        
        // Prepare user data
        $userData = [
            'username' => $data['username'],
            'password' => $hashedPassword,
            'email' => $data['email'],
            'role' => $data['role'] ?? 'user',
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        // Insert user
        $userId = $db->insert('users', $userData);
        
        if ($userId) {
            http_response_code(201);
            echo json_encode([
                'message' => 'User created successfully',
                'user_id' => $userId
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create user']);
        }
        break;
        
    case 'PUT':
        // Update a user
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'User ID is required']);
            exit();
        }
        
        $userId = $data['id'];
        
        // Check if user exists
        $user = $db->select("SELECT id FROM users WHERE id = ?", [$userId]);
        
        if (empty($user)) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            exit();
        }
        
        // Prepare update data
        $updateData = [];
        
        if (isset($data['email'])) {
            $updateData['email'] = $data['email'];
        }
        
        if (isset($data['role'])) {
            $updateData['role'] = $data['role'];
        }
        
        if (isset($data['password']) && !empty($data['password'])) {
            $updateData['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }
        
        if (empty($updateData)) {
            http_response_code(400);
            echo json_encode(['error' => 'No data to update']);
            exit();
        }
        
        // Update user
        $result = $db->update('users', $updateData, 'id = ?', [$userId]);
        
        if ($result) {
            echo json_encode(['message' => 'User updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update user']);
        }
        break;
        
    case 'DELETE':
        // Delete a user
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'User ID is required']);
            exit();
        }
        
        $userId = $_GET['id'];
        
        // Check if user exists
        $user = $db->select("SELECT id FROM users WHERE id = ?", [$userId]);
        
        if (empty($user)) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            exit();
        }
        
        // Delete user
        $result = $db->delete('users', 'id = ?', [$userId]);
        
        if ($result) {
            echo json_encode(['message' => 'User deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete user']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
