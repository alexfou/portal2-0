Template.usersList.helpers({
  users: function(){
    //var users = Meteor.users.find().fetch();
    return Meteor.users.find().fetch();
  }
});