//calendar.js

// 달력의 연, 월 값.
value_year = 0000;
value_month = 0;

// 각 개월의 마지막 일(=날짜의 개수) 값.
DATE_MAX_LIST = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

// 달력 각 셀에 들어가는 값들. 초기 2017년 2월 날짜 값. INIT_DATE.
value_date1 = new Array(0, 0, 0, 1, 2, 3, 4);
value_date2 = new Array(5, 6, 7, 8, 9, 10, 11);
value_date3 = new Array(12, 13, 14, 15, 16, 17, 18);
value_date4 = new Array(19, 20, 21, 22, 23, 24, 25);
value_date5 = new Array(26, 27, 28, 0, 0, 0, 0);
value_date6 = new Array(0, 0, 0, 0, 0, 0, 0);

value_date = new Array(value_date1, value_date2, value_date3, value_date4, value_date5, value_date6);

// 드래그로 이전 달 구현할 때 드래그 여부를 판단하는 함수..
$(document).ready(function () {
	 $('#calendarTab').bind('touchstart', function(event) {
			event.preventDefault();
			posX_start = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
	 });

	 $('#calendarTab').bind('touchend', function(event) {
			event.preventDefault();
			posX_end = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			dragCalendar(posX_start.pageX, posX_end.pageX);
	 });
});

// 드래그 시 발생해야 할 기능을 지니는 함수. 이전 달 함수를 호출 한다.
function dragCalendar(start, end) {
	 if(end - start >= 400) {
			calendarPrevBtn();
	 } else if (start - end >= 400) {
			calendarNextBtn();
	 }
}

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
			database[i] = stringSplit(slicedData[i], '/');
	 }

	 return database;
}

// calendar DB에서 학사 일정 정보를 가져오는 함수.
function loadDB() {
	 var dataString = "";

	 $.ajax({
			type: "GET",
			url:"http://61.245.230.97/SE/Server/calendar.php",
			data: dataString,
			crossDomain: true,
			cache: false,
			beforeSend: function() { },
			success: function(data) {
				 var database = dataSlice(data);
				 initCalendar(database);

				 //시작은 6월로

			}
	 });
}

// 페이지가 처음 열릴 때 달력의 날짜를 초기화 한다.
$(document).ready(function () {
	 loadDB();
});

// 달력의 초기 날짜를 현재 시간을 활용하여 넣는 초기화 함수.
function initCalendar(database) {
	 var date = new Date();
	 year_now = date.getFullYear();
	 month_now = date.getMonth() + 1;

	 INIT_YEAR = 2017;
	 INIT_MONTH = 2;

	 value_year = INIT_YEAR;
	 value_month = INIT_MONTH;

	 /* 달력의 날짜를 계산할 때 어떤 시점의 기준으로 상대적인 계산을 해야하는데
			이를 위해서는 이 페이지가 항상 기억하고 있는 기준 날짜 데이터가 필요. 이를 2017년 2월을 기준으로 잡았음.*/

	 //현재 시간을 이용해 설정된 날짜 값을 이용해 달력의 초기 설정을 하는 함수.
	 initCalendarDate(database);
	 initCalendarYearMonth();
}

// 초기에 년과, 월을 설정한다.
function initCalendarYearMonth() {
	 var year = document.getElementById("year");
	 var month = document.getElementById("month");

	 year.innerHTML = "<center><h2>" + value_year + "년 </h2></center>";
	 month.innerHTML = "<center><h2>" + value_month + "월 </h2></center>";
}

// 기본적으로 2017년 2월의 날짜 값을 기억시켜 두고 이를 기준으로 현 날짜와의 차를 계산하여서 날짜를 추출한다.
function initCalendarDate(database) {
	while(value_month < month_now) {
		calendarNextBtn();
	}
}

function calendarPrevBtn() {
	 var year = document.getElementById("year");
	 var month = document.getElementById("month");

	 if(value_month <= 1) {
			value_year -= 1;
			value_month = 12;

			year.innerHTML = "<center><h2>" + value_year + "년 </h2></center>";
	 } else {
			value_month -= 1;
	 }

	 month.innerHTML = "<center><h2>" + value_month + "월 </h2></center>";

	 calendarPrevDate();
}

// 이전달로 넘어갔을 때 날짜가 변하는 함수.
function calendarPrevDate() {
	 // 이전 달의 마지막 일이 입력될 위치를 찾아서 저장하고 있는 변수.
	 var prevInitCell = findPrevInitCell();

	 // value_date의 값을 찾아낸 이전 달 1일의 위치를 기준으로 변환.
	 swapPrevValueDate(prevInitCell);

	 // 변경된 value_date의 값을 cell_date에 적용.
	 displayCellDate(database);
}

