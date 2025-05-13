<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../../db/db_methods.php';
require_once '../../includes/auth_middleware.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Authenticate request
$auth = new AuthMiddleware();
$userData = $auth->CheckAuth();

$db = new DbMethods();

// PUT method only
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Get raw data and log it for debugging
    $rawData = file_get_contents("php://input");
    error_log("Raw request data: " . $rawData);
    
    // Decode JSON with error checking
    $data = json_decode($rawData, true);
    
    // Check for JSON parsing errors
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid JSON data',
            'error' => json_last_error_msg()
        ]);
        exit();
    }
    
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'User ID is required']);
        exit();
    }
    
    $userId = $data['id'];
    
    // Check if user exists
    $user = $db->selectOne("users", $userId);
    
    if (empty($user)) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit();
    }
    
    // Prepare update data
    $updateData = [];
    
    if (isset($data['name'])) {
        $updateData['name'] = $data['name'];
    }
    
    if (isset($data['email'])) {
        $updateData['email'] = $data['email'];
    }
    
    if (isset($data['password']) && !empty($data['password'])) {
        $updateData['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
    }
    
    if (empty($updateData)) {
        http_response_code(400);
        echo json_encode(['error' => 'No data to update']);
        exit();
    }
    
    // Update timestamp
    $updateData['updated_at'] = date('Y-m-d H:i:s');
    
    // Update user
    $result = $db->update('users', $updateData, 'id = ?', [$userId]);
    
    if ($result) {
        echo json_encode([
            'status' => 'success',
            'message' => 'User updated successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update user']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>