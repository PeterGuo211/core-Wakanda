
function calculate(request,response)
{
	debugger;
	var a=request.parts[0].asText;
	var b=request.parts[1].asText;
	//debugger;
    var c=a+b;
	return c;

}