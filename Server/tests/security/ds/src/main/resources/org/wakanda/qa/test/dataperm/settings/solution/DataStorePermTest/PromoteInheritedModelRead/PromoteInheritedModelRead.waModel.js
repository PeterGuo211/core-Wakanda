
guidedModel =// @startlock
{
	PromoteInheritedModelRead :
	{
		methods :
		{// @endlock
			promoteInheritedModelRead:function()
			{// @lock
				// should pass
				this.all();
				return true;
			}// @startlock
		}
	}
};// @endlock
