<?php
require_once __DIR__ . '/db_connect.php';

class DbMethods {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    
    /**
     * Execute a SELECT query
     * 
     * @param string $table Table name
     * @param string $where Optional WHERE clause
     * @param array $params Optional parameters for prepared statement
     * @return array|false Result set as associative array or false on failure
     */
    public function select($table, $where = "", $params = []) {
        try {
            $query = "SELECT * FROM " . $table;
            if (!empty($where)) {
                $query .= " WHERE " . $where;
            }
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Select error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Execute a SELECT query and return single row
     * 
     * @param string $table Table name
     * @param int $id ID of the record to retrieve
     * @return array|false Single row as associative array or false on failure
     */
    public function selectOne($table, $id) {
        try {
            $query = "SELECT * FROM " . $table . " WHERE id = ?";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("SelectOne error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Execute a custom SELECT query
     * 
     * @param string $query SQL query
     * @param array $params Parameters for prepared statement
     * @return array|false Result set as associative array or false on failure
     */
    public function query($query, $params = []) {
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Query error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Execute an INSERT query
     * 
     * @param string $table Table name
     * @param array $data Associative array of column => value pairs
     * @return int|false Last insert ID or false on failure
     */
    public function insert($table, $data) {
        try {
            $columns = implode(", ", array_keys($data));
            $placeholders = ":" . implode(", :", array_keys($data));
            
            $query = "INSERT INTO $table ($columns) VALUES ($placeholders)";
            $stmt = $this->conn->prepare($query);
            
            foreach ($data as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }
            
            $stmt->execute();
            return $this->conn->lastInsertId();
        } catch (PDOException $e) {
            error_log("Insert error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Execute an UPDATE query
     * 
     * @param string $table Table name
     * @param array $data Associative array of column => value pairs
     * @param string $where WHERE clause
     * @param array $params Parameters for WHERE clause
     * @return int|false Number of affected rows or false on failure
     */
    public function update($table, $data, $where, $params = []) {
        try {
            $setClauses = [];
            foreach (array_keys($data) as $column) {
                $setClauses[] = "$column = :$column";
            }

            $setClause = implode(", ", $setClauses);
            $query = "UPDATE $table SET $setClause WHERE $where";
            
            $stmt = $this->conn->prepare($query);
            
            // Bind SET values
            foreach ($data as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }
            
            // Bind WHERE values
            foreach ($params as $key => $value) {
                if (is_int($key)) {
                    $paramIndex = $key + 1;
                    $stmt->bindValue($paramIndex, $value);
                } else {
                    $stmt->bindValue(":$key", $value);
                }
            }
            
            $stmt->execute();
            return $stmt->rowCount();
        } catch (PDOException $e) {
            error_log("Update error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Execute a DELETE query
     * 
     * @param string $table Table name
     * @param string $where WHERE clause
     * @param array $params Parameters for WHERE clause
     * @return int|false Number of affected rows or false on failure
     */
    public function delete($table, $where, $params = []) {
        try {
            $query = "DELETE FROM $table WHERE $where";
            $stmt = $this->conn->prepare($query);
            $stmt->execute($params);
            return $stmt->rowCount();
        } catch (PDOException $e) {
            error_log("Delete error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Execute a custom query
     * 
     * @param string $query SQL query with direct values
     * @return int|false Number of affected rows for UPDATE/DELETE or false on failure
     */
    public function executeQuery($query) {
        try {
            return $this->conn->exec($query);
        } catch (PDOException $e) {
            error_log("Query error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Begin a transaction
     */
    public function beginTransaction() {
        $this->conn->beginTransaction();
    }
    
    /**
     * Commit a transaction
     */
    public function commit() {
        $this->conn->commit();
    }
    
    /**
     * Rollback a transaction
     */
    public function rollback() {
        $this->conn->rollBack();
    }
    
    /**
     * Close the database connection
     */
    public function __destruct() {
        $this->db->closeConnection();
    }
}
?>