/**

* @author admin

*/

// Login as admin

application.loginByPassword("admin","admin");

// Remove all entities
ds.PromoteInheritedModelRemove.drop();

// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.PromoteInheritedModelRemove.setAutoSequenceNumber(1);

// Add an entity to check the remove action
var e = ds.PromoteInheritedModelRemove.createEntity();
e.name = "to check remove";
e.save();

// logout the admin user
application.logout();