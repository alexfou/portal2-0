UnidadesMedicion = new Meteor.Collection("unidadesMedicion");

Schemas.UnidadMedicion = new SimpleSchema({
  nombre: {
    type: String,
    label: "Nombre de la unidad de medición",
    max: 200,
    optional:false
  },
  descripcion: {
    type: String,
    label: "Descripción",
    max: 200 ,
    optional:true,
  },
   
});


UnidadesMedicion.attachSchema(Schemas.UnidadMedicion);

UnidadesMedicion.allow({
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
