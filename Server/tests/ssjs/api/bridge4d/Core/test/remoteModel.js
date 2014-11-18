
//*************** Calculated attribute ****************


//****************type alpha*************
//***************************************
model.CalculatedAttributes.calculatedAlpha = new Attribute("calculated","string");//Je créé mon attribut calculé


model.CalculatedAttributes.calculatedAlpha.onGet = function()
{
	return this.alpha1 + ' ' + this.alpha2; // J'affecte les valeurs de 'alpha1' et 'alpha2' dans mon attribut calculé 'calculatedAlpha'

}

model.CalculatedAttributes.calculatedAlpha.onSet = function(value) // je prends le contenu de 'calculatedAlpha' et l'affecte dans 'alpha1' et 'alpha2'
{
	var names = value.split(' '); 
    this.alpha1 = names[0];   
    this.alpha2 = names[1]; 

}

model.CalculatedAttributes.calculatedAlpha.onSort = function(ascending)
{
    if (ascending)
        return "alpha1";
    else
        return "alpha1 desc";
}

model.CalculatedAttributes.calculatedAlpha.onQuery = function(compareOperator, compareValue)
{
	var names = compareValue.split(' ');
    return "alpha1 "+compareOperator+" "+names[0] +" and " + "alpha2 "+compareOperator+" "+names[1];
}

//****************type text**************
//***************************************
model.CalculatedAttributes.calculatedText = new Attribute("calculated","string");//Je créé mon attribut calculé


model.CalculatedAttributes.calculatedText.onGet = function()
{
	return this.text1 + ' ' + this.text2; // J'affecte les valeurs de 'text1' et 'text2' dans mon attribut calculé 'calculatedText'

}

model.CalculatedAttributes.calculatedText.onSet = function(value) // je prends le contenu de 'calculatedText' et l'affecte dans 'text1' et 'text2'
{
	var names = value.split(' '); 
    this.text1 = names[0];   
    this.text2 = names[1]; 

}

model.CalculatedAttributes.calculatedText.onSort = function(ascending)
{
    if (ascending)
        return "text1";
    else
        return "text1 desc";
}

model.CalculatedAttributes.calculatedText.onQuery = function(compareOperator, compareValue)
{
	var names = compareValue.split(' ');
    return "text1 "+compareOperator+" "+names[0] +" and " + "text2 "+compareOperator+" "+names[1];
}

//****************type date*************
//***************************************
model.CalculatedAttributes.calculatedDate = new Attribute("calculated","date");//Je créé mon attribut calculé de type date


model.CalculatedAttributes.calculatedDate.onGet = function()
{
	if(this.date1 >= this.date2)
		return this.date1; // 
	else
		return this.date2;

}

model.CalculatedAttributes.calculatedDate.onSet = function(value) // 
{
    this.date1 = value;   
    this.date2 = value; 

}

model.CalculatedAttributes.calculatedDate.onSort = function(ascending)
{
    if (ascending)
        return "date1";
    else
        return "date1 desc";
}

model.CalculatedAttributes.calculatedDate.onQuery = function(compareOperator, compareValue)
{
    return "date1 "+compareOperator+" '"+compareValue.toISOString()+"'"+" and " + " date2 "+compareOperator+" '"+compareValue.toISOString()+"'";
}

//****************type time**************
//***************************************
model.CalculatedAttributes.calculatedTime = new Attribute("calculated","duration");//Je créé mon attribut calculé de type 


model.CalculatedAttributes.calculatedTime.onGet = function()
{
	return this.time1 + this.time2; // 

}

model.CalculatedAttributes.calculatedTime.onSet = function(value) // 
{
    this.time1 = value;   
    this.time2 = value; 

}

model.CalculatedAttributes.calculatedTime.onSort = function(ascending)
{
    if (ascending)
        return "time1";
    else
        return "time1 desc";
}

model.CalculatedAttributes.calculatedTime.onQuery = function(compareOperator, compareValue)
{
    return "time1 "+compareOperator+" "+compareValue +" and " + " time2 "+compareOperator+" "+compareValue;
}

