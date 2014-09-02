Authors = new Meteor.Collection("authors");

Schemas.Author = new SimpleSchema({
  name: {
    type: String,
    label: "Nombre completo",
    max: 200
  },
  birthCountry: {
    type: String,
    label: "Pais de nacimiento",
    allowedValues:["México", "Colombia", "Argentina"]  
  },
});
Authors.attachSchema(Schemas.Author);

Authors.allow({
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
