var types = function types( request, response) {
var person={fname:"John",lname:"Doe",age:25}; 
var ah_Number = 20;
var ah_str = "ah_STRING";
var ah_str_quote= 'ah_STRING_QUOTE';
var ah_date = new Date("2013/07/23");
var ah_file_win = File("C:/toto");
var ah_file_mac = File("/toto");
var myBlob = new Blob( 20 , 88, "application/octet-stream"); 
var und=null;
var MonTableau = ["donnee 1", "donnee 2", "donnee 3", "donnee 4"];

var date_up_2099= new Date(2099,11,31); //bug ref : 2033WAK0083016

var ah_xhr = new XMLHttpRequest();

debugger;
}