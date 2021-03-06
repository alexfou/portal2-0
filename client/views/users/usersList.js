Template.usersList.helpers({
  
  usersTable: function () {
    var users = Meteor.users.find({},{fields: {emails: 1, profile: 1, roles: 1}}).fetch();
    var emailsArray = _.pluck(users,'emails');
    var emailsArray2 = _.map(emailsArray,function(ea){return _.pluck(ea,'address');});
    var final = _.map(emailsArray2,function(e){return _.reduce(e, function(memo, t){ return memo + t; }, "");});
    var users2 = _.map(users, function(u,i){return _.extend(u,{emailsList:final[i]});});
    return users2;
  },
  
  showWarningDeletedUser: function(){
    ldb = Session.get('lastDeletedUser');
    if(ldb === undefined || ldb === false || ldb === null){
      return false; 
    }else{
      return true;
    }
  },
  
  tableSettings: function () {
        
        var fs =[
          { key: 'emailsList', label: 'Email(s) Usuario' },
          { key: 'profile.name', label: 'Nombre perfil' },
          { key: 'roles', label: 'Roles' }];

    
        return {
            rowsPerPage: 5,
            showFilter: true,
            //fields: ['title', 'author'],
            useFontAwesome: true,
            fields: fs,
          rowClass: function(item) {
            return "rowTable";
          }
        };
    },
  
});

Template.usersList.events({
  'click .rowTable': function (event) {
    // set the blog post we'll display details and news for
    Session.set("formType","disabled");
    var user = this;
    Router.go("/user/"+ user._id);
  },
  
});