Processes = new Meteor.Collection("processes");
Schemas.Processes = new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200,
    optional:false
  },
  
  level_1: {
    type: String,
    label: "Proceso N1",
    optional:false
  },
  
  level_2:{
    type: String,
    label: "Proceso N2",
    optional:false
  },
  
  
});
                                
Processes.attachSchema(Schemas.Processes);



//this allow ande deny are on the client side
//so...NOTE: Meteor.call(...) on client side igonres this rules, call is trusted on server
Processes.allow({
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

////////////////////////////////////////////////////////////


Kpis = new Meteor.Collection("kpis");
Schemas.Kpis = new SimpleSchema({
  name: {
    type: String,
    label: "Nombre",
    max: 200,
    optional:false
  },
  
  processKpiId: {
    type: String,
    label: "ProcesoId",
    optional:false
  },
  
  processKpi:{
    type: Schemas.Processes,
    label: "Proceso",
    optional:false
  },
  
  
});
                                
Kpis.attachSchema(Schemas.Kpis);



//this allow ande deny are on the client side
//so...NOTE: Meteor.call(...) on client side igonres this rules, call is trusted on server
Kpis.allow({
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

