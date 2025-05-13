<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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
$auth->CheckAuth();

$db = new DbMethods();

// GET method only
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get a specific user by ID
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'User ID is required'
        ]);
        exit();
    }
    
    $userId = $_GET['id'];
    
    // Validate user ID
    if (!is_numeric($userId) || $userId <= 0) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid user ID'
        ]);
        exit();
    }
    
    // Query to get user by ID
    $user = $db->selectOne("users", $userId);
    
    if (empty($user)) {
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'message' => 'User not found',
            'data' => null
        ]);
    } else {
        // Remove password for security
        unset($user['password']);
        
        echo json_encode([
            'status' => 'success',
            'message' => 'User retrieved successfully',
            'data' => $user
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed'
    ]);
}
?>
