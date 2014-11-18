
guidedModel =// @startlock
{
	PromoteInheritedModelRemove :
	{
		methods :
		{// @endlock
			promoteInheritedModelRemove:function()
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
	}
};// @endlock