//****************type boolean**************
//***************************************
model.CalculatedAttributes.calculatedBoolean = new Attribute("calculated","bool");

model.CalculatedAttributes.calculatedBoolean.onGet = function()
{
	return this.boolean1; //

}

model.CalculatedAttributes.calculatedBoolean.onSet = function(value) // 
{
    this.boolean1 = value;   
    this.boolean2 = value; 
}

model.CalculatedAttributes.calculatedBoolean.onSort = function(ascending)
{
    if (ascending)
        return "boolean1";
    else
        return "boolean1 desc";
}

model.CalculatedAttributes.calculatedBoolean.onQuery = function(compareOperator, compareValue)
{
    return "boolean1 "+compareOperator+" "+compareValue +" and " + " boolean2 "+compareOperator+" "+compareValue;
}

//****************type integer**************
//***************************************
model.CalculatedAttributes.calculatedInteger = new Attribute("calculated","word");


model.CalculatedAttributes.calculatedInteger.onGet = function()
{
	return this.integer1 + this.integer2; //

}

model.CalculatedAttributes.calculatedInteger.onSet = function(value) // 
{
    this.integer1 = value;   
    this.integer2 = value; 

}

model.CalculatedAttributes.calculatedInteger.onSort = function(ascending)
{
    if (ascending)
        return "integer1";
    else
        return "integer1 desc";
}

model.CalculatedAttributes.calculatedInteger.onQuery = function(compareOperator, compareValue)
{
    return "integer1 "+compareOperator+" "+compareValue +" and " + " integer2 "+compareOperator+" "+compareValue;
}

//****************type long int**************
//***************************************
model.CalculatedAttributes.calculatedLongInt = new Attribute("calculated","long");


model.CalculatedAttributes.calculatedLongInt.onGet = function()
{
	return this.longInt1 + this.longInt2; //

}

model.CalculatedAttributes.calculatedLongInt.onSet = function(value) // 
{
    this.longInt1 = value;   
    this.longInt2 = value; 

}

model.CalculatedAttributes.calculatedLongInt.onSort = function(ascending)
{
    if (ascending)
        return "longInt1";
    else
        return "longInt1 desc";
}

model.CalculatedAttributes.calculatedLongInt.onQuery = function(compareOperator, compareValue)
{
    return "longInt1 "+compareOperator+" "+compareValue +" and " + " longInt2 "+compareOperator+" "+compareValue;
}

//****************type integer64**************
//***************************************
model.CalculatedAttributes.calculatedInteger64 = new Attribute("calculated","long64");


model.CalculatedAttributes.calculatedInteger64.onGet = function()
{
	return this.integer641 + this.integer642; //

}

model.CalculatedAttributes.calculatedInteger64.onSet = function(value) // 
{
    this.integer641 = value;   
    this.integer642 = value; 

}

model.CalculatedAttributes.calculatedInteger64.onSort = function(ascending)
{
    if (ascending)
        return "integer641";
    else
        return "integer641 desc";
}

model.CalculatedAttributes.calculatedInteger64.onQuery = function(compareOperator, compareValue)
{
    return "integer641 "+compareOperator+" "+compareValue +" and " + " integer642 "+compareOperator+" "+compareValue;
}

//****************type real**************
//***************************************
model.CalculatedAttributes.calculatedReal = new Attribute("calculated","number");


model.CalculatedAttributes.calculatedReal.onGet = function()
{
	return this.real1 + this.real2; //

}

model.CalculatedAttributes.calculatedReal.onSet = function(value) // 
{
    this.real1 = value;   
    this.real2 = value; 

}

model.CalculatedAttributes.calculatedReal.onSort = function(ascending)
{
    if (ascending)
        return "real1";
    else
        return "real1 desc";
}

model.CalculatedAttributes.calculatedReal.onQuery = function(compareOperator, compareValue)
{
    return "real1 "+compareOperator+" "+compareValue +" and " + " real2 "+compareOperator+" "+compareValue;
}



