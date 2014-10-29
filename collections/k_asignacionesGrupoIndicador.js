AsignacionesGrupoIndicador = new Meteor.Collection("asignacionesGrupoIndicador");

Schemas.AsignacionGrupoIndicador = new SimpleSchema({
  grupoId: {
    type: String,
    label: "Grupo",
    max: 200,
    optional:false
  },
  fichaIndicadorId: {
    type: String,
    label: "Ficha de indicador",
    optional:false,
  },
   
});


AsignacionesGrupoIndicador.attachSchema(Schemas.AsignacionGrupoIndicador);

AsignacionesGrupoIndicador.allow({
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
