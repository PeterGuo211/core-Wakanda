/*	The helloWorld() function can be executed from any of your project's server-side JavaScript file using the require() method as follows:
	var result = require('debugTools').helloWorld();

	For more information, refer to http://doc.wakanda.org/Wakanda Studio0.Beta/help/Title/en/page3355.html
*/

var firstPartMemInfo = null;


function diff(arr1, arr2)
{
	var obj1 = {};
	var obj2 = {};
	arr1.forEach(function(elem) {
		obj1[elem.id] = elem.count;
	});
	
	arr2.forEach(function(elem) {
		obj2[elem.id] = elem.count;
	});
	
	var diffs = [];
	
	for (var e in obj1)
	{
		var x1 = obj1[e];
		var x2 = obj2[e];
		if (x2 == null)
		{
			diffs.push({id : e, count: x1, previous : 0 });
		}
		else
		{
			if (x1 !== x2)
			{
				diffs.push({id : e, count: x1, previous : x2 });
			}
		}
	}
	
	return diffs;
}

exports.firstPart = function()
{
	ds.freeCacheMem();
	firstPartMemInfo = ds.getCacheInfo();
}

exports.getLeaks = function()
{
	ds.freeCacheMem();
	var secondPartMemInfo = ds.getCacheInfo();
	
	var result = {};
	if (firstPartMemInfo == null)
		throw { error : 1001, errorMessage:"you need to run firstPart first" };
		
	var res1 = diff(secondPartMemInfo.objects, firstPartMemInfo.objects);
	var res2 = diff(secondPartMemInfo.blocks, firstPartMemInfo.blocks);
	
	if (res1.length > 0)
		result.objects = res1;
		
	if (res2.length > 0)
		result.blocks = res2;

	
	firstPartMemInfo = secondPartMemInfo;
	return result;
}