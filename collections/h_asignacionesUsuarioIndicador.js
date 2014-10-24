AsignacionesUsuarioIndicador = new Meteor.Collection("asignacionesUsuarioIndicador");

Schemas.AsignacionUsuarioIndicador = new SimpleSchema({
  fichaIndicadorId: {
    type: String,
    label: "Ficha Indicador",
    max: 200,
    optional:false
  },
  userId: {
    type: String,
    label: "Usuario",
    optional:false,
  },
   rol: {
    type: [String],
    label: "Roles",
    allowedValues: ['administrador', 'responsable', 'reporteador', 'auditor'],
    optional:false,
  },
   
});


AsignacionesUsuarioIndicador.attachSchema(Schemas.AsignacionUsuarioIndicador);

AsignacionesUsuarioIndicador.allow({
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
