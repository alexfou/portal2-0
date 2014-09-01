Meteor.publish('books', function() {
return Books.find();
});

Meteor.publish('authors', function() {
return Authors.find();
});

Meteor.publish('stores', function() {
return Stores.find();
});

//this is for the roles package to be available without subscribes to every client
Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
})