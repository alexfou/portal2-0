
Stores = new Meteor.Collection("stores");
Schemas.Store = new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200
  },
  type: {
    type: String,
    label: "Tipo de tienda",
    allowedValues:["Física", "Virtual"]    
  },
  address: {
    type: String,
    label: "Dirección",
    max: 200
  },
});
  
Stores.attachSchema(Schemas.Store);


Stores.allow({
insert: function(userId, doc) {
// only allow posting if you are logged in
//return !! userId;
  return true;
},
  update: function(userId, doc) {
  return true;
},
  remove: function(userId, doc) {
    return true; 
}
});