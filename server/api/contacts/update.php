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
    // Get raw data
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Check if contact ID is provided
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Contact ID is required'
        ]);
        exit();
    }
    
    $contactId = $data['id'];
    
    // Check if contact exists
    $contact = $db->selectOne("contacts", $contactId);
    
    if (empty($contact)) {
        http_response_code(404);
        echo json_encode([
            'status' => 'error',
            'message' => 'Contact not found'
        ]);
        exit();
    }
    
    // Prepare update data
    $updateData = [];
    
    if (isset($data['name'])) {
        $updateData['name'] = $data['name'];
    }
    
    if (isset($data['company_name'])) {
        $updateData['company_name'] = $data['company_name'];
    }
    
    if (isset($data['email'])) {
        // Validate email format
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Invalid email format'
            ]);
            exit();
        }
        $updateData['email'] = $data['email'];
    }
    
    if (isset($data['inquiry_type'])) {
        $updateData['inquiry_type'] = $data['inquiry_type'];
    }
    
    if (isset($data['message'])) {
        $updateData['message'] = $data['message'];
    }
    
    if (empty($updateData)) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'No data to update'
        ]);
        exit();
    }
    
    // Add updated timestamp
    $updateData['updated_at'] = date('Y-m-d H:i:s');
    
    // Update contact
    $result = $db->update('contacts', $updateData, 'id = ?', [$contactId]);
    
    if ($result !== false) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Contact updated successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to update contact'
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
