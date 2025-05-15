<?php
// Set CORS headers if needed
header("Access-Control-Allow-Origin: *"); // Or restrict to your domain
header("Content-Type: application/json");

// Include database methods
require_once '../db/db_methods.php';

// Get the domain and token from the request
$domain = isset($_GET['domain']) ? $_GET['domain'] : '';
$token = isset($_GET['token']) ? $_GET['token'] : '';

// Validate required parameters
if (empty($domain)) {
    http_response_code(400);
    echo json_encode(["error" => "Domain parameter is required"]);
    exit;
}

if (empty($token)) {
    http_response_code(401);
    echo json_encode(["error" => "API token is required"]);
    exit;
}

// Create database connection
$db = new DbMethods();

// Check if the token exists in the database
$validToken = $db->select("tokens", "token = ?", [$token]);

if (empty($validToken)) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid or expired API token"]);
    exit;
}

// Token is valid, proceed with the API call
// Store API token securely (never exposed to client)
$API_ACCESS_TOKEN = "811582d589905a478a0e415a79e2e816";

// Build the actual API URL with the secure token
$apiUrl = "https://msps-proxy.public.dexpose.io/getDomainStatistics?root_domain=" . 
          urlencode($domain) . 
          "&access_token=" . $API_ACCESS_TOKEN;

// Make the request to the external API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$response= [
    'status' => $httpCode,
    'message' => 'Domain statistics retrieved successfully',
    'domain' => $domain,
    'date' => date('Y-m-d H:i:s'),
    'data' => json_decode($response, true)
];
// Return the API response with the same status code
http_response_code($httpCode);
echo json_encode($response);
?>






