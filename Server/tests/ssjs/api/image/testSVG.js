/*
 * This file is part of Wakanda software, licensed by 4D under
 *  (i) the GNU General Public License version 3 (GNU GPL v3), or
 *  (ii) the Affero General Public License version 3 (AGPL v3) or
 *  (iii) a commercial license.
 * This file remains the exclusive property of 4D and/or its licensors
 * and is protected by national and international legislations.
 * In any event, Licensee's compliance with the terms and conditions
 * of the applicable license constitutes a prerequisite to any use of this file.
 * Except as otherwise expressly stated in the applicable license,
 * such license does not include any other license or rights on this file,
 * 4D's and/or its licensors' trademarks and/or other proprietary rights.
 * Consequently, no title, copyright or other proprietary rights
 * other than those specified in the applicable license is granted.
 */

/*
var appPath = application.getFolder("path"),
    imagesFolder = Folder(appPath + 'images'),
*/
//Init Global variable 
var value = 0;
var index = 0;
var svgResolution = [320240, 640480, 800600, 1024768, 1152864, 12801024, 1280854, 1440900, 16001200];
var svgLogic = ["SaveImageAsEntityFileObjectWithLoadImage","SaveImageAsEntityAbsolutePathWithLoadImage","SaveImageAsEntityFileObjectWithoutLoadImage","SaveImageAsEntityAbsolutePathWithoutLoadImage"];


function count() {
	var counter = 0;
	for (var p in this) if (this.hasOwnProperty(p))++counter;
	return counter;
}

function generateJSON()
{
	var jsonResult =
	{
		"imageType" : "svg",
		"name" : "SVGtest",
		"svgLogic" :
		[]
	};
	for (var svgCase = 0; svgCase < svgResolution.length;svgCase++)
	{
		for (var configCase = 0;configCase < svgLogic.length;configCase++)
		{
			jsonResult.svgLogic.push(
				{
					"case" : svgCase,
					"svgCase":
					{
						"file" : svgResolution[svgCase] + ".svg",
						"config" : svgLogic[configCase]
					}
				}
			);
		};
	};
	return jsonResult;
}; 

var SVGLogicCase = generateJSON();

function generator(file,config)
{
	
index++;
//Init Local variable 
var MyImage = new ds.ImageWithLoadImage();
var	thepath = getFolder("path");
var	exceptions = 0;
var	e;
var pictFile = File(thepath + "images/svg/" + file);

if (config == "SaveImageAsEntityFileObjectWithLoadImage")
{
// Case : SaveImageAsEntityFileObjectWithLoadImage
	try 
	{
		var	img = loadImage(pictFile);
		MyImage.pics = img;
		MyImage.info = index;
		result = MyImage.save();
	} 
	catch (e) 
	{
		exceptions++;
		console.log("we caught : " + e);
	};
}
else if (config == "SaveImageAsEntityAbsolutePathWithLoadImage")
{
// Case : SaveImageAsEntityAbsolutePathWithLoadImage
	try 
	{
		var img = loadImage(thepath + "images/svg/" + file);
		MyImage.pics = img;
		MyImage.info = index;
		result = MyImage.save();
	} 
	catch (e) 
	{
		exceptions++;
		console.log("we caught : " + e);
	};
}
else if (config == "SaveImageAsEntityFileObjectWithoutLoadImage")
{
// Case : SaveImageAsEntityFileObjectWithoutLoadImage
	try 
	{
		var img = pictFile;
		MyImage.pics = img;
		MyImage.info = index;
		result = MyImage.save();
		} 
		catch (e) 
		{
			exceptions++;
			console.log("we caught : " + e);
		};
}
else if (config == "SaveImageAsEntityAbsolutePathWithoutLoadImage")
{
// Case : SaveImageAsEntityAbsolutePathWithoutLoadImage
	try 
	{
		var img = thepath + "images/svg/" + file;
		MyImage.pics = img;
		MyImage.info = index;
		result = MyImage.save();
	} 
	catch (e) 
	{
		exceptions++;
		console.log("we caught : " + e);
	};
}
else
console.log("No config to test for SVG");

//Asserts
Y.Assert.areEqual(0, exceptions,"We got exception " + exceptions);
Y.Assert.isNotNull(MyImage.pics,"Object MyImage.pics is null");
Y.Assert.areEqual(true, result,"Saving doesn't work : " + result);
};

var testCase = 
{
	name: "test API image SVG",
	_should: {
		error: {},
		ignore: {}
	},	
	/*
	 * Sets up data that is needed by each test.
	 */ 
	setUp: function() 
	{
		//imagesFolder.create();
	},
	/*
	 * Cleans up everything that was created by setUp().
	 */
	tearDown: function() 
	{
		
		//ds.Image.remove();
		//ds.ImageWithLoadImage.remove();
		//ds.ImageWithoutLoadImage.remove();
		 
	}
	/*
	 *
	 * Test methods for API SSJS IMAGE SVG
	 *
	 */
};

//Attention, different scope for() and function()
for (var svg = 0; svg < SVGLogicCase.svgLogic.length; svg++)
{
	testCase["testImage_" + SVGLogicCase.svgLogic[svg].case + "_" + svg + "_" + SVGLogicCase.svgLogic[svg].svgCase.config + "_" + SVGLogicCase.svgLogic[svg].svgCase.file + "_" + "SVG"] = function()
	{
		var psvg = SVGLogicCase.svgLogic[index].svgCase.file;
		var psvg1 = SVGLogicCase.svgLogic[index].svgCase.config;

		console.log("SVG File " + psvg);
		console.log("SVG Config " + psvg1);

		generator(psvg,psvg1);
	};
};



