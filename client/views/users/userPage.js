Template.userPage.helpers({
  getRoles:function(u){
    return u.roles;
  },
  
  getEmails:function(u){
//     var emailsArray = u.emails;
//     var emailsArray2 = _.map(emailsArray,function(ea){return _.pluck(ea,'address');});
//     var final = _.map(emailsArray2,function(e){return _.reduce(e, function(memo, t){ return memo + t; }, "");});
//     var users2 = _.map(users, function(u,i){return _.extend(u,{emailsList:final[i]});});
    return _.reduce(u.emails, function(memo,t){return memo + t.address;},"");
    //return u._id;
  }
});

Template.userPage.events({
  "click #saveRoles": function(event){
    
    var newRoles = $('#rolesInput').val();
    newRoles = newRoles.split(',');
    console.log(this._id + " " + newRoles);
    
    Meteor.call('setNewRoles', this._id, newRoles, function(error, id) {
      if (error)
        return alert(error.reason);
      Router.go('/usersList');
    });
  },
  
  'click #resetPassword': function(){
    Meteor.call('resetPasswordDefault', this._id, function(error, id) {
      if (error)
        return alert(error.reason);
      Router.go('/usersList');
    }); 
  }
    
 
});

Template.usersList.rendered = function(){
    Session.set("formType","disabled");
}

Template.usersList.destroyed = function(){
    Session.set("formType","disabled");
}