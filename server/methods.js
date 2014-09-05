Meteor.methods({
  setNewRoles: function(userId, newRoles) {
    Roles.setUserRoles(userId,newRoles);
  },
  
  saveNewUser: function(userEmail, profileName) {
    Accounts.createUser({
        email: userEmail,
        password: "abc123",
        profile: { name: profileName }
      });
  },
  
  resetPasswordDefault: function(userId) {
    Accounts.setPassword(userId, 'abc123');
  }
});