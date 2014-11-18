/**

* @author admin

*/

// Login as admin

application.loginByPassword("admin","admin");

// Remove all entities
ds.Read.drop();
ds.Create.drop();
ds.Update.drop();
ds.Remove.drop();
ds.PromoteRead.drop();
ds.PromoteCreate.drop();
ds.PromoteUpdate.drop();
ds.PromoteRemove.drop();
ds.NonPromoteRead.drop();
ds.NonPromoteCreate.drop();
ds.NonPromoteUpdate.drop();
ds.NonPromoteRemove.drop();


// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.Read.setAutoSequenceNumber(1);
ds.Create.setAutoSequenceNumber(1);
ds.Update.setAutoSequenceNumber(1);
ds.Remove.setAutoSequenceNumber(1);
ds.PromoteRead.setAutoSequenceNumber(1);
ds.PromoteCreate.setAutoSequenceNumber(1);
ds.PromoteUpdate.setAutoSequenceNumber(1);
ds.PromoteRemove.setAutoSequenceNumber(1);
ds.NonPromoteRead.setAutoSequenceNumber(1);
ds.NonPromoteCreate.setAutoSequenceNumber(1);
ds.NonPromoteUpdate.setAutoSequenceNumber(1);
ds.NonPromoteRemove.setAutoSequenceNumber(1);

// Add an entity to check the update action
var e = ds.Update.createEntity();
e.name = "to check update";
e.save();

// Add an entity to check the remove action
var e = ds.Remove.createEntity();
e.name = "to check remove";
e.save();

// Add an entity to check the promoted update privilege
var e = ds.PromoteUpdate.createEntity();
e.name = "to check promote on update action";
e.save();

var e = ds.NonPromoteUpdate.createEntity();
e.name = "to check non promote on update action";
e.save();

// Add an entity to check the promoted remove privilege
var e = ds.PromoteRemove.createEntity();
e.name = "to check promote on remove action";
e.save();

var e = ds.NonPromoteRemove.createEntity();
e.name = "to check non promote on remove action";
e.save();

// logout the admin user
application.logout();