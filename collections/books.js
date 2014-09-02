


Books = new Meteor.Collection("books");
Schemas.Book = new SimpleSchema({
  title: {
    type: String,
    label: "Título",
    max: 200
  },
  authorId: {
    type: String,
    label: "Autor"
  },
  
  author:{
    type: Schemas.Author,
    label: "Autor",
    optional:true
  },
  
  copies: {
    type: Number,
    label: "Número de copias",
    min: 0
  },
  lastCheckedOut: {
    type: Date,
    label: "Última fecha de checkout",
    optional: true
  },
  summary: {
    type: String,
    label: "Resumen",
    optional: true,
    max: 1000
  },
  mediaType: {
    type: String,
    label: "Tipo de medio",
    allowedValues:["Papel", "Electrónico"]    
  },
  
  classification: {
    type: [String],
    label: "Clasificación",
    allowedValues:["Ficción", "No ficción", "Drama", "Thriller"]    
  }
});
                                
Books.attachSchema(Schemas.Book);



//this allow ande deny are on the client side
//so...NOTE: Meteor.call(...) on client side igonres this rules, call is trusted on server
Books.allow({
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

