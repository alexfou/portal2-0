Template.userInsert.events({
  'click #saveUser': function(){
    var profileName = $('#profileName').val();
    var userEmail = $('#userEmail').val();

    Meteor.call('saveNewUser', userEmail, profileName, function(error, id) {
      if (error)
        return alert(error.reason);
      Router.go('/usersList');
    });
  },
  
  'click #cancelButton': function(){
    Router.go('usersList');
  }
});

