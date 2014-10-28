Tableros = new Meteor.Collection("tableros");

Schemas.Tablero = new SimpleSchema({
  nombre: {
    type: String,
    label: "Nombre",
    max: 200
  },
  descripcion: {
    type: String,
    label: "Descripción",
    max:300  
  },
});

Tableros.attachSchema(Schemas.Tablero);

Tableros.allow({
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
