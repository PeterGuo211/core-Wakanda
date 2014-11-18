/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
function raz(){
	ds.Emp.drop();
	ds.Company.drop();
	ds.City.drop();
	ds.WidgetDS.drop();
	ds.EventsFlag.drop();
	
	wait(10);
	ds.Emp.setAutoSequenceNumber(1);
	ds.Company.setAutoSequenceNumber(1);
	ds.City.setAutoSequenceNumber(1);
	ds.WidgetDS.setAutoSequenceNumber(1);
	ds.EventsFlag.setAutoSequenceNumber(1);
}

function buildData()
{
	raz();
	var cities = 
	[
	{
		name:'Paris',
		pop:2000000
	},
	{
		name:'Cupertino',
		pop:250000
	},
	{
		name:'New York',
		pop:4000000
	},
	{
		name:'Palo Alto',
		pop:140000
	}
	];
	
	var companies = 
	[
	{
		name:'4D',
		city:'Paris',
		CA:15000000
	},
	{
		name:'EDF',
		city:'Paris',
		CA:70000000000
	},
	{
		name:'Apple',
		city:'Cupertino',
		CA:15000000
	},
	{
		name:'ACME',
		city:'Cupertino',
		CA:1000000
	},
	{
		name:'SalesInc',
		city:'Cupertino',
		CA:3000000
	},
	{
		name:'Google',
		city:'Palo Alto',
		CA:80000000000
	}
	];
	
	var employees = 
	[
	{
		name:'Jean Durand',
		salary:70000,
		comp:'4D',
		integration: new Date("12/09/2011"),
		age: 25
	},
	{
		name:'Isabelle Dubois',
		salary:80000,
		comp:'4D',
		integration: new Date("12/08/2008"),
		age: 28
	},{
		name:'Henri Martin',
		salary:75000,
		comp:'EDF',
		integration: new Date("10/28/2005"),
		age: 30
	},{
		name:'Pascal Prebois',
		salary:100000,
		comp:'EDF',
		integration: new Date("04/12/2002"),
		age: 25
	},{
		name:'Julie Deschamps',
		salary:120000,
		comp:'EDF',
		integration: new Date("12/09/2011"),
		age: 38
	},{
		name:'Steve Jobs',
		salary:1000000,
		comp:'Apple',
		integration: new Date("12/09/2011"),
		age: 50
	},{
		name:'John Smith',
		salary:60000,
		comp:'Apple',
		integration: new Date("01/20/2006"),
		age: 30
	},{
		name:'Phil Johns',
		salary:78000,
		comp:'ACME',
		integration: new Date("12/09/2011"),
		age: 25
	},{
		name:'Beth Middler',
		salary:45000,
		comp:'ACME',
		integration: new Date("09/09/2010"),
		age: 25
	},{
		name:'Ed Rogers',
		salary:90000,
		comp:'Google',
		integration: new Date("10/08/2011"),
		age: 40
	}
	];

	
		
	for (var i = 0,nb = cities.length; i < nb; i++)
	{
		var c = cities[i];
		var city = new ds.City(
		{
			name:c.name,
			pop:c.pop
		});
		
		city.save();	
	}
	
	for (var i = 0,nb = companies.length; i < nb; i++)
	{
		var c = companies[i];
		var comp = new ds.Company(
		{
			name:c.name,
			ca:c.CA,
			location: ds.City.find("name = :1", c.city)
		});
		
		comp.save();	
	}
	
	for (var i = 0,nb = employees.length; i < nb; i++)
	{
		var p = employees[i];
		var emp = new ds.Emp(
		{
			name:p.name,
			salary:p.salary,
			company: ds.Company.find("name = :1", p.comp),
			integration: p.integration,
			age: p.age
		});
		
		emp.save();	
	}
	
	for (var i = 0; i < 20; i++) {
		var elt = { name : "element"+i, num : Math.floor((Math.random() * 100) + 1)};
		var newelt = new ds.WidgetDS(elt);
		newelt.save();
	};
	
}

buildData();

"all done";