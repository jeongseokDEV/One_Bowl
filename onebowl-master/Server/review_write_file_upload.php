<?
  //업로드한 파일을 저장할 디렉토리
  $save_dir = "../Server/images/review/";

  //파일이 HTTP POST 방식을 통해 정상적으로 업로드되었는지 확인한다.
  if(is_uploaded_file($_FILES["input_file"]["tmp_name"])) {
    // echo "업로드한 파일명 : ".$_FILES["input_file"]["name"]."<br />";
    // echo "업로드한 파일의 크기 : ".$_FILES["input_file"]["size"]."<br />";
    // echo "업로드한 파일의 MIME TYPE : ".$_FILES["input_file"]["type"]."<br />";
    // echo "임시 디렉토리에 저장된 파일명 : ".$_FILES["input_file"]["tmp_name"]."<br />";

    echo "http://61.245.230.97/SE/Server/images/review/" . $_FILES["input_file"]["name"];
  } else {
    echo "error";
  }

  //파일을 저장할 디렉토리 및 파일명
  $dest = $save_dir.$_FILES["input_file"]["name"];

  //파일을 지정한 디렉토리에 저장
  if(!move_uploaded_file($_FILES["input_file"]["tmp_name"], $dest)) {
  }
?>
