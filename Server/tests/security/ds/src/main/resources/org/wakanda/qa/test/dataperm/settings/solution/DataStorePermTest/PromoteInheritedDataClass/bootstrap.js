/**

* @author admin

*/

// Login as admin

application.loginByPassword("admin","admin");

// Remove all entities
ds.PromoteInheritedDataClassRead.drop();
ds.PromoteInheritedDataClassCreate.drop();
ds.PromoteInheritedDataClassUpdate.drop();
ds.PromoteInheritedDataClassRemove.drop();

// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.PromoteInheritedDataClassRead.setAutoSequenceNumber(1);
ds.PromoteInheritedDataClassCreate.setAutoSequenceNumber(1);
ds.PromoteInheritedDataClassUpdate.setAutoSequenceNumber(1);
ds.PromoteInheritedDataClassRemove.setAutoSequenceNumber(1);

// Add an entity to check the promoted update privilege
var e = ds.PromoteInheritedDataClassUpdate.createEntity();
e.name = "to check promote on update action";
e.save();


// Add an entity to check the promoted remove privilege
var e = ds.PromoteInheritedDataClassRemove.createEntity();
e.name = "to check non promote on remove action";
e.save();

// logout the admin user
application.logout();