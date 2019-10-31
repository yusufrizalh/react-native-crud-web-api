<?php
include 'DBConfig.php';

$con = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$S_Nama = $obj['pegawai_nama'];
$S_Gaji = $obj['pegawai_gaji'];

$Sql_Query = "insert into pegawai (pegawai_nama, pegawai_gaji) values ('$S_Nama','$S_Gaji')";

if (mysqli_query($con, $Sql_Query)) {
    $MSG = 'Data Berhasil Disimpan.';
    $json = json_encode($MSG);
    echo $json;
} else {
    echo 'Data Gagal Disimpan';
}
mysqli_close($con);
