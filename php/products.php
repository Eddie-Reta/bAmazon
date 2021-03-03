<?php
//create database and connection

header("Access-Control-Allow-Origin: *");

$servername="localhost";
$username="root";
$password="iamthe1";

$connection = new mysqli($servername, $username, $password);

if($connection -> connect_error) {
    echo "Failed to connect to MySQL: " . $connection -> connect_error;
  exit();
}

echo "connected Successfully\n";

// Return name of current default database

$sql = "CREATE DATABASE IF NOT EXISTS bamazon";

if($connection->query($sql) === TRUE) {

    $connection->select_db("bamazon");

    $sql = "CREATE TABLE IF NOT EXISTS Products (
             id INT PRIMARY KEY NOT NULL,
             product VARCHAR(40) NOT NULL,
             info VARCHAR(40) NOT NULL,
             price DECIMAL(10,2),
             link VARCHAR(500)
             )";
    
    $connection->query($sql);

    };

 
$ex = ["Example code." => "examp"];
echo json_encode($ex);

echo "Created or Found Database!\n";

$connection->close();
