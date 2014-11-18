/**

* @author admin

*/

// Remove all entities
ds.PromoteInheritedModelUpdate.drop();

// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.PromoteInheritedModelUpdate.setAutoSequenceNumber(1);

// Add an entity to check the update action
var e = ds.PromoteInheritedModelUpdate.createEntity();
e.name = "to check update";
e.save();