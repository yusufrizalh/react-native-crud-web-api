<?php
include 'DBConfig.php';

$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
if ($conn->connect_error) {
    die("Koneksi Gagal: " . $conn->connect_error);
}

$sql = "SELECT * FROM pegawai";

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while ($row[] = $result->fetch_assoc()) {
        $item = $row;
        $json = json_encode($item);
    }
} else {
    echo "Tidak ada data ditemukan.";
}
echo $json;
$conn->close();
