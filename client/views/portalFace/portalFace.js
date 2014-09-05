Template.portalFace.helpers({
    userEmail:function(){
    var user = Meteor.user();
    if (user && user.emails)
      return user.emails[0].address;  
  }
});

Template.portalFace.events({
  'click #signOut': function(){
    Meteor.logout(function(e){
        if(e){}else{Router.go('portalFace');}
      });
  }
});
