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
$auth->CheckAuth();

$db = new DbMethods();

// GET method only
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if company filter is provided
    if (isset($_GET['company'])) {
        $company = $_GET['company'];
        $tokens = $db->select("tokens", "company = ?", [$company]);
    } else {
        // Get all tokens
        $tokens = $db->select("tokens");
    }
    
    // If the query was successful
    if ($tokens !== false) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Tokens retrieved successfully',
            'count' => count($tokens),
            'data' => $tokens
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to retrieve tokens'
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
