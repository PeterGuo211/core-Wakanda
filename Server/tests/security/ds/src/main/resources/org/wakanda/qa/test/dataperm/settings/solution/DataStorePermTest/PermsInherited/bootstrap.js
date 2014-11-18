/**

* @author admin

*/

// Login as admin

application.loginByPassword("admin","admin");

// Remove all entities
ds.UpdateInherited.drop();
ds.RemoveInherited.drop();

// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.UpdateInherited.setAutoSequenceNumber(1);
ds.RemoveInherited.setAutoSequenceNumber(1);

// Add an entity to check the update action
var e = ds.UpdateInherited.createEntity();
e.name = "to check update";
e.save();

// Add an entity to check the remove action
var e = ds.RemoveInherited.createEntity();
e.name = "to check remove";
e.save();

// logout the admin user
application.logout();