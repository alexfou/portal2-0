AutoForm.hooks({
  insertBookForm: {
    onSuccess: function(operation, result, template) {
      Router.go('/booksList');
    }
  },
  
  updateBookForm: {
    onSuccess: function(operation, result, template) {
      Router.go('/booksList');
    }
  }
});