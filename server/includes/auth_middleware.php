<?php
// Simple JWT implementation with minimal dependencies
// Requires the firebase/php-jwt library: composer require firebase/php-jwt

require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// If this file needs to access the database, use the correct path
// require_once __DIR__ . '/../db/db_methods.php';

class AuthMiddleware {
    private $secret_key = "mNy72bdALwvJxUpDDNgVsyZMrM7smfK9";
    
    /**
     * Authenticate API request using JWT token
     */
    public function authenticate() {
        try {
            // Get authorization header
            $headers = $this->getAuthorizationHeader();
            if (!$headers || !preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return false; // Changed from echo false
            }
            
            $token = $matches[1];
            
            // Decode and verify token - this will throw exceptions if token is invalid
            $decoded = JWT::decode($token, new Key($this->secret_key, 'HS256'));
            
            // At this point, token is valid. Now verify the decoded data structure
            if (!isset($decoded->data) || !isset($decoded->data->id) || 
                !isset($decoded->data->name) || !isset($decoded->data->email)) {
                return false; // Changed from echo false
            }
            
            // Return user data
            return [
                'id' => $decoded->data->id,
                'name' => $decoded->data->name,
                'email' => $decoded->data->email
            ];
            
        } catch (\Exception $e) {
            return false; // Changed from echo false
        }
    }

    public function CheckAuth() {
        $userData = $this->authenticate();

        if (!$userData) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized access']);
            exit();
        }

        return $userData;
    }

    /**
     * Generate token with minimal configuration
     * 
     * @param array $user User data to encode in token
     * @return string JWT token
     */
    public function generateToken($user) {
        // Create a proper token payload with timestamps that will make each token unique
        $payload = [
            'iat' => time(),     // "Issued At" - The timestamp when the token was created
            'exp' => time() + 3600, // "Expiration Time" - When the token will expire (1 hour from now)
            'nbf' => time(),     // "Not Before" - Token cannot be used before this time
            'jti' => bin2hex(random_bytes(16)), // "JWT ID" - Unique identifier for this token
            'data' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ];
        
        // Use the JWT library to encode the token
        return JWT::encode($payload, $this->secret_key, 'HS256');
    }
    
    /**
     * Get authorization header from request
     */
    private function getAuthorizationHeader() {
        $headers = null;
        
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER['Authorization']);
        } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        
        return $headers;
    }
    
    /**
     * Helper method to enforce authentication with enhanced error handling
     * 
     * @param bool $returnJson Whether to return JSON error or throw exception
     * @return array The authenticated user data
     */
    public function enforceAuth($returnJson = true) {
        $userData = $this->authenticate();

        if (!$userData) {
            if ($returnJson) {
                // Send standardized JSON response
                header('Content-Type: application/json');
                http_response_code(401);
                echo json_encode([
                    'status' => 'error',
                    'code' => 401,
                    'message' => 'Unauthorized access',
                    'timestamp' => date('Y-m-d H:i:s')
                ]);
                exit;
            } else {
                // For API consumers that prefer exceptions
                throw new \Exception('Authentication failed', 401);
            }
        }

        // Log successful authentication if needed
        // error_log("User {$userData['id']} authenticated successfully");
        
        return $userData;
    }
    
}
?>
