FichaIndicadores = new Meteor.Collection("fichaIndicadores");

Schemas.FichaIndicador = new SimpleSchema({
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
    label: "Proceso Id",
    optional:false
  },
  
  proceso:{
    type: Schemas.Proceso,
    label: "Proceso",
    optional:true
  },
  
  fuenteId: {
    type: String,
    label: "Fuente Id",
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
