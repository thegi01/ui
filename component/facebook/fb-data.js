"use strict";
/* 
DATA 
*/
var DATA = {
	/*
	[ HEADER | Panel 내의 Header 영역]
	text : 타이틀 텍스트, string
	title : 타이틀 노출 여부, boolean
	srch : 검색 노출 여부, boolean
	navWrite : 쓰기 네비게이션 노출 여부, boolean
	btnMessenger : 메신저 버튼 노출 여부, boolean
	btnfriends : 친구 찾기 버튼 노출 여부, boolean
	btnClose : 패널 닫기 버튼 노출 여부, boolean
	btnBack : 이전 버튼 노출 여부, boolean
	*/
	HEADER : {
		newspd : {
			text : '뉴스피드',
			srch : true,
			navWrite : true,
			btnMessenger : true
		},
		ask : {
			text : '친구요청',
			title : true,
			btnfriends : true
		},
		message : {
			text : '메시지',
			title : true,
			btnMessenger : true
		},
		inform : {
			text : '알림',
			title : true,
			btnMessenger : true
		},
		more : {
			text : '더보기',
			srch : true,
			btnMessenger : true
		},
		messengerStart : {
			text : '메신저 시작하기',
			title : true,
			srch : true,
			btnClose : true,
		},
		friends : {
			text : '친구찾기',
			title : true,
			btnBack : true,
			navDirection : true,
			nav : {
				recommend : '추천',
				code : '친구 코드',
				search : '검색',
				ask : '요청',
				address : '연락처',
				friends : '친구',
				send : '요청전송'
			}
		}
	},
	/*
	[ WRITE | Write Navigatin(상태, 사진, 체크인)으로 연결되는 컨텐츠]
	text : 타이틀 텍스트, string
	title : 타이틀 노출 여부, boolean
	btnCancel : 취소 버튼 노출 여부, boolean
	*/
	WRITE : {
		state : {
			text : '상태 업데이트',
			title : true,
			btnCancel : true
		},
		photo : {
			text : '카메라 롤',
			title : true,
			btnCancel : true
		},
		checkin : {
			text : '체크인',
			title : true,
			btnCancel : true
		}
	},
	/*
	[ LST_SRCH | Panel Srch의 최근 검색 목록 ]
	imgSrc : 썸네일 이미지 경로
	title : 최근 검색한 텍스트
	*/
	LST_SRCH : [
		{imgSrc : 'https://scontent.xx.fbcdn.net/hprofile-xaf1/v/t1.0-1/c28.28.345.345/s50x50/200606_171273616255192_5593562_n.jpg?oh=8b97e42ed019010ad5590b3d4ae4ed23&amp;oe=5746E238', title : '배철수의 음악캠프'},
		{imgSrc : 'https://scontent.xx.fbcdn.net/hprofile-xaf1/v/t1.0-1/c28.28.345.345/s50x50/200606_171273616255192_5593562_n.jpg?oh=8b97e42ed019010ad5590b3d4ae4ed23&amp;oe=5746E238', title : '이루마'}
	]
}