function swapPrevValueDate(prevInitCell) {

	 // 해당 월에 가장 높은 일수.  ex) 2월은 28일 3월은 31일...
	 // 배열이 0부터 시작함으로 1을 뺀다.

	 var MAX = DATE_MAX_LIST[value_month - 1];
	 var INIT = prevInitCell;

	 var count = MAX;

	 // 우선 value_date 값을 모두 0으로 초기화.
	 for(var i=0; i<6; i++) {
			for(var j=0; j<7; j++) {
				 value_date[i][j] = 0;
			}
	 }

	 /*  if MAX=28, INIT=6   4행부터 시작
			if MAX=28, INIT=0~5 5행부터 시작.

			if MAX=30, INIT=0   6행부터 시작.
			if MAX=30, INIT=1~6 5행부터 시작.

			if MAX=31, INIT=0,1 6행부터 시작.
			if MAX=31, INIT=2~6 5행부터 시작.*/
	 if(MAX == 28 && INIT == 6) {
			for(var i=3; i>=0; i--) {
				 for(var j=6; j>=0; j--) {
						value_date[i][j] = count;
						count--;
				 }
			}
	 } else if (MAX == 28 && INIT < 6) {
			for(var i=4; i>=0; i--) {
				 for(var j=6; j>=0; j--) {
						if(i==4 && j<=INIT) {
							 value_date[i][j] = count;
							 count--;
						}

						if(i<=3 && i>=1) {
							 value_date[i][j] = count;
							 count--;
						}

						if(i==0 && count > 0) {
							 value_date[i][j] = count;
							 count--;
						}
				 }
			}
	 } else if(MAX == 30 && INIT == 0) {
			for(var i=5; i>=0; i--) {
				 for(var j=6; j>=0; j--) {
						if(i==5 && j==0) {
							 value_date[i][j] = count;
							 count--;
						}

						if(i<=4 && i>=1) {
							 value_date[i][j] = count;
							 count--;
						}

						if(i==0 && j==6) {
							 value_date[i][j] = count;
							 count--;
						}
				 }
			}

	 } else if(MAX == 30 && INIT > 0) {
			for(var i=4; i>=0; i--) {
				 for(var j=6; j>=0; j--) {
						if(i==4 && j<= INIT) {
							 value_date[i][j] = count;
							 count--;
						}

						if(i<=3 && i>=1) {
							 value_date[i][j] = count;
							 count--;
						}

						if(i==0 && count > 0) {
							 value_date[i][j] = count;
							 count--;
						}
				 }
			}

	 } else if(MAX == 31 && INIT <= 1) {
			for(var i=5; i>=0; i--) {
				 if(INIT == 0) {
						for(var j=6; j>=0; j--) {
							 if(i==5 && j==0) {
									value_date[i][j] = count;
									count--;
							 }

							 if(i<=4 && i>=1) {
									value_date[i][j] = count;
									count--;
							 }

							 if(i==0 && count > 0) {
									value_date = count;
									count--;
							 }
						}
				 }

				 if(INIT == 1) {
						for(var j=6; j>=0; j--) {
							 if(i==5 && j<=1) {
									value_date[i][j] = count;
									count--;
							 }

							 if(i<=4 && i>=1) {
									value_date[i][j] = count;
									count--;
							 }

							 if(i==0 && count > 0) {
									value_date[i][j] = count;
									count--;
							 }
						}
				 }
			}

	 } else if(MAX == 31 && INIT > 1) {
			for(var i=4; i>=0; i--) {
				 for(var j=6; j>=0; j--) {
						if(i==4 && j<=INIT) {
							 value_date[i][j] = count;
							 count--;
						}

						if(i<=3 && i>=1) {
							 value_date[i][j] = count;
							 count--;
						}

						if(i==0 && count > 0) {
							 value_date[i][j] = count;
							 count--;
						}
				 }
			}
	 }
}

// 이전 달의 날짜를 표시하기 위해서 이전 달의 1일이 입력될 위치를 찾는다.
function findPrevInitCell(cell_date) {
	 for (var j=0; j<7; j++) {
			if(value_date[0][j] != 0) {
				 // X축 값만 필요하기 때문에 j값만 반환.
				 if(j == 0) {
						return 6;
				 }

				 return j-1;
			}
	 }
}

