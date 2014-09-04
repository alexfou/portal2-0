Meteor.methods({
  setNewRoles: function(userId, newRoles) {
    Roles.setUserRoles(userId,newRoles);
  }
});