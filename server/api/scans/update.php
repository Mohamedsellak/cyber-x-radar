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
    
    // Check if scan ID is provided
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Scan ID is required'
        ]);
        exit();
    }
    
    $scanId = $data['id'];
    
    // Check if scan exists
    $scan = $db->selectOne("scans", $scanId);
    
    if (empty($scan)) {
        http_response_code(404);
        echo json_encode([
            'status' => 'error',
            'message' => 'Scan not found'
        ]);
        exit();
    }
    
    // Prepare update data
    $updateData = [];
    
    if (isset($data['domain_name'])) {
        $updateData['domain_name'] = $data['domain_name'];
    }
    
    if (isset($data['name'])) {
        $updateData['name'] = $data['name'];
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
    
    if (isset($data['phone'])) {
        $updateData['phone'] = $data['phone'];
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
    
    // Update scan
    $result = $db->update('scans', $updateData, 'id = ?', [$scanId]);
    
    if ($result !== false) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Scan updated successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to update scan'
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
