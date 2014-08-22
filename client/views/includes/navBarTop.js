Template.navBarTop.helpers({
  pathWithUser: function (navPath) {
  if(Meteor.user()){
    if (Router.current().path === navPath){
      return "visible active";
    }else{
      return "visible"
    }
  }else{
     return "hidden";  
  } 
  },
  
  notCurrentUser: function(){
    if(Meteor.user()){
      return false;
    }else{
      return true;
    }
  },
  
  userEmail:function(){
    var user = Meteor.user();
    if (user && user.emails)
      return user.emails[0].address;  
  }
                           
});

  
