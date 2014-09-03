Meteor.startup(function () {

  ////////////////////////////////////////////////////////////////////
  // Create Test Secrets
  //
    
//   if (Meteor.secrets.find().fetch().length === 0) {
//     Meteor.secrets.insert({secret:"ec2 password: apple2"});
//     Meteor.secrets.insert({secret:"domain registration pw: apple3"});
//   }


  ////////////////////////////////////////////////////////////////////
  // Create Test Users
  //

  if (Meteor.users.find().fetch().length === 0) {

    Meteor.myFixtures.createUsers();
    Meteor.myFixtures.createAuthors();
    Meteor.myFixtures.createBooks();
    Meteor.myFixtures.createStores();
    Meteor.myFixtures.createRolePermissions();
  }



  ////////////////////////////////////////////////////////////////////
  // Prevent non-authorized users from creating new users
  //

  Accounts.validateNewUser(function (user) {
    var loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
      return true;
    }

    throw new Meteor.Error(403, "Not authorized to create new users");
  });

});
