var suffix = ["Renly", "Theon", "Hodor", "Jon", "Ned", "Arya", "Joffrey", "Cerceis", "Stannis", "Viserys", "Robert", "Jeort" ];
var preffix = ["Mormont", "Startk", "Winterfell", "Lannister", "Tully", "Baratheon", "Arryn", "Greyjoy", "Targaryen"];


for (var i = 1; i<100; i++)
{
    var emp = new ds.Employees();
    emp.firstName = suffix[Math.round(Math.random()*(suffix.length-1))];
    emp.lastName = preffix[Math.round(Math.random()*(preffix.length-1))];
    emp.age = 10 + Math.round(Math.random()*20);
    emp.photo = loadImage(getFolder("path") + "WebFolder/images/002_0"+ Math.round(Math.random()*4+1) +".png");
    emp.save();
}