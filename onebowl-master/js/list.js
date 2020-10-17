$(document).ready(function () {
  //store database 접근할 때 편의를 위한 상수 정의
  STORE_NAME = 0;
  STORE_FAVOR = 1;
  STORE_ISWELLBEING = 2;
  STORE_ISSINGLE = 3;
  STORE_EXPLAIN = 4;
  STORE_CATEGORY = 5;
  STORE_CODE = 6;
  STORE_MAIN_IMAGE = 7;

  var tempParam = $(location).attr('search');

  if(tempParam.charAt(1) == 'c') {

    // 카테고리 값이 넘어온 경우로 검색이 아닌 카테고리 클릭으로 list.html 들어온 경우.
    var decodeCategory = decodeURI(tempParam);
    var category = "category:" + decodeCategory.charAt(11) + decodeCategory.charAt(12) + "";

    loadDB(category);
  } else if(tempParam.charAt(1) == 'n') {

    // 네임 값이 넘어온 경우로 검색으로 list.html 들어온 경우.
    var decodeName = decodeURI(tempParam);
    var name = "name:";

    for(var i=6; i < decodeName.length; i++) {
      name += decodeName.charAt(i);
    }
    loadDB(name);
  } else if(tempParam.charAt(3) == 'S') {

    loadDB("single:");
  } else if(tempParam.charAt(3) == 'W') {

    loadDB("wellbeing:");
  } else if(tempParam.charAt(1) == "i") {

    var decodeId = decodeURI(tempParam);
    var id = "id:";

    for(var i=4; i < decodeId.length; i++) {
      id += decodeId.charAt(i);
    }

    loadDB(id);
  }
});

// 문자열을 strIndex를 기반으로 분할하는 함수
function stringSplit(strData, strIndex){
  var stringList = new Array();

  while(strData.indexOf(strIndex) != -1){
    stringList[stringList.length] = strData.substring(0, strData.indexOf(strIndex));
    strData = strData.substring(strData.indexOf(strIndex)+(strIndex.length), strData.length);
  }
  stringList[stringList.length] = strData;

  return stringList;
}

// 서버 DB에서 통으로 들어온 문자열 데이터를 분할
function dataSlice(data) {
  var slicedData = stringSplit(data, '|');

  database = new Array(slicedData.length);

  for(var i=0; i < (slicedData.length-1); i++) {
    database[i] = stringSplit(slicedData[i], '@');
  }

  return database;
}

// DB에 접근을해서 필요한 자료를 가져오는 것.
function loadDB(param) {
  var dataString = "param=" + param;

  $.ajax({
    type: "POST",
    url:"http://61.245.230.97/SE/Server/list.php",
    data: dataString,
    crossDomain: true,
    cache: false,

    beforeSend: function() { },
    success: function(data) {
      var database = dataSlice(data);
      storeListInnerHTML(database);
    }
  });
}

// 가게목록을 뿌려주는 함수.
function storeListInnerHTML(database) {
  var storeList = document.getElementById("store_list");
  var innerhtml = "";

  //목록 결과가 없을 때
  if(database.length == 1) {
    innerhtml +=  "<h2>검색결과가 없습니다.</h2>";
  } else {

    for(var i=0; i < (database.length-1); i++) {
      innerhtml +=  "<a href='./item.html?id=" + database[i][STORE_CODE] + "'>";
      innerhtml +=  "<div class=\"content_store_wrap\">";
      innerhtml +=    "<div class=\"content_store_image_wrap\">";
      innerhtml +=      "<img src=\"" + database[i][STORE_MAIN_IMAGE] + "\" alt=\"가게 이미지\" />";
      innerhtml +=    "</div>";
      innerhtml +=    "<div class=\"content_store_description_wrap\">";
      innerhtml +=      "<div class=\"content_store_description_title_wrap\">";
      innerhtml +=        "<h2><" + database[i][STORE_NAME] + "></h2>";
      innerhtml +=      "</div>";
      innerhtml +=      "<div class=\"content_store_description_explain_wrap\">";
      innerhtml +=        "<p>" + database[i][STORE_EXPLAIN]  + "</p>";
      innerhtml +=      "</div>";
      innerhtml +=    "</div>";
      innerhtml +=    "<div class=\"content_store_sticker_wrap\">";
      innerhtml +=      "<div class=\"content_store_sticker_favor_wrap\">";
      innerhtml +=        "<div class=\"content_store_sticker_favor_icon_wrap\">";
      innerhtml +=          "<img src=\"./image/좋아요.png\" alt=\"좋아요\" />";
      innerhtml +=        "</div>";
      innerhtml +=        "<div class=\"content_store_sticker_favor_value_wrap\">";
      innerhtml +=          "<h2>" + database[i][STORE_FAVOR] + "</h2>";
      innerhtml +=        "</div>";
      innerhtml +=      "</div>";
      innerhtml +=      "<div class=\"content_store_sticker_category_wrap\">";
      innerhtml +=        "<h2>" + database[i][STORE_CATEGORY] + "</h2>";
      innerhtml +=      "</div>";

                        if(database[i][STORE_ISWELLBEING] == "yes") {
      innerhtml +=      "<div class=\"content_store_sticker_wellbeing_wrap\">";
      innerhtml +=        "<img src=\"./image/웰빙2.png\" alt=\"웰빙\" />";
      innerhtml +=      "</div>";
                        }

                        if(database[i][STORE_ISSINGLE] == "yes") {
      innerhtml +=      "<div class=\"content_store_sticker_single_wrap\">";
      innerhtml +=        "<img src=\"./image/혼밥2.png\" alt=\"혼밥\" />";
      innerhtml +=      "</div>";
                        }

      innerhtml +=    "</div>";
      innerhtml +=  "</div>"
      innerhtml +=  "</a>";
    }
  }

  storeList.innerHTML = innerhtml;
}
