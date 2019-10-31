<?php
include 'DBConfig.php';

$con = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$S_ID = $obj['pegawai_id'];
$S_Nama = $obj['pegawai_nama'];
$S_Gaji = $obj['pegawai_gaji'];

$Sql_Query = "UPDATE pegawai SET pegawai_nama= '$S_Nama', pegawai_gaji = '$S_Gaji' WHERE pegawai_id = $S_ID";

if (mysqli_query($con, $Sql_Query)) {
    $MSG = 'Data Berhasil Diubah.';
    $json = json_encode($MSG);
    echo $json;
} else {
    echo 'Data Gagal Diubah';
}
mysqli_close($con);
