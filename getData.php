<?php
// Connect to the database
$conn = new mysqli("Users/aimenusuf/Downloads/Untitled.sqlite", "aimensiddiqui97@gmail.com", "Untitled.sqlite");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fetch all data
$sql = "SELECT hospital, cpt, description, price FROM procedures";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>
