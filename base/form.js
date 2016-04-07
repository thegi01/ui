'use strict';

// http://www.the-art-of-web.com/javascript/validate/
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Data_form_validation
// http://mrbool.com/validation-in-javascript-emails-letters-and-empty-input-textbox/25472
// https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/JavaScript_Examples.html *****

/* DOM Script */
window.onload = function(){ 

	/*_____ Form Utility _____*/

	/* Form Validation */

	/*var myForm = document.forms["myForm"];
	myForm.addEventListener('submit', function(e){
	    event.preventDefault();
	    ValidateContactForm(this);
		// var x = this.inputName.value; //document.forms["myForm"]["inputName"].value;
	 //    if (x == null || x == "") {
	 //        alert("Name must be filled out");
	 //        return false;
	 //    }
	});*/
}

/*var numbersOnly = /^\d+$/;
var decimalOnly = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
var uppercaseOnly = /^[A-Z]+$/;
var lowercaseOnly = /^[a-z]+$/;
var stringOnly = /^[A-Za-z0-9]+$/;

 function testInputData(myfield, restrictionType) {

  var myData = document.getElementById(myfield).value;
  if(myData!==''){
   if(restrictionType.test(myData)){
    alert('It is GOOD!');
   }else{
    alert('Your data input is invalid!');
   }
  }else{
   alert('Please enter data!');
  }
  return;
    
 }*/



var checkForm = function(form){

	var inputNode = form.getElementsByTagName('input')[0];
	// validation fails if the input is blank
	if(inputNode.value == "") {
		alert("Error: Input is empty!");
		inputNode.focus();
		return false;
	}
	// regular expression to match only alphanumeric characters and spaces
	var re = /^[\w ]+$/;
	// validation fails if the input doesn't match our regular expression
	if(!re.test(inputNode.value)) {
		alert("Error: Input contains invalid characters!");
		inputNode.focus();
		return false;
	}

	// validation was successful
	return true;
}

