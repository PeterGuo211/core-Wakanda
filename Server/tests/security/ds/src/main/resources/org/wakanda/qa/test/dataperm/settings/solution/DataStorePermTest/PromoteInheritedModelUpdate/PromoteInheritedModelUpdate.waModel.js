
guidedModel =// @startlock
{
	PromoteInheritedModelUpdate :
	{
		methods :
		{// @endlock
			promoteInheritedModelUpdate:function()
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
	}
};// @endlock
