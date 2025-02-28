<?php
// Connect to the database
$conn = new mysqli("Users/aimenusuf/Downloads/Untitled.sqlite", "aimensiddiqui97@gmail.com", "@Siddiqui97", "Untitled.sqlite");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get search parameters
$cpt = $_GET['cpt'] ?? '';
$hospital = $_GET['hospital'] ?? '';

// Build the SQL query
$sql = "SELECT hospital, cpt, description, price FROM procedures WHERE 1=1";
if (!empty($cpt)) {
  $sql .= " AND cpt LIKE '%$cpt%'";
}
if (!empty($hospital)) {
  $sql .= " AND hospital LIKE '%$hospital%'";
}

// Fetch filtered data
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

echo json_encode($data);
$conn->close();
?>
