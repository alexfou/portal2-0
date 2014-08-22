Template.portalFace.helpers({
    userEmail:function(){
    var user = Meteor.user();
    if (user && user.emails)
      return user.emails[0].address;  
  }
});