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

  // if($_POST['category'] == "Undefined") {
  //   echo "awdasdaw";
  // }

  $param = $_POST['param'];

  $expParam = explode(":", $param);

  // DB에서 불러올 DATA를 저장할 변수.
  $data = "";

  if($expParam[0] == "category") {
    $category = $expParam[1];

    if($category == '전체') {
      $query = "SELECT store_name, store_favor, store_isWellbeing, store_isSingle, store_explain, store_category, store_code, store_main_image FROM store";
    } else {
      $query = "SELECT store_name, store_favor, store_isWellbeing, store_isSingle, store_explain, store_category, store_code, store_main_image FROM store WHERE store_category = '" . $category . "'";
    }
    $resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);

    while($row = mysqli_fetch_object($resource)) {
      $data = $row->store_name . "@" . $row->store_favor . "@" . $row->store_isWellbeing
      . "@" . $row->store_isSingle . "@" . $row->store_explain . "@" . $row->store_category
      . "@" . $row->store_code . "@" . $row->store_main_image . "|" . $data;
    }

    echo $data;

  } else if($expParam[0] == "name") {
    $name = $expParam[1];

    $query = "SELECT store_name, store_favor, store_isWellbeing, store_isSingle, store_explain, store_category, store_code, store_main_image FROM store WHERE store_name LIKE '%$name%'";

    $resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);

    $data = "";

    while($row = mysqli_fetch_object($resource)) {
      $data = $row->store_name . "@" . $row->store_favor . "@" . $row->store_isWellbeing
      . "@" . $row->store_isSingle . "@" . $row->store_explain . "@" . $row->store_category
      . "@" . $row->store_code . "@" . $row->store_main_image . "|" . $data;
    }

    echo $data;
  } else if($expParam[0] == "single") {
    $query = "SELECT store_name, store_favor, store_isWellbeing, store_isSingle, store_explain, store_category, store_code, store_main_image FROM store WHERE store_isSingle = 'yes'";

    $resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);

    $data = "";

    while($row = mysqli_fetch_object($resource)) {
      $data = $row->store_name . "@" . $row->store_favor . "@" . $row->store_isWellbeing
      . "@" . $row->store_isSingle . "@" . $row->store_explain . "@" . $row->store_category
      . "@" . $row->store_code . "@" . $row->store_main_image . "|" . $data;
    }

    echo $data;
  } else if($expParam[0] == "wellbeing") {
    $query = "SELECT store_name, store_favor, store_isWellbeing, store_isSingle, store_explain, store_category, store_code, store_main_image FROM store WHERE store_isWellbeing = 'yes'";

    $resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);

    $data = "";

    while($row = mysqli_fetch_object($resource)) {
      $data = $row->store_name . "@" . $row->store_favor . "@" . $row->store_isWellbeing
      . "@" . $row->store_isSingle . "@" . $row->store_explain . "@" . $row->store_category
      . "@" . $row->store_code . "@" . $row->store_main_image . "|" . $data;
    }

        echo $data;
  } else if($expParam[0] == "id") {
    $id = $expParam[1];
    // echo $id;

    $query = "SELECT member_favor_store FROM member_favor_store WHERE member_id = '" . $id . "'";

    $resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);

    $data_id = "";

    while($row = mysqli_fetch_object($resource)) {
      $data_id = $row->member_favor_store . "|" . $data_id;
    }

    $data_id_arr = explode("|", $data_id);
    $data = "";

    for($index = 0; $index <= (count($data_id_arr)-2); $index = $index + 1 ) {
        $query = "SELECT store_name, store_favor, store_isWellbeing, store_isSingle, store_explain, store_category, store_code, store_main_image FROM store WHERE store_code = '" . $data_id_arr[$index] . "'";

        $resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);

        while($row = mysqli_fetch_object($resource)) {
          $data = $row->store_name . "@" . $row->store_favor . "@" . $row->store_isWellbeing
          . "@" . $row->store_isSingle . "@" . $row->store_explain . "@" . $row->store_category
          . "@" . $row->store_code . "@" . $row->store_main_image . "|" . $data;
        }
    }

    echo $data;
  }
?>
