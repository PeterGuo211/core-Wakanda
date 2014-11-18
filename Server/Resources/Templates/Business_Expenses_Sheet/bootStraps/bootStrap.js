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
if (ds.BusinessExpenseSheet.length === 0 || ds.Expense.length === 0) { 
    
    johnDoe2010 = {
        year: 2010,
        employee: "John Doe",
        department: "Marketing"
    };
    
    johnDoeBES = [];
    
    ["April", "May", "June"].forEach(
        function (month) {
            var bes;
            johnDoe2010.month = month;
            bes = new ds.BusinessExpenseSheet(johnDoe2010);
            bes.save();
            johnDoeBES.push(bes);
        }
    );
    

	[
	    'Conference New-York',
	    'Meeting Orlando',
	    'Business Point'
	].forEach(
	    function (description) {
	        johnDoeBES.forEach(
	            function (bes) {
	                var expense, johnDoeExpense;
	                johnDoeExpense = {
	                    businessExpenseSheet: bes,
	                    day: Math.floor(Math.random() * 27 + 1),
	                    description: description,
	                    transport: Math.floor(Math.random() * 50),
	                    restaurant: Math.floor(Math.random()* 70 + 20),
	                    hostel: Math.floor(Math.random() * 900 + 130)
	                };
	                expense = new ds.Expense(johnDoeExpense);
	                expense.save();
	            }
	        );
	    }
	);
}

ds.Expense.length;