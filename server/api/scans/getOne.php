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
$userData = $auth->CheckAuth();

$db = new DbMethods();

// GET method only
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get a specific scan by ID
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Scan ID is required'
        ]);
        exit();
    }
    
    $scanId = $_GET['id'];
    
    // Validate scan ID
    if (!is_numeric($scanId) || $scanId <= 0) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid scan ID'
        ]);
        exit();
    }
    
    // Get the scan
    $scan = $db->selectOne("scans", $scanId);
    
    if (empty($scan)) {
        http_response_code(404);
        echo json_encode([
            'status' => 'error',
            'message' => 'Scan not found'
        ]);
        exit();
    }
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Scan retrieved successfully',
        'data' => $scan
    ]);
} else {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed'
    ]);
}
?>
