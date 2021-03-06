Normas = new Meteor.Collection("normas");

Schemas.Norma = new SimpleSchema({
  nombre: {
    type: String,
    label: "Nombre de la norma",
    max: 200,
    optional:false
  },
  descripcion: {
    type: String,
    label: "Descripcion",
    max: 200,
    optional:true
  },
  fechaInicio: {
    type: Date,
    label: "Fecha de inicio",
    optional:true
  },
 fechaFin: {
    type: Date,
    label: "Fecha de fin",
    optional:true
  },
  entidadReguladoraId: {
    type: String,
    label: "Entidad Reguladora",
    optional:true
  },
});


Normas.attachSchema(Schemas.Norma);

Normas.allow({
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
