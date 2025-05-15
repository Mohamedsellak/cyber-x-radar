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
// $auth = new AuthMiddleware();
// $auth->CheckAuth();

$db = new DbMethods();

// POST method only
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw data
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Validate required fields
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        // Check if required fields are present
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Name, email, company_name, inquiry_type, and message are required'
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
    
    // Prepare contact data
    $contactData = [
        'name' => $data['name'],
        'company_name' => $data['company_name'] ?? null,
        'email' => $data['email'],
        'inquiry_type' => $data['inquiry_type'] ?? null,
        'message' => $data['message'],
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    // Insert contact
    $contactId = $db->insert('contacts', $contactData);
    
    if ($contactId) {
        http_response_code(201);
        echo json_encode([
            'status' => 'success',
            'message' => 'Contact created successfully',
            'contact_id' => $contactId
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to create contact'
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
