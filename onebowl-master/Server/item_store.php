<?
  header("Access-Control-Allow-Origin: *");

  $db_host = "localhost";	// Mysql 데이터베이스를 가지고 있는 서버의 IP 할당.
  $db_user = "root";

  $db_password = "autoset";
  $db_name = "sedb";

  $conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);

  if(mysqli_connect_errno($conn)) {
    echo "데이터베이스 연결 실패: " . mysqli_connect_error();
  }

  $id = $_POST['id'];

  $query = "SELECT store_name, store_favor, store_tel, store_isWellbeing, store_isSingle, store_explain, store_category, store_opTime, store_isReserve, store_isDelivery, store_address, store_menu, store_lng, store_lat, store_code, store_main_image FROM store WHERE store_code = '" . $id . "'";

  $resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);

  $data_description = "";

  $data_image = "";

  while($row = mysqli_fetch_object($resource)) {
    $data_description = $row->store_name . "@" . $row->store_favor . "@" . $row->store_tel . "@" . $row->store_isWellbeing . "@"
    . $row->store_isSingle . "@" . $row->store_explain . "@" . $row->store_category . "@"
    . $row->store_opTime . "@" . $row->store_isReserve . "@" . $row->store_isDelivery . "@"
    . $row->store_address . "@" . $row->store_menu . "@" . $row->store_lng . "@" . $row->store_lat . "@" . $row->store_code . "@" . $row->store_main_image . "|" . $data_description;
  }

  $query = "SELECT store_image_url FROM store_image WHERE store_code = '" . $id . "'";

  $resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);

  while($row = mysqli_fetch_object($resource)) {
    $data_image = $row->store_image_url . "|" . $data_image;
  }

  $data = $data_description . $data_image;

  echo $data;
?>
