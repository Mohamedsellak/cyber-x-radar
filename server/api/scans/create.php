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

// // Authenticate request
// $auth = new AuthMiddleware();
// $userData = $auth->CheckAuth();

$db = new DbMethods();

// POST method only
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw data
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Validate required fields
    if (!isset($data['domain_name']) || !isset($data['name']) || !isset($data['email']) || !isset($data['phone'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Domain name, name, email, and phone are required'
        ]);
        exit();
    }
    
    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid email format'
        ]);
        exit();
    }
    
    // Prepare scan data
    $scanData = [
        'domain_name' => $data['domain_name'],
        'name' => $data['name'],
        'email' => $data['email'],
        'phone' => $data['phone'],
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    // Insert scan
    $scanId = $db->insert('scans', $scanData);
    
    if ($scanId) {
        http_response_code(201);
        echo json_encode([
            'status' => 'success',
            'message' => 'Scan created successfully',
            'scan_id' => $scanId
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to create scan'
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
