<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Fix the paths to correctly point to the db directory
require_once '../../db/db_methods.php';
require_once '../../includes/auth_middleware.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db = new DbMethods();
$auth = new AuthMiddleware();

// Login endpoint
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get posted data
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['email']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Email and password are required',
            'received' => $data
        ]);
        exit();
    }
    
    $email = $data['email'];
    $password = $data['password'];
    
    // Log the authentication attempt
    error_log("Login attempt for email: $email");
    
    // Fetch user from database with prepared statement to prevent SQL injection
    $users = $db->select("users", "email = ?", [$email]);
    
    // Debug response
    error_log("DB query response: " . print_r($users, true));
    
    if (empty($users)) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
        exit();
    }
    
    $user = $users[0];
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
        exit();
    }

    // Never pass the password hash to the token generator
    $userData = [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email']
    ];

    // Generate new token with proper expiration
    
    $jwt = $auth->generateToken($userData);
    
    // Calculate expiration time for the response
    $expirationTime = time() + 3600; // 1 hour from now
    
    // Return token and user info
    echo json_encode([
        'status' => 'success',
        'message' => 'Login successful',
        'token' => $jwt,
        'user' => $userData,
        'expires' => $expirationTime
    ]);
    
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
?>
