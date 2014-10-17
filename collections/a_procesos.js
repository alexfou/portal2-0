Procesos = new Meteor.Collection("procesos");

Schemas.Proceso = new SimpleSchema({
  nombre: {
    type: String,
    label: "Nombre del proceso",
    max: 200,
    optional:false
  },
  macroProceso_1: {
    type: String,
    label: "Macro Proceso Nivel 1 (Alto)",
    max: 200 ,
    optional:false
  },
   macroProceso_2: {
    type: String,
    label: "Macro Proceso Nivel 2",
    max: 200,
    optional:false
  },
});


Procesos.attachSchema(Schemas.Proceso);

Procesos.allow({
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
