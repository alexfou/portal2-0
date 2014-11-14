FichaIndicadores = new Meteor.Collection("fichaIndicadores");

Schemas.FichaIndicador = new SimpleSchema({
  
  fechaHoraEfectiva:{
    type: Date,
    autoValue: function(){
      if (this.isInsert) {
          return new Date();
        }
    },
    label: "Fecha y hora efectiva",
    optional: false
  },
  
  idOriginal:{
    type:String,
    optional:true
  },
  
  nombre: {
    type: String,
    label: "Nombre",
    max: 200,
    optional:false
  },
  
  objetivo: {
    type: String,
    label: "Objetivo",
    optional:false
  },
  
  procesoId: {
    type: String,
    label: "Proceso",
    optional:false
  },
  
  proceso:{
    type: Schemas.Proceso,
    label: "Proceso",
    optional:true
  },
  
  fuenteId: {
    type: String,
    label: "Fuente",
    optional:false
  },
  
  fuente:{
    type: Schemas.Fuente,
    label: "Fuente",
    optional:true
  },
  
  unidadMedicionId: {
    type: String,
    label: "Unidad de Medición",
    optional:false
  },
  
  unidadMedicion:{
    type: Schemas.UnidadMedicion,
    label: "Unidad de Medición",
    optional:true
  },
  
  tendencia:{
    type: String,
    label: "Tendencia",
    allowedValues: ['incremental', 'decremental', 'neutral'],
    optional:true,
  },
  
   alcance:{
    type: [String],
    label: "Alcance",
    allowedValues: ['eficiencia', 'eficacia', 'efectividad'],
    optional:true,
  },
  
   frecuenciaMedicion:{
    type: String,
    label: "Frecuencia de medición",
    allowedValues: ['mensual', 'trimestral', 'semestral', 'anual'],
    optional:true,
  },
  
  segmentosMediciones:{
    type: [String],
    label: "Segmentos de mediciones",
    optional:true,
  },
  
  observaciones:{
    type: String,
    label: "Observaciones",
    max: 800,
    optional:true,
  },
  
  estado:{
    type: String,
    label: "Estado",
    allowedValues: ['borrador', 'activo', 'inactivo'],
    optional:false,
  },
  
  ultimaVersion:{
    type: Boolean,
    label: "Ultima version",
    optional: false
  },
  
  aprobAdminPublicacion:{
    type: Date,
    label: "Aprobación por Administración del borrador",
    optional:true
  },
  
  aprobGestorPublicacion:{
    type: Date,
    label: "Aprobación por Gestor del borrador",
    optional:true
  },
  
  eliminacion:{
    type: Date,
    label: "Eliminación",
    optional: true
  },
  
   fechaInicioMedicion:{
    type: Date,
    label: "Fecha de Inicio de reporte",
    optional: false
  },
  
});
                                
FichaIndicadores.attachSchema(Schemas.FichaIndicador);

//this allow ande deny are on the client side
//so...NOTE: Meteor.call(...) on client side igonres this rules, call is trusted on server
FichaIndicadores.allow({
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
