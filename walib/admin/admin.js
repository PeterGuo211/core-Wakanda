function MeasureCollection(container, frameIDPrefix)
{
	this.measureFrames = [];
	this.container = container;
	this.lastFrameID = 0;
	this.frameIDPrefix = frameIDPrefix;
	return this;
}

MeasureCollection.prototype.addMeasureFrame = function()
{
	var newFrame = new MeasureFrame();
	this.measureFrames.push(newFrame);
	return newFrame
}

MeasureCollection.prototype.getContainer = function()
{
	return this.container;
}

MeasureCollection.prototype.getFrame = function(n)
{
	return this.measureFrames[n];
}

MeasureCollection.prototype.countFrames = function()
{
	return this.measureFrames.length;
}

MeasureCollection.prototype.getNextFrameID = function()
{
	this.lastFrameID++;
	return this.frameIDPrefix+this.lastFrameID;
}

// -----------------------------------------------------------------------


function MeasureFrame(parent)
{
	this.parent = parent;
	var container = parent.getContainer();
	var id = parent.getNextFrameID();
	
	return this;
}



// -----------------------------------------------------------------------


function pageAdmin()
{
	
	function addMeasureFrame()
	{
		
	}
	
	var measures = new MeasureCollection($("#measures"));
	
}


$(document).ready(pageAdmin);