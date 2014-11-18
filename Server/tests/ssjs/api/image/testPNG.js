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
var pngResolution = [320240, 640480, 800600, 1024768, 1152864, 12801024, 1280854, 1440900, 16001200];
var pngLogic = ["SaveImageAsEntityFileObjectWithLoadImage","SaveImageAsEntityAbsolutePathWithLoadImage","SaveImageAsEntityFileObjectWithoutLoadImage","SaveImageAsEntityAbsolutePathWithoutLoadImage"];


function count() {
	var counter = 0;
	for (var p in this) if (this.hasOwnProperty(p))++counter;
	return counter;
}

function generateJSON()
{
	var jsonResult =
	{
		"imageType" : "png",
		"name" : "PNGtest",
		"pngLogic" :
		[]
	};
	for (var pngCase = 0; pngCase < pngResolution.length;pngCase++)
	{
		for (var configCase = 0;configCase < pngLogic.length;configCase++)
		{
			jsonResult.pngLogic.push(
				{
					"case" : pngCase,
					"pngCase":
					{
						"file" : pngResolution[pngCase] + ".png",
						"config" : pngLogic[configCase]
					}
				}
			);
		};
	};
	return jsonResult;
};

var PNGLogicCase = generateJSON();

function generator(file,config)
{
	
index++;
//Init Local variable 
var MyImage = new ds.ImageWithLoadImage();
var	thepath = getFolder("path");
var	exceptions = 0;
var	e;
var pictFile = File(thepath + "images/png/" + file);

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
		var img = loadImage(thepath + "images/png/" + file);
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
		var img = thepath + "images/png/" + file;
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
console.log("No config to test for PNG");

//Asserts
Y.Assert.areEqual(0, exceptions,"We got exception " + exceptions);
Y.Assert.isNotNull(MyImage.pics,"Object MyImage.pics is null :");
Y.Assert.areEqual(true, result,"Saving doesn't work : " + result);
};

var testCase = 
{
	name: "test API image PNG",
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
	 * Test methods for API SSJS IMAGE PNG
	 *
	 */
};

//Attention, different scope for() and function()
for (var png = 0; png < PNGLogicCase.pngLogic.length; png++)
{
	testCase["testImage_" + PNGLogicCase.pngLogic[png].case + "_" + png + "_" + PNGLogicCase.pngLogic[png].pngCase.config + "_" + PNGLogicCase.pngLogic[png].pngCase.file + "_" + "PNG"] = function()
	{
		var ppng = PNGLogicCase.pngLogic[index].pngCase.file;
		var ppng1 = PNGLogicCase.pngLogic[index].pngCase.config;

		console.log("PNG File " + ppng);
		console.log("PNG Config " + ppng1);

		generator(ppng,ppng1);
	};
};



