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
        classList, 
        result;

    classList = new DOMTokenList(node);
    console.log('tokenList : ', classList.tokenList);
    console.log('tokenList.length : ', classList.tokenList.length);
    console.log('tokenList[index:0] : ', classList.tokenList[0]);
    console.log('tokenList.item(index:1) : ', classList.item(1));

    result = classList.contains('sky');
    console.log('Contains(sky) : ', result);

    wrapNode.getElementsByClassName('btn-add')[0].onclick = function(){
        classList.add('green', 'blue');
        console.log(node.innerHTML = 'Add(green, blue) : ' + node.className);
    };
    wrapNode.getElementsByClassName('btn-remove')[0].onclick = function(){
        classList.remove('blue', 'green');
        console.log(node.innerHTML = 'Remove(blue, green) : ' + node.className);
    };
    wrapNode.getElementsByClassName('btn-toggle')[0].onclick = function(){
        classList.toggle('sky', 'skyToggle');
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
 */
var DOMTokenList = function(el){
    this.el = el;
    this.tokenList = this.el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
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
    getIndex : function(token){
        this.idx = this.tokenList.indexOf(token); // IE9
        return this.idx;
    },
    item : function(index){
        // Returns the token with index index.
        // 1. If index is equal to or greater than the number of tokens in tokens, return null.
        // 2. Return the indexth token in tokens.
        if(index >= this.tokenList.length) {
            return null;
        } else {
            return this.tokenList[index];
        }
    },
    updateClassName : function(){
        // A DOMTokenList object's update steps are:
        // 1. If there is no associated attribute (when the object is a DOMSettableTokenList), terminate these steps.
        // 2. Set an attribute for the associated element using associated attribute's local name and the result of running the ordered set serializer for tokens.
        var result = this.tokenList.toString().replace(/,/g, ' ');
        this.el.setAttribute('class', result);
    },
    contains : function(token){
        this.check(token);
        // 3. Returns true if token is present, and false otherwise.
        this.getIndex(token);
        return this.idx >= 0 ? true : false; 
    },
    add : function(){
        var args = Array.prototype.slice.call(arguments, 0);
        for(var i=0 ; i<args.length ; i++){
            // 3. For each token in tokens, in given order, that is not in tokens, append token to tokens.
            if(this.contains(args[i])) return;
            //tokenList = contains.tokenList;
            this.tokenList.push(args[i]);
            // 4. Run the update steps.
            this.updateClassName();
        }
    },
    remove : function(){
        // 3. For each token in tokens, remove token from tokens.
        var args = Array.prototype.slice.call(arguments, 0);
        for(var i=0 ; i<args.length ; i++){
            // 3. For each token in tokens, in given order, that is not in tokens, append token to tokens.
            if(!this.contains(args[i])) return;
            this.tokenList.splice(this.idx, 1);
            // 4. Run the update steps.
            this.updateClassName(this.el, this.tokenList);
        }
    },
    toggle : function(token, force){
        // 3. If token is in tokens, run these substeps:
        //     1. If force is either not passed or is false, then remove token from tokens, run the update steps, and return false.
        //     2. Otherwise, return true.
        // 4. Otherwise, run these substeps:
        //     1. If force is passed and is false, return false.
        //     2. Otherwise, append token to tokens, run the update steps, and return true.
        var forceContains = this.contains(force);
        if(this.contains(token)){
            if(forceContains){
                return false;
            } else {
                this.remove(token);
                this.tokenList.splice(this.idx, 0, force);
                this.updateClassName(this.tokenList);
                return true;
            } 
        } else {
           if(forceContains) {
                return false;
            } else {
                this.tokenList.push(force);
                this.updateClassName(this.tokenList);
                return true;
            }
        }
    }
};

