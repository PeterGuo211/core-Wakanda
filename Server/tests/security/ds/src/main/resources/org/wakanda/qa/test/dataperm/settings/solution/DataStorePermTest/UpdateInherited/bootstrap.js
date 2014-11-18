/**

* @author admin

*/

// Remove all entities
ds.UpdateInherited.drop();

// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.UpdateInherited.setAutoSequenceNumber(1);

// Add an entity to check the update action
var e = ds.UpdateInherited.createEntity();
e.name = "to check update";
e.save();