AtributosNormativos = new Meteor.Collection("atributosNormativos");

Schemas.AtributoNormativo = new SimpleSchema({
  nombre: {
    type: String,
    label: "Nombre",
    max: 200,
    optional:false
  },
  fechaInicio: {
    type: Date,
    label: "Fecha de inicio",
    optional:true,
  },
   
});


AtributosNormativos.attachSchema(Schemas.AtributoNormativo);

AtributosNormativos.allow({
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
