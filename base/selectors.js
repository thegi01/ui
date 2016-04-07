'use strict';

/* 
 * selectors.js
 */

/* DOM Script */
window.onload = function(){ 
    /*
     * Navigator 
    */
	console.log('User Agent : ', NavigatorUserAgent());

	/*
     * Selector 
    */
	// 뱐수 선언
	var wrapNode = document.getElementById('wrap-selector'),
		result;
	// getElementsByClassName()
    result = document.getElementsByClassName('cls');
	console.log('getElementsByClassName(document, "cls")', result);
    result = wrapNode.getElementsByClassName('cls')[0];
	console.log('getElementsByClassName(wrapNode, "cls")[0] : ', result);

}

/* 
 * NavigatorUserAgent
 */
var NavigatorUserAgent = function(){
    var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1] === 'Chrome'){
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem = ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
};






