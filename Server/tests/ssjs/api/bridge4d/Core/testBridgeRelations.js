var testCase = {
    name: "Bridge Wakanda-4D TU_RelationsProjections",
    
    _should: {
		error: {
			
		},
		ignore: {
			
		}
    },
    
    setUp : function () {
    	/*
        if (os.isWindows) {
    	}
    	if (os.isLinux) {
    	}
    	*/
    },
	//	begin of Reflexive Relation tests
	testExistenceOfRelatedAttributes_Reflexive: function () {
		var myClass = ds.People;
		if(myClass.attributes.PeopleFather_relation.kind != "relatedEntity")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(myClass.attributes.PeopleFather_relation_retour.kind != "relatedEntities")
			Y.Assert.fail("Existence of the related attributes test fail");
	},
	testAddRecordsWithRelatedEntities: function () {
		var isGood = true;
		var Jean = new ds.People();
		Jean.name = "Jean";
		Jean.sexe = "M";
		Jean.save();

		var Sara = new ds.People();
		Sara.name = "Sara";
		Sara.sexe = "F";
		Sara.save();

		var Sebastien = new ds.People();
		Sebastien.name = "Sebastien";
		Sebastien.sexe = "M";
		Sebastien.PeopleFather_relation = Jean;
		Sebastien.PeopleMother_relation = Sara;
		Sebastien.save();

		var Sophie = new ds.People();
		Sophie.name = "Sophie";
		Sophie.sexe = "F";
		Sophie.PeopleFather_relation = Jean;
		Sophie.PeopleMother_relation = Sara;
		Sophie.save();

		if(Jean.name != "Jean" || Jean.sexe != "M")
			Y.Assert.fail("Add records with related entities fail");
		if(Sara.name != "Sara" || Sara.sexe != "F")
			Y.Assert.fail("Add records with related entities fail");
		if(Sebastien.name != "Sebastien" || Sebastien.sexe != "M" || Sebastien.PeopleFather_relation.name != "Jean" || Sebastien.PeopleMother_relation.name != "Sara")
			Y.Assert.fail("Add records with related entities fail");
		if(Sophie.name != "Sophie" || Sophie.sexe != "F" || Sophie.PeopleFather_relation.name != "Jean" || Sophie.PeopleMother_relation.name != "Sara")
			Y.Assert.fail("Add records with related entities fail");
	},
	testRecords_Brothers: function () {
		var Sebastien = ds.People.find("name like 'Sebastien'");
		var SebastienBrother = Sebastien.PeopleFather_relation.PeopleFather_relation_retour;
		if(SebastienBrother.length != 2)
			Y.Assert.fail("Add records with related entities fail");
		if(SebastienBrother[0].name == "Sebastien"){
			if(SebastienBrother[1].name != "Sophie")
				Y.Assert.fail("Add records with related entities fail");
		}else if(SebastienBrogher[0].name != "Sophie" || SebastienBrogher[1].name != "Sebastien")
				Y.Assert.fail("Add records with related entities fail");
	},
	testAddRecords_Level3: function() {
		var Jean = ds.People.find("name like 'Jean'");
		var Alian = new ds.People();
		Alian.name = "Alian";
		Alian.sexe = "M";
		Alian.save();
		Jean.PeopleFather_relation = Alian;
		Jean.save();

		var AlianGrandChild = Alian.PeopleFather_relation_retour[0].PeopleFather_relation_retour;
		if(AlianGrandChild.length != 2)
					Y.Assert.fail("Add records with related entities fail");
				if(AlianGrandChild[0].name == "Sebastien"){
					if(AlianGrandChild[1].name != "Sophie")
						Y.Assert.fail("Add records with related entities fail");
				}else if(SebastienBrogher[0].name != "Sophie" || SebastienBrogher[1].name != "Sebastien")
						Y.Assert.fail("Add records with related entities fail");
	},
	//	end of Reflexive Relation tests
	// begin of Relation N-1 with two tables
	testExistenceOfRelatedAttributes_NtoOne:function(){
		var myClass9 = ds.MyClass9;
		var myClass10 = ds.MyClass10;
		if(myClass9.attributes.Class9Class10_relation.kind != "relatedEntity")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(myClass10.attributes.Class9Class10_relation_retour.kind != "relatedEntities")
			Y.Assert.fail("Existence of the related attributes test fail");
	},
	testRelatedRecords_NtoOne:function(){
		var X = new ds.MyClass10();
		X.cname = "X";
		X.save();
		var Y = new ds.MyClass10();
		Y.cname = "Y";
		Y.save();

		var X_1 = new ds.MyClass9();
		X_1.name = "X_1";
		X_1.Class9Class10_relation = X ; 
		X_1.save();
		var X_2 = new ds.MyClass9();
		X_2.name = "X_2";
		X_2.Class9Class10_relation = X ;
		X_2.save();
		var X_3 = new ds.MyClass9();
		X_3.name = "X_3";
		X_3.Class9Class10_relation = X ;
		X_3.save();
		var Y_1 = new ds.MyClass9();
		Y_1.name = "Y_1";
		Y_1.Class9Class10_relation = Y ;
		Y_1.save();
		var Y_2 = new ds.MyClass9();
		Y_2.name = "Y_2";
		Y_2.Class9Class10_relation = Y ;
		Y_2.save();

		if(X.Class9Class10_relation_retour.length != 3)
			Y.Assert.fail("query method applied with N to One relation attributes fail");
		if(Y.Class9Class10_relation_retour.length != 2)
			Y.Assert.fail("query method applied with N to One relation attributes fail");
		for(var i = 0;i<3;i++){
			var nom = "X_"+(i+1);
			if(X.Class9Class10_relation_retour[i].name != nom){
				Y.Assert.fail("query method applied with N to One relation attributes fail");
				break;
			}
		}
		for(var i = 0;i<2;i++){
			var nom = "Y_"+(i+1);
			if(Y.Class9Class10_relation_retour[i].name != nom){
				Y.Assert.fail("query method applied with N to One relation attributes fail");
				break;
			}
		}
	},
	//end of Relation N-1 with two tables
	//begin of N to N relation tests
	testQuery_NToNRelationAttributes: function() {
		var coll = ds.Engineer.query("AttenEngi_relation_retour.AttenConf_relation.title = java7");
		if(coll.length != 2 || coll[0].ID!=1 || coll[1].ID != 2 )
			Y.Assert.fail("query method applied with N to N relation attributes fail");
	},
	testExistenceOfRelatedAttributes_NtoN:function(){
		var Engineer = ds.Engineer;
		var Conference = ds.Conference;
		var Attendee = ds.Attendee;
		if(Engineer.attributes.AttenEngi_relation_retour.kind != "relatedEntities")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(Conference.attributes.AttenConf_relation_retour.kind != "relatedEntities")
			Y.Assert.fail("Existence of the related attributes test fail");	
		if(Attendee.attributes.AttenEngi_relation.kind != "relatedEntity")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(Attendee.attributes.AttenConf_relation.kind != "relatedEntity")
			Y.Assert.fail("Existence of the related attributes test fail");	
	},
	testNToNRelationAttributesAccess: function() {
		if(ds.Attendee.find("ID = 2").AttenConf_relation.title != "Java7")
			Y.Assert.fail("Access N to N relation attributes fail");
		if(ds.Attendee.find("ID = 2").AttenEngi_relation.name != "Flan")
			Y.Assert.fail("Access N to N relation attributes fail");
	},
	//end of N to N relation tests
	//begin of Transitive relation tests
	testExistenceOfRelatedAttributes_Trasitive:function() {
		var Rel_1_Start = ds.REL_1_Start;
		var Rel_1_Mid = ds.REL_1_Mid;
		var Rel_1_End = ds.REL_1_End;
		if(Rel_1_Start.attributes.Link_10.kind != "relatedEntity")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(Rel_1_Mid.attributes.Link_10_return.kind != "relatedEntities")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(Rel_1_Mid.attributes.Link_11.kind != "relatedEntity")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(Rel_1_End.attributes.Link_11_return.kind != "relatedEntities")
			Y.Assert.fail("Existence of the related attributes test fail");	
	},
	testTransitiveRelationAccess:function(){
	/*
		var rel_1_end = new ds.REL_1_End();
		rel_1_end.ID = 1;  //le bug WAK0083603 nous oblige de faire cette affectation
		rel_1_end.save();

		var rel_1_mid = new ds.REL_1_Mid();
		rel_1_mid.ID = 1;  //le bug WAK0083603 nous oblige de faire cette affectation
		rel_1_mid.Link_11 = rel_1_end;
		rel_1_mid.save();

		var rel_1_start = new ds.REL_1_Start();
		rel_1_start.ID = 1;  //le bug WAK0083603 nous oblige de faire cette affectation
		rel_1_start.Link_10 = rel_1_mid;
		rel_1_start.save();
	*/
		var rel_1_start = ds.REL_1_Start.find("ID = 5");
		Y.Assert.areEqual(2,rel_1_start.Link_10.Link_11.ID,"Accessing transitive relation fail");
	},
	//end of  Transitive relation tests
	//begin of ternary relation
	testExistenceOfRelatedAttributes_Ternary:function() {
		var seance = ds.Seance;
		var film = ds.Film;
		var salle = ds.Salle;
		var projection = ds.Projection;
		if(seance.attributes.Link_12_return.kind != "relatedEntities")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(film.attributes.Link_13_return.kind != "relatedEntities")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(salle.attributes.Link_14_return.kind != "relatedEntities")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(projection.attributes.Link_12.kind != "relatedEntity")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(projection.attributes.Link_13.kind != "relatedEntity")
			Y.Assert.fail("Existence of the related attributes test fail");
		if(projection.attributes.Link_14.kind != "relatedEntity")
			Y.Assert.fail("Existence of the related attributes test fail");
	},
	testTernaryRelationAccess:function(){
	
		var film_1 = ds.Film.find("ID = 1");

		var seance_1 = ds.Seance.find("ID = 2");

		var salle_1 = ds.Salle.find("ID = 3");

		var projection_1 = ds.Projection.find("ID = 1");
	
		
		if(projection_1.Link_12.ID != seance_1.ID || projection_1.Link_13.ID != film_1.ID || projection_1.Link_14.ID != salle_1.ID )
			Y.Assert.fail("Accessing transitive relation fail");
		}
	//end of ternary relation
}