//*************** Alias attribute ****************




//****************type alpha*************
//***************************************

model.HaveAlias.alphaAlias = new Attribute("alias", "string", "Link_15.calpha");
model.HaveAlias.alphaAlias.scope = "publicOnServer";

//****************type text**************
//***************************************

model.HaveAlias.textAlias = new Attribute("alias", "string", "Link_15.ctext");
model.HaveAlias.textAlias.scope = "public";

//****************type date*************
//***************************************

model.HaveAlias.dateAlias = new Attribute("alias", "date", "Link_15.cdate");

//****************type time**************
//***************************************

model.HaveAlias.timeAlias = new Attribute("alias", "number", "Link_15.ctime");

//****************type boolean**************
//***************************************

model.HaveAlias.boolAlias = new Attribute("alias", "bool", "Link_15.cbool");

//****************type integer**************
//***************************************

model.HaveAlias.integerAlias = new Attribute("alias", "number", "Link_15.cinteger");

//****************type long int**************
//***************************************

model.HaveAlias.longintegerAlias = new Attribute("alias", "long", "Link_15.clonginteger");

//****************type integer64**************
//***************************************

model.HaveAlias.integer64Alias = new Attribute("alias", "long64", "Link_15.cinteger64");

//****************type real**************
//***************************************

model.HaveAlias.floatAlias = new Attribute("alias", "number", "Link_15.cfloat");

//****************type integer**************
//***************************************

model.HaveAlias.blobAlias = new Attribute("alias", "blob", "Link_15.cblob");

//****************type long int**************
//***************************************

model.HaveAlias.pictureAlias = new Attribute("alias", "image", "Link_15.cpicture");


//*****************************************************************************
//*************** Extended alias attributes tests *****************************
//*****************************************************************************

model.ExtendedFromHaveAlias = new DataClass("ExtendedFromHaveAliasColl","public","HaveAlias");

//*****************************************************************************
//*************** Add alias attributes to an extended dataclass tests *****************************
//*****************************************************************************

//****************type alpha*************
//***************************************

model.ExtendedFromHaveAlias.newalphaAlias = new Attribute("alias", "string", "Link_15.calpha");

//****************type text**************
//***************************************

model.ExtendedFromHaveAlias.newtextAlias = new Attribute("alias", "string", "Link_15.ctext");

//****************type date*************
//***************************************

model.ExtendedFromHaveAlias.newdateAlias = new Attribute("alias", "date", "Link_15.cdate");

//****************type time**************
//***************************************

model.ExtendedFromHaveAlias.newtimeAlias = new Attribute("alias", "number", "Link_15.ctime");

//****************type boolean**************
//***************************************

model.ExtendedFromHaveAlias.newboolAlias = new Attribute("alias", "bool", "Link_15.cbool");

//****************type integer**************
//***************************************

model.ExtendedFromHaveAlias.newintegerAlias = new Attribute("alias", "number", "Link_15.cinteger");

//****************type long int**************
//***************************************

model.ExtendedFromHaveAlias.newlongintegerAlias = new Attribute("alias", "long", "Link_15.clonginteger");

//****************type integer64**************
//***************************************

model.ExtendedFromHaveAlias.newinteger64Alias = new Attribute("alias", "long64", "Link_15.cinteger64");

//****************type real**************
//***************************************

model.ExtendedFromHaveAlias.newfloatAlias = new Attribute("alias", "number", "Link_15.cfloat");

//****************type integer**************
//***************************************

model.ExtendedFromHaveAlias.newblobAlias = new Attribute("alias", "blob", "Link_15.cblob");

//****************type long int**************
//***************************************

model.ExtendedFromHaveAlias.newpictureAlias = new Attribute("alias", "image", "Link_15.cpicture");
include("./Model/Employee1/Employee1-events.js");
include("./Model/Employee2/Employee2-events.js");
include("./Model/Employee3/Employee3-events.js");
include("./Model/Employee21/Employee21-events.js");