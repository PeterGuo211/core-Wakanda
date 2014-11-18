
guidedModel =// @startlock
{
	PromoteOverrideDataClass :
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
			doUnauthRead:function()
			{// @lock
				// should not pass
				this.all();
				return true;
			},// @lock
			doAuthCreate:function()
			{// @lock
				var oldCount = this.getEntitiesCount();
				var e = this.createEntity();
				e.name = "whatever";
				// should now pass
				e.save();
				var newCount = this.getEntitiesCount();
				return newCount==(oldCount+1);
			}// @startlock
		}
	},
	PromoteOverrideModel :
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
			doUnauthRead:function()
			{// @lock
				// should not pass
				this.all();
				return true;
				
			},// @lock
			doAuthCreate:function()
			{// @lock
				var oldCount = this.getEntitiesCount();
				var e = this.createEntity();
				e.name = "whatever";
				// should now pass
				e.save();
				var newCount = this.getEntitiesCount();
				return newCount==(oldCount+1);
			}// @startlock
		}
	}
};// @endlock
