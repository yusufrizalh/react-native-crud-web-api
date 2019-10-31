<?php

include 'DBConfig.php';
$con = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$S_ID = $obj['pegawai_id'];

$Sql_Query = "DELETE FROM pegawai WHERE pegawai_id = '$S_ID'";

if (mysqli_query($con, $Sql_Query)) {
    $MSG = 'Data Berhasil Dihapus.';
    $json = json_encode($MSG);
    echo $json;
} else {
    echo 'Data Gagal Dihapus';
}
mysqli_close($con);
