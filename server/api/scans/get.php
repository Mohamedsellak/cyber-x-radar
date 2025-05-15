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
    // Get all scans
    $scans = $db->select("scans");
    
    // If the query was successful
    if ($scans !== false) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Scans retrieved successfully',
            'count' => count($scans),
            'data' => $scans
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to retrieve scans'
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
