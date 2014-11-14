Mediciones = new Meteor.Collection("mediciones");

Schemas.Medicion = new SimpleSchema({
  
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
  
  fichaIndicadorId:{
    type:String,
    optional:false
  },
  
  periodoMedicionId:{
    type:String,
    optional:false
  },
  
  userId:{
    type:String,
    optional:false
  },
  
  segmentoMedicion:{
    type:String,
    optional:false
  },
  
  valorActual:{
    type:Number,
    optional:false
  },
  
  metaActual:{
    type:Number,
    optional:false
  },
  
   valorAnterior:{
    type:Number,
    optional:false
  },
  
   metaAnterior:{
    type:Number,
    optional:false
  },
  
   comentario:{
    type:String,
    optional:true
  },
 
  
});
                                
Mediciones.attachSchema(Schemas.Medicion);

//this allow ande deny are on the client side
//so...NOTE: Meteor.call(...) on client side igonres this rules, call is trusted on server
Mediciones.allow({
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
