'use strict';
//http://stackoverflow.com/questions/10617014/javascript-event-prototype-in-ie8
// ie8Events.js : https://gist.github.com/chriswrightdesign/7573368
/* DOM Script */
window.onload = function(){ 

	/*_____ Cross Browser Event Utility _____*/

	// Add Event | Remove Event 
	// Add Event | Remove Event  > case 1 : has function name
	var eventNode = document.getElementById('wrap-event'),
		addClick = eventNode.getElementsByClassName('add')[0],
		removeClick = eventNode.getElementsByClassName('remove')[0],
		showNode = eventNode.getElementsByClassName('show')[0];
	var showChoice = function(){
		showNode.style.backgroundColor = 'yellow';
		showNode.innerHTML = 'addEvent';
	}
	var setRemove = function(){
		addClick.removeEventListener('click', showChoice, false);
		showNode.style.backgroundColor = '#ccc';
		showNode.innerHTML = 'removeEvent';
	}
	addClick.addEventListener('click', showChoice, false);
	removeClick.addEventListener('click', setRemove, false);

	// Add Event | Remove Event  > case 2 : anonymous functon(has parameter)인 경우 prototype으로 변경
	var eventNode = document.getElementById('wrap-event-anonymous');
	var callOutToYou = function(p1, p2){
		this.clickNode = eventNode.getElementsByClassName('add')[0];
		this.showNode = eventNode.getElementsByClassName('show')[0];
		this.p1 = 'parameter1';
		this.p2 = 'parameter2';
		this.swap = this.swap.bind(this);
		this.clickNode.addEventListener('click', this.swap, false);
	}
	callOutToYou.prototype = {
		swap : function(){
			var result = this.p1 + ' ' + this.p2;
			this.showNode.style.backgroundColor = 'yellow';
			this.showNode.innerHTML = result;
			this.clickNode.removeEventListener('click', this.swap, false);
		}
	}
	var callOut = new callOutToYou('p1', 'p2');

	// Get Event Target 
	var target = document.getElementById('eventTarget').getElementsByClassName('target')[0];
	target.addEventListener('mouseover', function(e){
		var getTarget = Util.Event.getTarget(e);
		console.log('event target: ', getTarget);
		getTarget.style.backgroundColor = 'yellow';
		getTarget.innerHTML = 'Got Event Target';
	}, false);
	
	// Prevent Default 
	var notGoNode = document.getElementById('preventDefault').getElementsByClassName('not-go')[0];
	notGoNode.addEventListener('click', function(e){
    	e.preventDefault()
	}, false);

	// Bubbling : Stop Propagation 
	var bubblingNode = document.getElementById('wrap-bubbling'),
		outer = bubblingNode.getElementsByClassName('outer')[0],
		inner = bubblingNode.getElementsByClassName('inner')[0];
	var showOuter = function(e){
		console.log('outer');
	}
	var showInner = function(e){
		event.stopPropagation();
		console.log('inner');
	}
	outer.addEventListener('click', showOuter, false);
	inner.addEventListener('click', showInner, false);
}

/* Cross Browser Event Utility */
var Util = {};
Util.Event = {
    getTarget : function(event) {
        return event.target || event.srcElement;
    }
}

/* Cross Browse Prototype */
// Event
if(!Event) Event =  window.Event || window.event;
// PreventDefault
Event.prototype.preventDefault = null;
if(!Event.prototype.preventDefault){
	Event.prototype.preventDefault = function(){
		 this.returnValue = false;
	}
}
// StopPropagation
if(!Event.prototype.stopPropagation){
	Event.prototype.stopPropagation = function(){
		this.cancelBubble = true;
	}
}
// AddEventListener & RemoveEventListener
if (!Element.prototype.addEventListener) {
    var eventListeners=[];
    var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var self=this;
      var wrapper=function(e) {
        e.target=e.srcElement;
        e.currentTarget=self;
        if (listener.handleEvent) {
          listener.handleEvent(e);
        } else {
          listener.call(self,e);
        }
      };
      if (type=="DOMContentLoaded") {
        var wrapper2=function(e) {
          if (document.readyState=="complete") {
            wrapper(e);
          }
        };
        document.attachEvent("onreadystatechange",wrapper2);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});
        
        if (document.readyState=="complete") {
          var e=new Event();
          e.srcElement=window;
          wrapper2(e);
        }
      } else {
        this.attachEvent("on"+type,wrapper);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
      }
    };
    var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var counter=0;
      while (counter<eventListeners.length) {
        var eventListener=eventListeners[counter];
        if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
          if (type=="DOMContentLoaded") {
            this.detachEvent("onreadystatechange",eventListener.wrapper);
          } else {
            this.detachEvent("on"+type,eventListener.wrapper);
          }
          break;
        }
        ++counter;
      }
    };
    Element.prototype.addEventListener=addEventListener;
    Element.prototype.removeEventListener=removeEventListener;
    if (HTMLDocument) {
      HTMLDocument.prototype.addEventListener=addEventListener;
      HTMLDocument.prototype.removeEventListener=removeEventListener;
    }
    if (Window) {
      Window.prototype.addEventListener=addEventListener;
      Window.prototype.removeEventListener=removeEventListener;
    }
 }

function addEvent(type, element, func) {
	element.addEventListener(type, func, false);
}

/* ie */
function addEvent(type, element, func) {
	element.attachEvent(type, func); 
}

/* old ie */
function addEvent(type, element, func) {
	element['on' + type] = func; 
}

 // prototype으로 변경
	/*
	addEvent : function(element, event, handler){
		if(element.addEventListener){
			element.addEventListener(event, handler, false);
		} else if(element.attachEvent){
			element.attachEvent('on'+ event, handler);
		} else {
			element['on' + event] = handler;
		}
	},
	removeEvent :  function(element, event, handler){
		if(element.removeEventListener){
			element.removeEventListener(event, handler, false);
		} else if(element.detachEvent){
			element.detachEvent('on'+ event, handler);
		} else {
			element['on' + event] = null;
		}
	},*/
