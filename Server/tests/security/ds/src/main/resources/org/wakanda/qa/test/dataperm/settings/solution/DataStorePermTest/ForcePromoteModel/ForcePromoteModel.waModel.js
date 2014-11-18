
guidedModel =// @startlock
{
	ForcePromoteModel :
	{
		methods :
		{// @endlock
			getEntitiesCount:function()
			{// @lock
				var token = application.currentSession().promoteWith("Admin");
				var size = this.length;
				currentSession().unPromote(token);
				return size;
			},// @lock
			promoteCreate:function()
			{// @lock
				var oldCount = this.getEntitiesCount();
				var e = this.createEntity();
				e.name = "whatever";
				// should now pass
				e.save();
				var newCount = this.getEntitiesCount();
				return newCount==(oldCount+1);
			},// @lock
			promoteRead:function()
			{// @lock
				// should not pass anymore
				this.all();
				return true;
			}// @startlock
		}
	}
};// @endlock

