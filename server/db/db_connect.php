<?php
require_once __DIR__ . '/db_config.php';
class Database {
    private $connection;
    
    // Constructor - establish connection when object is created
    public function __construct() {
        $this->connect();
    }
    
    // Connect to the database
    private function connect() {
        try {
            // Create a PDO connection
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_PERSISTENT => true
            ];
            
            $this->connection = new PDO($dsn, DB_USERNAME, DB_PASSWORD, $options);
            
        } catch (PDOException $e) {
            // Log error instead of exposing details in production
            error_log("Database connection error: " . $e->getMessage());
            throw new Exception("Database connection failed. Please try again later.");
        }
    }
    
    // Get the database connection
    public function getConnection() {
        return $this->connection;
    }
    
    // Close the database connection
    public function closeConnection() {
        $this->connection = null;
    }
}
?>
