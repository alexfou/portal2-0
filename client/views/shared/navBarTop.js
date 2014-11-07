Template.navBarTop.helpers({
  pathWithUser: function (navElement){ 
   // console.log('-----------------------' + navElement + '-------------------------')
    var temp = [{liElement:"dashboardNav", activeUrls:['/home']},
                
                {liElement:"adminResourcesNav", activeUrls:['/booksList', '/authorsList', '/storesList', '/bookInsert', '/authorInsert', '/storeInsert', '/book' , '/author' , '/store', '/kpis/kpisList', '/kpis/kpiInsert']},
                {liElement:"adminBooksNav", activeUrls:['/booksList','/bookInsert', '/book']},
                {liElement:"adminAuthorsNav", activeUrls:['/authorsList','/authorInsert', '/author']},
                {liElement:"adminStoresNav", activeUrls:['/storesList','/storeInsert', '/store']},
                
                {liElement:"usersNav", activeUrls:['/usersList', '/rolePermissionsList', '/userInsert', '/rolePermissionInsert', '/user', '/rolePermission']},
                {liElement:"adminUsersNav", activeUrls:['/usersList','/userInsert', '/user']},
                {liElement:"adminRolePermissionsNav", activeUrls:['/rolePermissionsList','/rolePermissionInsert', '/rolePermission']},
                {liElement:"adminKpisNav", activeUrls:['/kpis/kpisList', '/kpis/kpiInsert']},
               ];
    
    urls = _.findWhere(temp, {liElement: navElement});
              //  console.log("Count of urls: " + urls.activeUrls)
                au = urls.activeUrls
    var elementId = this._id
    if(this._id !== undefined){
      var activeUrls = _.map(au,function(p){return p + "/" + elementId;});     
    }else{var activeUrls = au;}
  //  console.log(activeUrls + "-"+ Router.current().path);
    var intersection = _.intersection(activeUrls, [Router.current().path]);
   // console.log('Intersection: ' + intersection + "id: " +this._id);
    
    if(Meteor.user()){
      if (_.isEmpty(intersection)){
        return "nonActive";
     // return "visible active";
      }else{
        return "active"
      }
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
  },
  
  permittedNav:function(guiElement){
    var temp = [
      {name:"dashboardNav", permittedRoles:['admin','crud-stores','crud-books','crud-authors']},
      {name:"adminResourcesNav", permittedRoles:['admin','crud-stores','crud-books','crud-authors']},
      {name:"adminBooksNav", permittedRoles:['admin','crud-books']},
      {name:"adminAuthorsNav", permittedRoles:['admin','crud-authors']},
      {name:"adminStoresNav", permittedRoles:['admin','crud-stores']},
      {name:"adminKpisNav", permittedRoles:['admin']},
    ];
      
      var rolesAllowed = _.findWhere(temp, {name:guiElement});
      if(Meteor.user()!==undefined && Meteor.user !== null){
        var userRoles = Meteor.user().roles;
        var intersection = _.intersection(rolesAllowed.permittedRoles, userRoles);
        if(_.isEmpty(intersection)){
           return false;
        }else{
          return true;
        }   
      }else{
      return false;
      }
    return false;
  }
                           
});

Template.navBarTop.events({
  'click #signOut': function(){
    Meteor.logout(function(e){
        if(e){}else{Router.go('portalFace');}
      });
  }
});

  
