'use strict';

/*
 * Cross-browser Letter Than Or Equal IE8
 */

/* 
 * html5.js
 */
// HTML5 Shiv v3 | @jon_neal @afarkas @rem | MIT/GPL2 Licensed
// Uncompressed source: https://github.com/aFarkas/html5shiv
(function(a,b){function f(a){var c,d,e,f;b.documentMode>7?(c=b.createElement("font"),c.setAttribute("data-html5shiv",a.nodeName.toLowerCase())):c=b.createElement("shiv:"+a.nodeName);while(a.firstChild)c.appendChild(a.childNodes[0]);for(d=a.attributes,e=d.length,f=0;f<e;++f)d[f].specified&&c.setAttribute(d[f].nodeName,d[f].nodeValue);c.style.cssText=a.style.cssText,a.parentNode.replaceChild(c,a),c.originalElement=a}function g(a){var b=a.originalElement;while(a.childNodes.length)b.appendChild(a.childNodes[0]);a.parentNode.replaceChild(b,a)}function h(a,b){b=b||"all";var c=-1,d=[],e=a.length,f,g;while(++c<e){f=a[c],g=f.media||b;if(f.disabled||!/print|all/.test(g))continue;d.push(h(f.imports,g),f.cssText)}return d.join("")}function i(c){var d=new RegExp("(^|[\\s,{}])("+a.html5.elements.join("|")+")","gi"),e=c.split("{"),f=e.length,g=-1;while(++g<f)e[g]=e[g].split("}"),b.documentMode>7?e[g][e[g].length-1]=e[g][e[g].length-1].replace(d,'$1font[data-html5shiv="$2"]'):e[g][e[g].length-1]=e[g][e[g].length-1].replace(d,"$1shiv\\:$2"),e[g]=e[g].join("}");return e.join("{")}var c=function(a){return a.innerHTML="<x-element></x-element>",a.childNodes.length===1}(b.createElement("a")),d=function(a,b,c){return b.appendChild(a),(c=(c?c(a):a.currentStyle).display)&&b.removeChild(a)&&c==="block"}(b.createElement("nav"),b.documentElement,a.getComputedStyle),e={elements:"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" "),shivDocument:function(a){a=a||b;if(a.documentShived)return;a.documentShived=!0;var f=a.createElement,g=a.createDocumentFragment,h=a.getElementsByTagName("head")[0],i=function(a){f(a)};c||(e.elements.join(" ").replace(/\w+/g,i),a.createElement=function(a){var b=f(a);return b.canHaveChildren&&e.shivDocument(b.document),b},a.createDocumentFragment=function(){return e.shivDocument(g())});if(!d&&h){var j=f("div");j.innerHTML=["x<style>","article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}","audio{display:none}","canvas,video{display:inline-block;*display:inline;*zoom:1}","[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}","mark{background:#FF0;color:#000}","</style>"].join(""),h.insertBefore(j.lastChild,h.firstChild)}return a}};e.shivDocument(b),a.html5=e;if(c||!a.attachEvent)return;a.attachEvent("onbeforeprint",function(){if(a.html5.supportsXElement||!b.namespaces)return;b.namespaces.shiv||b.namespaces.add("shiv");var c=-1,d=new RegExp("^("+a.html5.elements.join("|")+")$","i"),e=b.getElementsByTagName("*"),g=e.length,j,k=i(h(function(a,b){var c=[],d=a.length;while(d)c.unshift(a[--d]);d=b.length;while(d)c.unshift(b[--d]);c.sort(function(a,b){return a.sourceIndex-b.sourceIndex}),d=c.length;while(d)c[--d]=c[d].styleSheet;return c}(b.getElementsByTagName("style"),b.getElementsByTagName("link"))));while(++c<g)j=e[c],d.test(j.nodeName)&&f(j);b.appendChild(b._shivedStyleSheet=b.createElement("style")).styleSheet.cssText=k}),a.attachEvent("onafterprint",function(){if(a.html5.supportsXElement||!b.namespaces)return;var c=-1,d=b.getElementsByTagName("*"),e=d.length,f;while(++c<e)f=d[c],f.originalElement&&g(f);b._shivedStyleSheet&&b._shivedStyleSheet.parentNode.removeChild(b._shivedStyleSheet)})})(this,document)

/* 
 * window.Element
 */
if (!window.Element) 
{
    Element = function(){};

    var __createElement = document.createElement;
    document.createElement = function(tagName)
    {
        var element = __createElement(tagName);
        if (element == null) {return null;}
        for(var key in Element.prototype)
                element[key] = Element.prototype[key];
        return element;
    }

    var __getElementById = document.getElementById;
    document.getElementById = function(id)
    {
        var element = __getElementById(id);
        if (element == null) {return null;}
        for(var key in Element.prototype)
                element[key] = Element.prototype[key];
        return element;
    }
}

/* 
 * [Selector] getElementsByClassName
 */
if(!document.getElementsByClassName) {
    document.getElementsByClassName = function(search) {
        return getElByClassName(this, search);
    };
    Element.prototype.getElementsByClassName = function (search) {
        return getElByClassName(this, search);
    };
    var getElByClassName = function(node, search){
      var d = node, elements, pattern, i, results = [];
        if (d.querySelectorAll) { // IE8
          return d.querySelectorAll("." + search);
        } else {
          elements = d.getElementsByTagName("*");
          pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
          for (i = 0; i < elements.length; i++) {
            if ( pattern.test(elements[i].className) ) {
              results.push(elements[i]);
            }
          }
        }
        return results;
    };
}

/*
 * Array.prototype.indexOf
*/
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex){
        var k;
        // 1. Let o be the result of calling ToObject passing
        //    the this value as the argument.
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        // 2. Let lenValue be the result of calling the Get
        //    internal method of o with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = o.length >>> 0;
        // 4. If len is 0, return -1.
        if (len === 0) {
          return -1;
        }
        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = +fromIndex || 0;
        if (Math.abs(n) === Infinity) {
          n = 0;
        }
        // 6. If n >= len, return -1.
        if (n >= len) {
          return -1;
        }
        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        // 9. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ToString(k).
          //   This is implicit for LHS operands of the in operator
          // b. Let kPresent be the result of calling the
          //    HasProperty internal method of o with argument Pk.
          //   This step can be combined with c
          // c. If kPresent is true, then
          //    i.  Let elementK be the result of calling the Get
          //        internal method of o with the argument ToString(k).
          //   ii.  Let same be the result of applying the
          //        Strict Equality Comparison Algorithm to
          //        searchElement and elementK.
          //  iii.  If same is true, return k.
          if (k in o && o[k] === searchElement) {
            return k;
          }
          k++;
        }
        return -1;
    };
}
