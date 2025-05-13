<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

// POST method only
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw data and log it for debugging
    $rawData = file_get_contents("php://input");
    
    // Decode JSON with error checking
    $data = json_decode($rawData, true);
    
    // Validate required fields
    if (!isset($data['name']) || !isset($data['password']) || !isset($data['email'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'All fields are required',
        ]);
        exit();
    }
    
    // Check if email already exists
    $existing = $db->select("users", "email = ?", [$data['email']]);
    
    if (!empty($existing)) {
        http_response_code(409);
        echo json_encode([
            'status' => 'error',
            'message' => 'Email already exists'
        ]);
        exit();
    }
    
    // Hash password
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    
    // Prepare user data
    $userData = [
        'name' => $data['name'],
        'password' => $hashedPassword,
        'email' => $data['email'],
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    // Insert user
    $userId = $db->insert('users', $userData);
    
    if ($userId) {
        http_response_code(201);
        echo json_encode([
            'status' => 'success',
            'message' => 'User created successfully',
            'user_id' => $userId
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to create user'
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