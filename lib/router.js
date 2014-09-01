Router.configure({
  layoutTemplate: 'navBarTop',
  loadingTemplate: 'loading'
});

Router.map(function() {
   
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
    }
  });
  
  this.route('booksList', {
    path: '/booksList',
    waitOn: function() { 
      return [Meteor.subscribe('books')];
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
  });
  
  this.route('authorsList', {
    path: '/authorsList',
    waitOn: function() { 
      return [Meteor.subscribe('authors')];
    }
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

Router.onBeforeAction('loading');