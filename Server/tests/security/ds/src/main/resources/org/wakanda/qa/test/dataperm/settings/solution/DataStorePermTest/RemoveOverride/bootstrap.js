/**

* @author admin

*/
// Grant admin privileges
//var token = currentSession().promoteWith("Admin");

application.loginByPassword("admin","admin");

// Remove all entities
ds.RemoveOverride.drop();

// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.RemoveOverride.setAutoSequenceNumber(1);

// Add an entity to check the remove action
var e = ds.RemoveOverride.createEntity();
e.name = "to check remove";
e.save();

// Revoke admin priviliges
//currentSession().unPromote(token);

application.logout();