<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
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
        // Get all contacts for the user or a specific contact
        if (isset($_GET['id'])) {
            $contactId = $_GET['id'];
            $query = "SELECT * FROM contacts WHERE id = ? AND user_id = ?";
            $contact = $db->select($query, [$contactId, $userId]);
            
            if (empty($contact)) {
                http_response_code(404);
                echo json_encode(['error' => 'Contact not found']);
            } else {
                echo json_encode(['data' => $contact[0]]);
            }
        } else {
            $query = "SELECT * FROM contacts WHERE user_id = ? ORDER BY name ASC";
            $contacts = $db->select($query, [$userId]);
            echo json_encode(['data' => $contacts]);
        }
        break;
    
    case 'POST':
        // Add a new contact
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validate input
        if (!isset($data['name']) || !isset($data['email'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name and email are required']);
            exit();
        }
        
        // Prepare contact data
        $contactData = [
            'user_id' => $userId,
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'company' => $data['company'] ?? null,
            'notes' => $data['notes'] ?? null,
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        // Insert contact
        $contactId = $db->insert('contacts', $contactData);
        
        if ($contactId) {
            http_response_code(201);
            echo json_encode([
                'message' => 'Contact created successfully',
                'contact_id' => $contactId
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create contact']);
        }
        break;
        
    case 'PUT':
        // Update a contact
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Contact ID is required']);
            exit();
        }
        
        $contactId = $data['id'];
        
        // Check if contact exists and belongs to the user
        $contact = $db->select("SELECT id FROM contacts WHERE id = ? AND user_id = ?", [$contactId, $userId]);
        
        if (empty($contact)) {
            http_response_code(404);
            echo json_encode(['error' => 'Contact not found']);
            exit();
        }
        
        // Prepare update data
        $updateData = [];
        
        if (isset($data['name'])) {
            $updateData['name'] = $data['name'];
        }
        
        if (isset($data['email'])) {
            $updateData['email'] = $data['email'];
        }
        
        if (isset($data['phone'])) {
            $updateData['phone'] = $data['phone'];
        }
        
        if (isset($data['company'])) {
            $updateData['company'] = $data['company'];
        }
        
        if (isset($data['notes'])) {
            $updateData['notes'] = $data['notes'];
        }
        
        if (empty($updateData)) {
            http_response_code(400);
            echo json_encode(['error' => 'No data to update']);
            exit();
        }
        
        // Update contact
        $result = $db->update('contacts', $updateData, 'id = ? AND user_id = ?', [$contactId, $userId]);
        
        if ($result) {
            echo json_encode(['message' => 'Contact updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update contact']);
        }
        break;
        
    case 'DELETE':
        // Delete a contact
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Contact ID is required']);
            exit();
        }
        
        $contactId = $_GET['id'];
        
        // Check if contact exists and belongs to the user
        $contact = $db->select("SELECT id FROM contacts WHERE id = ? AND user_id = ?", [$contactId, $userId]);
        
        if (empty($contact)) {
            http_response_code(404);
            echo json_encode(['error' => 'Contact not found']);
            exit();
        }
        
        // Delete contact
        $result = $db->delete('contacts', 'id = ? AND user_id = ?', [$contactId, $userId]);
        
        if ($result) {
            echo json_encode(['message' => 'Contact deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete contact']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
