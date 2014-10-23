EntidadesReguladoras = new Meteor.Collection("entidadesReguladoras");

Schemas.EntidadReguladora = new SimpleSchema({
  nombre: {
    type: String,
    label: "Nombre de la entidad reguladora",
    max: 200,
    optional:false
  },
  direccion: {
    type: String,
    label: "Dirección",
    max: 200 ,
    optional:true
  },
  telefono: {
    type: String,
    label: "Teléfono",
    max: 20 ,
    optional:true
  },
   
});


EntidadesReguladoras.attachSchema(Schemas.EntidadReguladora);

EntidadesReguladoras.allow({
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
