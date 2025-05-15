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
    // Get scan ID from query parameter
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Scan ID is required'
        ]);
        exit();
    }
    
    $scanId = $_GET['id'];
    
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
    
    // Delete scan
    $result = $db->delete('scans', $scanId);
    
    if ($result) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Scan deleted successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to delete scan'
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
