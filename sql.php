<?php
$mysqli = new mysqli("sql11.freesqldatabase.com","sql11481004","PSkdDGHXuh","sql11481004");
if($mysqli->connect_error){
    exit('Could not connect');
}

$sql = "SELECT * FROM EersteTabel";

$stmt = $mysqli->prepare($sql);
$stmt->execute();
$Ids = $stmt->fetchAll();
$stmt->close();

echo "<div>$Ids</div>";
?>