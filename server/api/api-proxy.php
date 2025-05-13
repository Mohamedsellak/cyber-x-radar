<?php
// Set CORS headers if needed
header("Access-Control-Allow-Origin: *"); // Or restrict to your domain
header("Content-Type: application/json");

// Store API token securely (never exposed to client)
$API_ACCESS_TOKEN = "811582d589905a478a0e415a79e2e816";

// Get the domain from the request
$domain = isset($_GET['domain']) ? $_GET['domain'] : '';

if (empty($domain)) {
    http_response_code(400);
    echo json_encode(["error" => "Domain parameter is required"]);
    exit;
}

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

// Return the API response with the same status code
http_response_code($httpCode);
echo $response;
?>