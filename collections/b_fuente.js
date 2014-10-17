Fuentes = new Meteor.Collection("fuentes");

Schemas.Fuente = new SimpleSchema({
  nombre: {
    type: String,
    label: "Nombre de la fuente",
    max: 200,
    optional:false
  },
  tipo: {
    type: String,
    label: "Tipo",
    max: 200 ,
    optional:false,
    allowedValues:["Sistema transaccional institucional", "Hoja de cálculo local", "Manual"],
  },
   fechaInicio: {
    type: Date,
    label: "Fecha de inicio",
    optional:true
  },
  areaMantenimientoDatos: {
    type: String,
    label: "Área de Mantenimiento",
    max: 200 ,
    optional:false
  },
});


Fuentes.attachSchema(Schemas.Fuente);

Fuentes.allow({
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
