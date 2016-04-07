'use strict';

/* 
 * classList.js 
 */

/* DOM Script */
window.onload = function(){ 

    /*
     * ClassList 
     */

    // 변수 선언
    var wrapNode = document.getElementById('wrap-classList'),
        node = wrapNode.getElementsByTagName('div')[0],
        isClassList = "classList" in document.createElement("_"),
        result;
    if(!isClassList) {
        node.classList = new DOMTokenList(node);
    }
    console.log('classList : ', node.classList);
    console.log('classList.length : ', node.classList.length);
    console.log('classList[index:0] : ', node.classList[0]);
    console.log('classList.item(index:1) : ', node.classList.item(1));

    result = node.classList.contains('sky');
    console.log('Contains(sky) : ', result);

    wrapNode.getElementsByClassName('btn-add')[0].onclick = function(){
        node.classList.add('green', 'blue');
        console.log(node.innerHTML = 'Add(green, blue) : ' + node.className);
    };
    wrapNode.getElementsByClassName('btn-remove')[0].onclick = function(){
        node.classList.remove('blue', 'green');
        console.log(node.innerHTML = 'Remove(blue, green) : ' + node.className);
    };
    wrapNode.getElementsByClassName('btn-toggle')[0].onclick = function(){
        if(isClassList){
            node.tokenList = new DOMTokenList(node);
            node.tokenList.toggle('sky', 'skyToggle');
        } else {
            node.classList.toggle('sky', 'skyToggle');
        }
        console.log(node.innerHTML = 'Toggle(sky, skyToggle) : ' + node.className);
    };
};


/* 
 * interface DOMTokenList
 * @param el : Element
 * prototype {
    void check(DOMString token);
    getter long index getIndex(DOMString token);
    getter DOMString item(unsigned long index);
    void updateClassName();
    boolean contains(DOMString token);
    void add(DOMString... tokens);
    void remove(DOMString... tokens);
    boolean toggle(DOMString token, DOMString force);
 * }
 * Element.classList polyfill, ltIE9
 * spec : https://www.w3.org/TR/dom/#domtokenlist
 */
var DOMTokenList = function(el){
    this.el = el;
    var classes = this.el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
    for (var i=0 ; i<classes.length ; i++) {
        Array.prototype.push.call(this, classes[i]);
    }
};
DOMTokenList.prototype = {
    check : function(token){
        // 1. Throws a "SyntaxError" exception if token is the empty string.
        if(token === ''){
            throw new TypeError('The string did not match the expected pattern.');
        }
        // 2. Throws an "InvalidCharacterError" exception if token contains any ASCII whitespace.
        if(/\s/.test(token)) {
            throw new TypeError('The string contains invalid characters.');
        }
    },
    item : function(index){
        // Returns the token with index index.
        // 1. If index is equal to or greater than the number of tokens in tokens, return null.
        // 2. Return the indexth token in tokens.
        return this[index] || null;
    },
    updateClassName : function(){
        // A DOMTokenList object's update steps are:
        // 1. If there is no associated attribute (when the object is a DOMSettableTokenList), terminate these steps.
        // 2. Set an attribute for the associated element using associated attribute's local name and the result of running the ordered set serializer for tokens.
        this.el.className = Array.prototype.join.call(this, ' ');
    },
    contains : function(token){
        this.check(token);
        // 3. Returns true if token is present, and false otherwise.
        this.idx = undefined;
        for(var i=0 ; i<this.length ; i++){
            if(this[i] == token) {
                this.idx = i;
                break;
            } 
        }
        return (this.idx >=0) ? true : false; 
    },
    add : function(tokens){
        var args = Array.prototype.slice.call(arguments, 0);
        for(var i=0 ; i<args.length ; i++){
            // 3. For each token in tokens, in given order, that is not in tokens, append token to tokens.
            if(this.contains(args[i])) return;
            Array.prototype.push.call(this, args[i]);
            // 4. Run the update steps.
            this.updateClassName();
        }
    },
    remove : function(tokens){
        // 3. For each token in tokens, remove token from tokens.
        var args = Array.prototype.slice.call(arguments, 0);
        for(var i=0 ; i<args.length ; i++){
            // 3. For each token in tokens, in given order, that is not in tokens, append token to tokens.
            if(!this.contains(args[i])) return;
            Array.prototype.splice.call(this, this.idx, 1);
            // 4. Run the update steps.
            this.updateClassName();
        }
    },
    toggle : function(token, force){
        // 3. If token is in tokens, run these substeps:
        //     1. If force is either not passed or is false, then remove token from tokens, run the update steps, and return false.
        //     2. Otherwise, return true.
        // 4. Otherwise, run these substeps:
        //     1. If force is passed and is false, return false.
        //     2. Otherwise, append token to tokens, run the update steps, and return true.
        if(this.contains(force)) return false;
        if(this.contains(token)){
            this.remove(token);
            Array.prototype.splice.call(this, this.idx, 0, force);
        } else {
            Array.prototype.push.call(this, force);
        }
        this.updateClassName(this);
        return true;
    }
};


