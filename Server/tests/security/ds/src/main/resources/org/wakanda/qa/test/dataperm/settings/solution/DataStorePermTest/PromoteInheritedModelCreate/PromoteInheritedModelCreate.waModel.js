
guidedModel =// @startlock
{
	PromoteInheritedModelCreate :
	{
		methods :
		{// @endlock
			promoteInheritedModelCreate:function()
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
	}
};// @endlock
