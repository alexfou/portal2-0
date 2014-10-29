GruposTableros = new Meteor.Collection("gruposTableros");

Schemas.GrupoTablero = new SimpleSchema({
  nombre: {
    type: String,
    label: "Nombre de la norma",
    max: 200,
    optional:false
  },
  descripcion: {
    type: String,
    label: "Descripcion",
    max: 200,
    optional:true
  },
  tableroId: {
    type: String,
    label: "Tablero",
    optional:false
  },
  nombreTablero: {
    type: String,
    label: "Tablero",
    optional:false
  },
});


GruposTableros.attachSchema(Schemas.GrupoTablero);

GruposTableros.allow({
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
