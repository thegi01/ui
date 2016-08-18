(function(){
	var trim = function(s){
		return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	};
	
	var hasClassName = function(el, cname){
		var cn = trim(el.className), ca = trim(cname), 
			result = 0, x, xn, ret;
		if(ca.indexOf(' ')>0){
			x = ca.replace(/\s+/g,' ').split(' '), xn = cn.split(' ');
			x.each(function(mx){
				result += (xn.indexOf(mx) > -1) ? 1 : 0;
			});
			ret = x.length === result;
		} else {
			ret = cn.length > 0 && (cn == ca || 
				new RegExp("(^|\\s)" + ca + "(\\s|$)").test(cn));
		}
		return ret;
	};
	
	var addEvent = function(element, type, handler){
		if(element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else if(element.addEventListener){
			element.addEventListener(type, handler);
		}
	};
	
	var getScrollOffsets = function(){
		return {
			'left' : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
			'top' :  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		};
	};
	
	var CTNode = {
		"getIndex": function(node, className){
			if(node && node.parentNode){
				var childNodes = node.parentNode.childNodes;
				for(var i = 0, j = -1; i < childNodes.length; i++)
				{
					if(childNodes[i].nodeType!=1 || childNodes[i].tagName!=node.tagName) continue; //ff
					if(className){
						if(hasClassName(childNodes[i], className)){
							j++;
							if(childNodes[i] == node ) break;
						}
					} else {
						j++;
						if(childNodes[i] == node ) break;
					}
				}
				return j;
			}
		},
		"getSelector": function(node){
			var selectorArr = [];
			while(node && node.tagName != 'BODY'){
				if(node.nodeType == 1){
					var id = (/^\D+\d+/.test(node.id) === false && node.id != "") ? "#" + node.id : "";
					var selector;
					if(id === ""){
						var tagName = node.tagName.toLowerCase();
						var className = (function(){
							var classSelector = "";
							if(trim(node.className) != ""){
								if(node.classList && node.classList.length !== 0){
									classSelector = "." + node.classList[0];
								} else {
									classSelector = "." + trim(node.className).split(" ")[0];
								}
							}
							return classSelector;
						})();
						var nth = (function(){
							var posSelector = "";
							var index = CTNode.getIndex(node, className.replace(".", ""));
							if(index !== 0){
								posSelector = ":eq(" + index + ")";
							}
							return posSelector;
						})();
						selector = tagName + className + nth;
						selectorArr.push(selector);
					} else if(id !== ""){
						selectorArr.push(id);
						break;
					}
				}
				node = node.parentNode;
			}
			return selectorArr.reverse().join(" ");
		},
		"hasTagName": function(node, tagName){
			while(node && node !== document.body && node.tagName != tagName){
				node = node.parentNode;
			}
			return (node && node.tagName == tagName) ? node : null;
		}
	};
	
	var ct = window.ct2 = {
		"url": "http://click.media.daum.net/ct.php",
		"callback": function(response){  },
		"location": CTConfig.pageId || (location.hostname + location.pathname + (CTConfig.includeQuery ? location.search : "" )).replace(/[\/#]*$/ig, ""),
		"sampling": CTConfig.sampling || 1,
		"targetElement": CTConfig.targetElement,
		"getNodeInfo": function(node, e){
			var targetElement = document.getElementById(ct.targetElement);
			var nodeInfo = {};
			var scrollOffsets = getScrollOffsets();
			
			nodeInfo.nid = CTNode.getSelector(node);
			nodeInfo.x = e.clientX + scrollOffsets.left - targetElement.offsetLeft;
			nodeInfo.y = e.clientY + scrollOffsets.top - targetElement.offsetTop;
			nodeInfo.pid = ct.location;
			nodeInfo.zid = "zid";
			return nodeInfo;
		},
		"jsonToParamString": function(json){
			var paramArr = [];
			for(var name in json){
				var value = encodeURIComponent(json[name]);
				paramArr.push(name + "=" + value);
			}
			return paramArr.join("&");
		},
		"mouseDownHandler": function(e){
			
			if(Math.random() > ct.sampling) return;
			
			var e = e || window.event;
			var node = e.srcElement || e.target;
			node = CTNode.hasTagName(node, "A") || CTNode.hasTagName(node, "BUTTON");
			if(node){
				var nodeInfo = ct.getNodeInfo(node, e);
				var paramString = ct.jsonToParamString(nodeInfo);
				ct.request(ct.url + "?" + paramString + "&callback=ct.callback");
			}
		},
		"request": function(url){
			new Image().setAttribute("src", url + "&nocache=" + new Date().getTime());
		}
	};
	
	addEvent(document, "mousedown", ct.mouseDownHandler);
	
	if(CTConfig.pageId){
		var pageId = CTConfig.pageId;
		addEvent(window, "load", function(){
			document.body.setAttribute("data-ctpageid", pageId);
		});
	}
})();

