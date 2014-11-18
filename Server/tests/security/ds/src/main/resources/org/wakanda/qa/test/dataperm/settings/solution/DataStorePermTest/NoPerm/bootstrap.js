/**

* @author admin

*/

// Remove all entities
ds.NoPerm.drop();

// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.NoPerm.setAutoSequenceNumber(1);

// Add an entity to check the update action
var e = ds.NoPerm.createEntity();
e.name = "to check update";
e.save();

// Add an entity to check the remove action
var e = ds.NoPerm.createEntity();
e.name = "to check remove";
e.save();