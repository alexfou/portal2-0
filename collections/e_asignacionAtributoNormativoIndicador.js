AsignacionesAtributoNormativoIndicador = new Meteor.Collection("asignacionesAtributoNormativoIndicador");

Schemas.AsignacionAtributoNormativoIndicador = new SimpleSchema({
  fichaIndicadorId: {
    type: String,
    label: "Ficha Indicador Id",
    max: 200,
    optional:false
  },
  atributoNormativoId: {
    type: String,
    label: "Atributo Normativo Id",
    optional:false,
  },
   
});


AsignacionesAtributoNormativoIndicador.attachSchema(Schemas.AsignacionAtributoNormativoIndicador);

AsignacionesAtributoNormativoIndicador.allow({
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