///////////////////////////////////////////////////////////////////////////////////////NEXT PART
function calendarNextBtn() {
	 var year = document.getElementById("year");
	 var month = document.getElementById("month");

	 if(value_month >= 12) {
			value_year += 1;
			value_month = 1;

			year.innerHTML = "<center><h2>" + value_year + "년 </h2></center>";
	 } else {
			value_month += 1;
	 }

	 month.innerHTML = "<center><h2>" + value_month + "월 </h2></center>";

	 calendarNextDate(database);
}

// 다음달로 넘어갔을 때 날짜가 변하는 함수.
function calendarNextDate(database) {

	 // 다음 달의 1일이 입력될 위치를 찾아서 저장하고 있는 변수.
	 var nextInitCell = findNextInitCell();

	 // value_date의 값을 찾아낸 다음 달 1일의 위치를 기준으로 변환.
	 swapNextValueDate(nextInitCell);

	 // 변경된 value_date의 값을 cell_date에 적용.
	 displayCellDate(database);
}

// value_date 값을 바꾼다.
function swapNextValueDate(nextInitCell) {

	 // 해당 월에 가장 높은 일수.  ex) 2월은 28일 3월은 31일...
	 // 배열이 0부터 시작함으로 1을 뺀다.
	 var MAX = DATE_MAX_LIST[value_month - 1];
	 var INIT = nextInitCell;

	 // 우선 value_date 값을 모두 0으로 초기화.
	 for(var i=0; i<6; i++) {
			for(var j=0; j<7; j++) {
				 value_date[i][j] = 0;
			}
	 }

	 // 1부터 MAX까지 셀 변수.
	 var count = 1;

	 // value_date 값 변환.
	 for(var i=0; i<6; i++) {
			for(var j=0; j<7; j++) {
				 // 첫번째 줄(i=0) 일 때는 j가 INIT 값보다 클때, 두번째 줄 이상(i!=0)은 count 값이 MAX보다 커질 때 까지 계속.
				 if((i == 0 && j >= INIT) || (count <= MAX && i != 0)) {
						value_date[i][j] = count;
						count++;
				 }
			}
	 }
}

// 다음 달의 날짜를 표시하기 위해서 다음 달의 1일이 입력될 위치를 찾는다.
function findNextInitCell() {
	 for(var i=4; i<6; i++) {
			for(var j=0; j<7; j++) {
				 if(value_date[i][j] == 0) {
						// X축 값만 필요하기 때문에 j값만 반환.
						return j;
				 }
			}
	 }
}

// 해당 날짜가 맞는지 확인하고 DB내용을 넣는 함수.
function isMatchDate(database, year, month, date) {

	 if(month < 10) {
			month = "0" + month;
	 }

	 if(date < 10) {
			date = "0" + date;
	 }

	 var strDate = year + "-" + month + "-" + date;

	 for(var i=0; i < (database.length-1); i++) {
			if(database[i][2] == strDate) {
				 return database[i][1];
			}
	 }

	 return "";
}

//value_date 값을 기반으로 cell_date에 날짜를 표기하는 함수.
function displayCellDate(database) {
	 var cell_row1 = new Array();
	 var cell_row2 = new Array();
	 var cell_row3 = new Array();
	 var cell_row4 = new Array();
	 var cell_row5 = new Array();
	 var cell_row6 = new Array();

	 var cell_date = new Array(cell_row1, cell_row2, cell_row3, cell_row4, cell_row5, cell_row6);

	 // 달력 각 셀에 아이디 부여하는 함수.
	 for(var i=0; i<6; i++) {
			for(var j=0; j<7; j++) {
				 cell_date[i][j] = document.getElementById("cell_" + i + j);
			}
	 }

	 for(var i=0; i<6; i++) {
			for(var j=0; j<7; j++) {
				 var strHTML = "";

				 strHTML = "<div class=\"content_calendar_tabular_cell_day_wrap\">";

				 // value_date 값이 0인 부분은 미 표기.
				 if(value_date[i][j] != 0) {
						strHTML += "<h5>" + value_date[i][j] + "</h5>";
				 }

				 strHTML += "</div>";
				 strHTML += "<a class=\"calendar_content\" href=\"\">";
				 strHTML +=      "<div class=\"content_calendar_tabular_cell_content_wrap\">";
				 strHTML +=         "<p>" + isMatchDate(database, value_year, value_month, value_date[i][j]) +"</p>";
				 strHTML +=      "</div>";
				 strHTML += "</a>";

				 cell_date[i][j].innerHTML = strHTML;
			}
	 }
}
