// Template.usersList.helpers({
//   users: function(){
//     //var users = Meteor.users.find().fetch();
//     return Meteor.users.find().fetch();
//   }
// });

Template.usersList.helpers({
  
  usersTable: function () {
    var users = Meteor.users.find({},{fields: {emails: 1, roles: 1}}).fetch();
    var users2 = _.map(users, function(u){return _.extend(u,{emailList:u.emails[0].address});});
    return users2;
  },
  
  tableSettings: function () {
        
        var fs =[
          { key: 'emailList', label: 'Usuario' },
          { key: 'roles', label: 'Roles' }];

    
        return {
            rowsPerPage: 5,
            showFilter: true,
            //fields: ['title', 'author'],
            useFontAwesome: true,
            fields: fs
        };
    },
  
});