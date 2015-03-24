UI.registerHelper("isAdminRole", function() {
  var userRoles = Meteor.user().roles;
    var intersection = _.intersection(['admin'], userRoles);
   // console.log("check var: " + _.isArray(grants) + "and roles: " + _.isArray(userRoles) + " intersection: " + intersection);
    if(_.isEmpty(intersection)){
       return false;
    }else{
      return true;
    }
});