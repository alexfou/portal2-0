PeriodosMedicion = new Meteor.Collection("periodosMedicion");

Schemas.PeriodoMedicion = new SimpleSchema({
  nombre: {
    type: String,
    label: "Nombre del periodo",
    max: 200,
    optional:false
  },
  descripcion: {
    type: String,
    label: "Descripción",
    max: 200 ,
    optional:true
  },
  
  frecuenciaMedicion:{
    type: String,
    label: "Frecuencia de medición",
    allowedValues: ['mensual', 'trimestral', 'semestral', 'anual'],
    optional:true,
  },
   fechaReferencia: {
    type: Date,
    label: "Fecha de referencia",
    optional:false
  },
  mesesReporte: {
    type: [Number],
    label: "Meses de reporte",
    optional:false
  },
});


PeriodosMedicion.attachSchema(Schemas.PeriodoMedicion);

PeriodosMedicion.allow({
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
