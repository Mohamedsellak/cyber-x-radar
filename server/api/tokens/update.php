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
$auth->CheckAuth();

$db = new DbMethods();

// PUT method only
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Get raw data
    $rawData = file_get_contents("php://input");
    
    // Decode JSON with error checking
    $data = json_decode($rawData, true);
    
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Token ID is required'
        ]);
        exit();
    }
    
    $tokenId = $data['id'];
    
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
    
    // Prepare update data
    $updateData = [];
    
    if (isset($data['company'])) {
        $updateData['company'] = $data['company'];
    }
    
    if (isset($data['name'])) {
        $updateData['name'] = $data['name'];
    }
    
    // Regenerate token if requested
    if (isset($data['regenerate']) && $data['regenerate'] === true) {
        $updateData['token'] = bin2hex(random_bytes(32));
    }
    
    if (empty($updateData)) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'No data to update'
        ]);
        exit();
    }
    
    // Update token
    $result = $db->update('tokens', $updateData, 'id = ?', [$tokenId]);
    
    if ($result !== false) {
        // Get the updated token
        $updatedToken = $db->selectOne("tokens", $tokenId);
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Token updated successfully',
            'data' => $updatedToken
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to update token'
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
