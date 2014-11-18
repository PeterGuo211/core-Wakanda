/**

* @author admin

*/
// Login as admin

application.loginByPassword("admin","admin");

// Remove all entities
ds.ForceUpdate.drop();

// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.ForceUpdate.setAutoSequenceNumber(1);

// Add an entity to check the update action
var e = ds.ForceUpdate.createEntity();
e.name = "to check force update";
e.save();

// logout the admin user
application.logout();