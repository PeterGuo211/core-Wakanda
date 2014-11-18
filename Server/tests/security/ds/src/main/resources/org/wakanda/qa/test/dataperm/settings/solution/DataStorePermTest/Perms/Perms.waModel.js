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

guidedModel =// @startlock
{
	NonPromoteRemove :
	{
		methods :
		{// @endlock
			nonPromoteRemove:function()
			{// @lock
				var e = this.first();
				// should throw exception
				e.remove();
				// otherwise
				return false;
			}// @startlock
		}
	},
	NonPromoteUpdate :
	{
		methods :
		{// @endlock
			nonPromoteUpdate:function()
			{// @lock
				if(this.length < 1){
					console.log("Data init problem");
					// we got the right, so no problem
					var ne = this.createEntity();
					ne.name = "whatever";
					ne.save();
				}
				var e = this.first();
				var oldVal = e.name;
				var newVal = oldVal.split("").reverse().join("");
				e.name = newVal;
				// should throw exception
				e.save();
				// otherwise
				return false;
			}// @startlock
		}
	},
	NonPromoteCreate :
	{
		methods :
		{// @endlock
			nonPromoteCreate:function()
			{// @lock
				var e = this.createEntity();
				e.name = "whatever";
				// should throw exception
				e.save();
				// otherwise
				return false;
			}// @startlock
		}
	},
	NonPromoteRead :
	{
		methods :
		{// @endlock
			nonPromoteRead:function()
			{// @lock
				// should throw execption
				var ec = this.all();
				// otherwise
				return false;
			}// @startlock
		}
	},
	PromoteRemove :
	{
		methods :
		{// @endlock
			promoteRemove:function()
			{// @lock
				if(this.length < 1){
					console.log("Data init problem");
					// we got the right, so no problem
					var ne = this.createEntity();
					ne.name = "whatever";
					ne.save();
				}
				var oldCount = this.length;
				// get first entity
				var e = this.first();
				// should pass
				e.remove();
				// check
				var newCount = this.length;
				return newCount===(oldCount-1);
			}// @startlock
		}
	},
	PromoteUpdate :
	{
		methods :
		{// @endlock
			promoteUpdate:function()
			{// @lock
				if(this.length < 1){
					console.log("Data init problem");
					// we got the right, so no problem
					var ne = this.createEntity();
					ne.name = "whatever";
					ne.save();
				}
				var e = this.first();
				var oldVal = e.name;
				var newVal = oldVal.split("").reverse().join("");
				e.name = newVal;
				// should pass
				e.save();
				return true;
			}// @startlock
		}
	},
	PromoteCreate :
	{
		methods :
		{// @endlock
			promoteCreate:function()
			{// @lock
				var oldCount = this.length;
				var e = this.createEntity();
				e.name = "whatever";
				// should pass
				e.save();
				var newCount = this.length;
				return newCount===(oldCount+1);
			}// @startlock
		}
	},
	PromoteRead :
	{
		methods :
		{// @endlock
			promoteRead:function()
			{// @lock
				// should pass
				this.all();
				return true;
			}// @startlock
		}
	},
	Promote :
	{
		methods :
		{// @endlock
			promote:function()
			{// @lock
				// Add your code here
			}// @startlock
		}
	},
	Execute :
	{
		methods :
		{// @endlock
			secured:function()
			{// @lock
				return true;
			}// @startlock
		}
	}
};// @endlock

