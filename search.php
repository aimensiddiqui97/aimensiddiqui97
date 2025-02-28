<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("/Users/aimenusuf/Downloads/Untitled.sqlite", "aimensiddiqui97@gmail.com", "@Siddiqui97", "healthrates_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$cpt = isset($_GET['cpt']) ? $_GET['cpt'] : '';
$hospital = isset($_GET['hospital']) ? $_GET['hospital'] : '';

$sql = "SELECT * FROM procedures WHERE 1=1";

if (!empty($cpt)) {
    $sql .= " AND cpt_code LIKE '%$cpt%'";
}
if (!empty($hospital)) {
    $sql .= " AND hospital LIKE '%$hospital%'";
}

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>
