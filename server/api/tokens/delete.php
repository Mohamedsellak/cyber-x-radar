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
$auth->CheckAuth();

$db = new DbMethods();

// DELETE method only
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get token ID from query params
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Token ID is required'
        ]);
        exit();
    }
    
    $tokenId = $_GET['id'];
    
    // Check if token exists
    $token = $db->selectOne("tokens", $tokenId);
    
    if (empty($token)) {
        http_response_code(404);
        echo json_encode([
            'status' => 'error',
            'message' => 'Token not found'
        ]);
        exit();
    }
    
    // Add debug logging
    error_log("Attempting to delete token with ID: $tokenId");
    
    // Delete the token - using the same method signature that works for users
    $result = $db->delete('tokens', $tokenId);
    
    // Debug the result
    error_log("Delete operation result: " . ($result ? "true" : "false"));
    
    if ($result) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Token deleted successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to delete token from database'
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
