model.Employee4.methods.getStaticToClass = function () {
				return "toClass";
			};


model.Employee4.methods.getLargestSalary = function () {
				return this.max("salary");
			};


model.Employee4.entityMethods.getStaticToEntity = function () {
				return "toEntity";
			};


model.Employee4.entityMethods.getCoWorkers = function (excludingMyself) {
				if (this.manager == null)
					return ds.Employee4.createEntityCollection(); // returns an empty collection
				else
				{
					var coworkers = this.manager.directReports; // my coworkers have the same manager than me
					if (excludingMyself)
					{
						var myself = ds.Employee4.createEntityCollection();
						myself.add(this);
						coworkers = coworkers.minus(myself);
					}
					return coworkers;	
				}
			};


model.Employee4.collectionMethods.getStaticToColl = function () {
				return "toCollection";
			};


model.Employee4.collectionMethods.getAgeAverage = function () {
				return this.average("age");
			};


