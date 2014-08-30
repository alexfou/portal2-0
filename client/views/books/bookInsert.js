Template.bookInsert.helpers({
  authorOptions: function () {
    return Authors.find().map(function (a) {
      return {label: a.name, value: a._id};
    });
  },
  
  tempInsertBook: function(){
    return Session.get('tempInsertBook')
  }
});

Template.bookInsert.destroyed = function(){
  s= Session.get('tempInsertBook');
  console.log('session in destoryed: ' +s)
  if(s === undefined || s === false || s === null){
    
  }else{
    tempInsertBook = AutoForm.getFormValues('insertBookForm');
    console.log('session in destoryed SETTING')
    Session.set('tempInsertBook',tempInsertBook.insertDoc);    
  }
};

Template.bookInsert.events({
  'click #addAuthorBook': function(){
    tempInsertBook = AutoForm.getFormValues('insertBookForm');
    Session.set('tempInsertBook',tempInsertBook.insertDoc);
    Session.set('originRoute', 'bookInsert');
    Router.go('/authorInsert');
    
  }
});

Template.bookInsert.rendered = function(){
  console.log('inside rendered book Insert')
};