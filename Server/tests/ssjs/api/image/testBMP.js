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
var bit = [16,24,"OS-2_24",32];
var bmpResolution = [320240, 640480, 800600, 1024768, 1152864, 12801024, 1280854, 1440900, 16001200];
var bmpLogic = ["SaveImageAsEntityFileObjectWithLoadImage","SaveImageAsEntityAbsolutePathWithLoadImage","SaveImageAsEntityFileObjectWithoutLoadImage","SaveImageAsEntityAbsolutePathWithoutLoadImage"];


function count() {
	var counter = 0;
	for (var p in this) if (this.hasOwnProperty(p))++counter;
	return counter;
}

function generateJSON()
{
	var jsonResult =
	{
		"imageType" : "bmp",
		"name" : "BMPtest",
		"bmpLogic" :
		[]
	};
	for (var bmpCase = 0; bmpCase < bmpResolution.length;bmpCase++)
	{
		for (var configCase = 0;configCase < bmpLogic.length;configCase++)
		{
			for (var bitCase = 0;bitCase < bit.length;bitCase++)
			{
				jsonResult.bmpLogic.push(
					{
						"case" : bmpCase,
						"bmpCase":
						{
							"file" : bmpResolution[bmpCase] + "_" + bit[bitCase] + "bit.bmp",
							"config" : bmpLogic[configCase]
						}
					}
				);	
			};
		};
	};
	return jsonResult;
}; 

var BMPLogicCase = generateJSON();

function generator(file,config)
{
	
index++;
//Init Local variable 
var MyImage = new ds.ImageWithLoadImage();
var	thepath = getFolder("path");
var	exceptions = 0;
var	e;
var pictFile = File(thepath + "images/bmp/" + file);

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
		var img = loadImage(thepath + "images/bmp/" + file);
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
		var img = thepath + "images/bmp/" + file;
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
console.log("No config to test for BMP");

//Asserts
Y.Assert.areEqual(0, exceptions,"We got exception " + exceptions);
Y.Assert.isNotNull(MyImage.pics,"Object MyImage.pics is null");
Y.Assert.areEqual(true, result,"Saving doesn't work : " + result);
};

var testCase = 
{
	name: "test API image BMP",
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
	 * Test methods for API SSJS IMAGE BMP
	 *
	 */
};

//Attention, different scope for() and function()
for (var bmp = 0; bmp < BMPLogicCase.bmpLogic.length; bmp++)
{
	testCase["testImage_" + BMPLogicCase.bmpLogic[bmp].case + "_" + bmp + "_" + BMPLogicCase.bmpLogic[bmp].bmpCase.config + "_" + BMPLogicCase.bmpLogic[bmp].bmpCase.file + "_" + "BMP"] = function()
	{
		var pbmp = BMPLogicCase.bmpLogic[index].bmpCase.file;
		var pbmp1 = BMPLogicCase.bmpLogic[index].bmpCase.config;

		console.log("BMP File " + pbmp);
		console.log("BMP Config " + pbmp1);

		generator(pbmp,pbmp1);
	};
};



