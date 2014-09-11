Router.configure({
  layoutTemplate: 'navBarTop',
  loadingTemplate: 'loading'
});

Router.map(function() {
  
  this.route('signIn', {
    path: '/signIn',
  });
  
//   this.route('signOut', {
//     path: '/signOut',
//     onBeforeAction: function(pause){
      
//      // this.redirect('/portalFace');
//       //pause();
//     }
//   });
  
  this.route('deniedAccess', {
    path: '/deniedAccess',
  });
   
  this.route('portalFace', {
    path: '/',
  });
  
  this.route('home', {
    path: '/home',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'),Meteor.subscribe('books'), Meteor.subscribe('authors'),                     Meteor.subscribe('stores'), Meteor.subscribe('rolePermissions')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-books','crud-authors','crud-stores'])
    }
  });
  
  this.route('bookInsert', {
    path: '/bookInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'),Meteor.subscribe('books'), Meteor.subscribe('authors')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-books'])
    }
  });
  this.route('booksList', {
    path: '/booksList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('books')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-books'])
    }
   
  });
  
  this.route('bookPage', {
    path: '/book/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('books'), Meteor.subscribe('authors')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-books'])
    },
    data: function() { return Books.findOne(this.params._id); }
  });
  
  this.route('authorInsert', {
    path: '/authorInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged')];
    },
     onBeforeAction: function(){
      checkPermissions(['admin', 'crud-authors'])
    }
    //onBeforeAction :adminFilter

  });
  
  this.route('authorsList', {
    path: '/authorsList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('authors')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-authors'])
    }
    
  });
  
  this.route('authorPage', {
    path: '/author/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('authors')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-authors'])
    },
    data: function() { return Authors.findOne(this.params._id); }
  });
  
  this.route('storeInsert', {
    path: '/storeInsert',
     waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-stores'])
    },
  });
  
  this.route('storesList', {
    path: '/storesList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('stores')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-stores'])
    },
    
  });
  
  this.route('storePage', {
    path: '/store/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('stores')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-stores'])
    },
    data: function() { return Stores.findOne(this.params._id); }
  });
  
  this.route('rolePermissionsList', {
    path: '/rolePermissionsList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('rolePermissions')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
  });
  
  this.route('rolePermissionInsert', {
    path: '/rolePermissionInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
  });
  
  this.route('rolePermissionPage', {
    path: '/rolePermission/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('rolePermissions')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
    data: function() { return RolePermissions.findOne(this.params._id); }
  });
  
  this.route('userInsert', {
    path: '/userInsert',
     waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
  });
  
  
  this.route('usersList', {
    path: '/usersList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('usersList')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
  });
  
  this.route('userPage', {
    path: '/user/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('usersList')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
    data: function() { return Meteor.users.findOne(this.params._id); }
  });
  
   this.route('kpisList', {
    path: '/kpis/kpisList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('kpis'), Meteor.subscribe('processes')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
  });
  
});





var adminFilter = function () {
  console.log('on adminFilter');
  if (Meteor.logginIn()) {
   //we are just going to show them the loading template
    this.render('loading');
    this.stop();
  } 
//   else if (!user.admin()) {
//     this.render('notFound');
//     this.stop();
//   }
};

var checkPermissions = function(permittedRoles){
  
  console.log('checking permissions...');
  
  
  if ((!Meteor.user()) && (this !== undefined)) {
        if (Meteor.loggingIn()){
          console.log('user logging in');
          //Router.go('portalFace');
          //pause(); 
           // this.render('loading');
        }
          
  }else if(Meteor.user()){
    console.log('checking user roles');
          var userRoles = Meteor.user().roles;
      //console.log('Intersections: ' + userRoles + ":"+ permittedRoles);
  var intersection = _.intersection(userRoles, permittedRoles)
  if(_.isEmpty(intersection)){
    Router.go('deniedAccess');
    //Router.go('accessDenied');
    this.stop();
        }
           // this.render('accessDenied');
            //this.stop();
        }
  
   
}
  
  

// var mustBeSignedIn = function(pause) {
//   if (!(Meteor.user() || Meteor.loggingIn())) {
//     Router.go('portalFace');
//     pause();
//   }
// };

// var goToHome = function(pause) {
//   if (Meteor.user()) {
//     Router.go('home');
//     pause();
//   }
// };

Router.onBeforeAction('loading');
// Router.onBeforeAction(checkPermissionsAuthorInsert, {only: ['authorInsert']});
//Router.onBeforeAction(mustBeSignedIn, {except: ['portalFace', 'sign-in']});
//Router.onBeforeAction(goToHome, {only: ['portalFace']});