# Tab Contents Show/Hide

## 기본 구현 정보

- 디바이스 : 웹(데스크탑)
- 브라우저 : 크롬, 파이어폭스, 오페라, 사파리, IE(8~11)
- 웹표준, 웹접근성 준수
- 데이터는 json 형식으로 받아온다.
- javaScript, jQuery로 구현
- [URL] : http://thegi01.github.io/ui/module/naver-tab/tab-contents.html

## UX

1. Load
	- 탭메뉴 보여준다.
	- 특정 탭메뉴 활성화하고 그 탭메뉴의 컨텐츠 데이터를 받아오고 템플릿을 그려준다.
2. Mouse Click or Key Enter 
	- 이전 탭 비활성화 : 활성화 되어 있던 Tab Menu는 비활성화하고 연관 컨텐츠는 hide 한다.
	- 선택한 탭 활성화 : Click한 Tab Menu는 활성하하고 연관 컨텐츠는 show 한다. 연관 컨텐츠를 가져오기 전이면 그 컨텐츠 데이터를 받아오고 템플릿을 그려준다.


## 과제 및 질문

1. js 적용 전후 구분하여 css 수정
2. ie8부터 사용가능한 js 사용
3. click 이벤트 : 더 간결한 방법은?

## 웹표준, 웹접근성 검사
1. 웹표준 마크업 검사 : https://validator.w3.org/
2. css 검사 : http://jigsaw.w3.org/css-validator/#validate_by_input
3. js lint :  www.jslint.com/
	- Use spaces, not tabs ?
	- "use strict"; ?

## 새롭게 알게 된 내용

1. ie8에서 css의 '+'를 이용하여 display:block을 사용할 경우 속도가 느려진다. 
	- .tab-nav.active + .tab-cnts {display:block;}
2. jQuery 2.x 는 ie8을 지원하지 않는다. 따라서 ie8+의 웹호환성에서는 jQuery 1.x 시리즈를 사용해야한다.
