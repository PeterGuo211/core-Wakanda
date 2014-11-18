

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
