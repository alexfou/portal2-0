Router.configure({
  layoutTemplate: 'navBarTop',
  loadingTemplate: 'loading'
});

Router.map(function() {
  
  this.route('deniedAccess', {
    path: '/deniedAccess',
  });
   
  this.route('portalFace', {
    path: '/',
  });
  
  this.route('home', {
    path: '/home',
    waitOn: function() { 
      return [Meteor.subscribe('books'), Meteor.subscribe('authors'), Meteor.subscribe('stores')];
    }
  });
  
  this.route('bookInsert', {
    path: '/bookInsert',
    waitOn: function() { 
      return [Meteor.subscribe('books'), Meteor.subscribe('authors')];
    },
  });
  this.route('booksList', {
    path: '/booksList',
    waitOn: function() { 
      return [Meteor.subscribe('books')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    }
   
  });
  
  this.route('bookPage', {
    path: '/book/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('books'), Meteor.subscribe('authors')];
    },
    
    data: function() { return Books.findOne(this.params._id); }
  });
  
  this.route('authorInsert', {
    path: '/authorInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged')];
    },
     onBeforeAction: function(){
      checkPermissions(['admin'])
    }
    //onBeforeAction :adminFilter

  });
  
  this.route('authorsList', {
    path: '/authorsList',
    waitOn: function() { 
      return [Meteor.subscribe('authors')];
    },
    
  });
  
  this.route('authorPage', {
    path: '/author/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('authors')];
    },
    data: function() { return Authors.findOne(this.params._id); }
  });
  
  this.route('storeInsert', {
    path: '/storeInsert',
  });
  
  this.route('storesList', {
    path: '/storesList',
    waitOn: function() { 
      return [Meteor.subscribe('stores')];
    }
  });
  
  this.route('storePage', {
    path: '/store/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('stores')];
    },
    data: function() { return Stores.findOne(this.params._id); }
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