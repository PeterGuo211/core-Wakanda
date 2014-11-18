
guidedModel =// @startlock
{
	ExecuteOverrideDataClass :
	{
		methods :
		{// @endlock
			secured:function()
			{// @lock
				return true;
			}// @startlock
		}
	},
	ExecuteOverrideModel :
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
