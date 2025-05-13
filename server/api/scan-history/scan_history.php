<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../includes/db_methods.php';
require_once '../includes/auth_middleware.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Authenticate request
$auth = new AuthMiddleware();
$userData = $auth->authenticate();

if (!$userData) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized access']);
    exit();
}

$db = new DbMethods();
$method = $_SERVER['REQUEST_METHOD'];
$userId = $userData['user_id'];

switch ($method) {
    case 'GET':
        // Get all scan history for the user or a specific scan
        if (isset($_GET['id'])) {
            $scanId = $_GET['id'];
            $query = "SELECT * FROM scan_history WHERE id = ? AND user_id = ?";
            $scan = $db->select($query, [$scanId, $userId]);
            
            if (empty($scan)) {
                http_response_code(404);
                echo json_encode(['error' => 'Scan not found']);
            } else {
                echo json_encode(['data' => $scan[0]]);
            }
        } else {
            $query = "SELECT * FROM scan_history WHERE user_id = ? ORDER BY scan_date DESC";
            $scans = $db->select($query, [$userId]);
            echo json_encode(['data' => $scans]);
        }
        break;
    
    case 'POST':
        // Add a new scan record
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validate input
        if (!isset($data['target']) || !isset($data['scan_type'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Target and scan type are required']);
            exit();
        }
        
        // Prepare scan data
        $scanData = [
            'user_id' => $userId,
            'target' => $data['target'],
            'scan_type' => $data['scan_type'],
            'scan_date' => date('Y-m-d H:i:s'),
            'results' => isset($data['results']) ? json_encode($data['results']) : null,
            'status' => $data['status'] ?? 'completed'
        ];
        
        // Insert scan record
        $scanId = $db->insert('scan_history', $scanData);
        
        if ($scanId) {
            http_response_code(201);
            echo json_encode([
                'message' => 'Scan record created successfully',
                'scan_id' => $scanId
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create scan record']);
        }
        break;
        
    case 'DELETE':
        // Delete a scan record
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Scan ID is required']);
            exit();
        }
        
        $scanId = $_GET['id'];
        
        // Check if scan exists and belongs to the user
        $scan = $db->select("SELECT id FROM scan_history WHERE id = ? AND user_id = ?", [$scanId, $userId]);
        
        if (empty($scan)) {
            http_response_code(404);
            echo json_encode(['error' => 'Scan not found']);
            exit();
        }
        
        // Delete scan
        $result = $db->delete('scan_history', 'id = ? AND user_id = ?', [$scanId, $userId]);
        
        if ($result) {
            echo json_encode(['message' => 'Scan record deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete scan record']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
