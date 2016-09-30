# 네이버 실시간 검색어 랭킹 정보 

## 기본정보

- 적용 디바이스 : 데스크탑, 모바일 
- 브라우저 : 크롬, 파이어폭스, 오페라, 사파리, IE(8~11)
- 웹표준, 웹접근성을 준수한다.
- javaScript, jQuery로 구현
- [URL] : http://thegi01.github.io/ui/module/naver-rank/rankup.html

## UX

1. 실시간 검색어 1위 ~ 10위 정보를 받아온다. 
	1. 상승, 하강, 신규 컨텐츠 정보를 화살표와 new로 보여준다.
	2. 상승과 하강은 격차값을 뿌려준다.
2. 1위 ~ 10위 정보를 한단위씩만 증가하며 보여준다. 적용 애니메이션은 아래에서 위로 움직인다.
3. 10위가 되면 다시 1위로 이동한다.

## Events

1. Mouse Event
	- 마우스가 들어오면 : Common Action-1
	- 전체 목록에서 마우스 아웃 : Common Action-2
2. Key Event
	- Key Focus가 들어오면 : Common Action-1
	- Key Focus가 나가면 : Common Action-2
3. Common Action
	1. 보여주던 목록 정보는 bold 적용, 1위~10위의 모든 정보를 보여준다. 롤링 애니메이션은 중지
	2. bold인 목록 정보만 원래의 gui로 보여주고 나머지는 감춘다. 롤링 애니메이션 Play.	

## 과제 및 질문
1. IE9 이하인 경우 애니메이션 적용 방법?
2. 10위에서 1위로 이동시 롤링 애니메이션 동일하게 구현 문제
3. Tab Key 이동시 파이어폭스, IE8에서 적용 방법 - 2015.09.03 해결

## 기타
1. 모바일 미작업

## 후반작업
1. 2015.09.03 
	- Tab Focus 이벤트 해결 : focus, blur Events 
