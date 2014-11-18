
guidedModel =// @startlock
{
	PromoteInheritedDataClassRemove :
	{
		methods :
		{// @endlock
			promoteInheritedDataClassRemove:function()
			{// @lock
				if(this.length < 1){
					console.log("Data init problem");
					// we got the right, so no problem
					var ne = this.createEntity();
					ne.name = "whatever";
					ne.save();
				}
				var oldCount = this.length;
				var e = this.first();
				// should pass
				e.remove();
				var newCount = this.length;
				return newCount===(oldCount-1);
			}// @startlock
		}
	},
	PromoteInheritedDataClassUpdate :
	{
		methods :
		{// @endlock
			promoteInheritedDataClassUpdate:function()
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
				e = this.first();				
				return e.name===newVal;
			}// @startlock
		}
	},
	PromoteInheritedDataClassCreate :
	{
		methods :
		{// @endlock
			promoteInheritedDataClassCreate:function()
			{// @lock
				var oldCount = this.length;
				var e = this.createEntity();
				e.name = "value";
				// should pass
				e.save();
				var newCount = this.length;
				return newCount===(oldCount+1);
			}// @startlock
		}
	},
	PromoteInheritedDataClassRead :
	{
		methods :
		{// @endlock
			promoteInheritedDataClassRead:function()
			{// @lock
				// should pass
				this.all();
				return true;
			}// @startlock
		}
	}
};// @endlock
