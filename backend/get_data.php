<?php
include('config.php');
header('Content-Type: application/json');

// Ambil 10 data terakhir dari tabel 'sensor'
$sql = "SELECT temperature, humidity, created_at FROM sensor ORDER BY created_at DESC LIMIT 10";
$result = $conn->query($sql);

$data = [];
if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}

echo json_encode($data);
?>
