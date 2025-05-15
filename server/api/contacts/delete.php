<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
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

// DELETE method only
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get contact ID from query parameter
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Contact ID is required'
        ]);
        exit();
    }
    
    $contactId = $_GET['id'];
    
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
    
    // Delete contact
    $result = $db->delete('contacts', $contactId);
    
    if ($result) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Contact deleted successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to delete contact'
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
