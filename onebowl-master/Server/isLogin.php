<?
  // 쿠키를 통해 로그인 여부 확인하고 로그인 시만 서비스를 이용할 수 있게.
  if(empty($_COOKIE['login_id']) || $_COOKIE['login_id'] == "logout&") {
    echo "false";

    return;
  } else {
    echo $_COOKIE['login_id'];
  }

?>
