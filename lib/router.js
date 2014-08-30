Router.configure({
  layoutTemplate: 'navBarTop',
  //loadingTemplate: 'loading'
});

Router.map(function() {
   
  this.route('portalFace', {
    path: '/',
  });
  
  this.route('home', {
    path: '/home',
  });
  
  this.route('bookInsert', {
    path: '/bookInsert',
  });
  
  this.route('booksList', {
    path: '/booksList',
  });
  
  this.route('bookPage', {
    path: '/book/:_id',
//     waitOn: function() { 
//       return [Meteor.subscribe('dataPublishedUser'), Meteor.subscribe('kpisPublishedUser'), Meteor.subscribe('textFiles'),  Meteor.subscribe('historyKpis'), Meteor.subscribe('historyData')];
//     },
    data: function() { return Books.findOne(this.params._id); }
  });
  
  this.route('authorInsert', {
    path: '/authorInsert',
  });
  
  this.route('authorsList', {
    path: '/authorsList',
  });
  
  this.route('authorPage', {
    path: '/author/:_id',
    data: function() { return Authors.findOne(this.params._id); }
  });
  
});