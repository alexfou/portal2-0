
Template.booksList.helpers({
  books: function () {
    return Books.find().fetch();  
  },
  
  toConfirmDelete: function(bookId){
    if(Session.get('toConfirmDelete') !== undefined && Session.get('toConfirmDelete') && Session.get('edit_bookId') == bookId){
      return "";   
    }else{
      return "hidden";
    }
  },
  
  toEnableDelete: function(bookId){
    if(Session.get('toConfirmDelete') === undefined || !Session.get('toConfirmDelete')){
      return "";   
    }else{
      return "hidden";
    }
  }
});


Template.booksList.events({
  "click .fa-times-circle" : function(event){    
    bId = $(event.target).attr("name");
    Session.set('edit_bookId', bId);
    Session.set('toConfirmDelete', true);
  },
  
  "click #cancelDelete" : function(event){
    Session.set('edit_bookId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click #confirmDelete" : function(event){  
    Books.remove({_id:bId});
    Session.set('edit_bookId', null);
    Session.set('toConfirmDelete', false);
  },
  
});

Template.booksList.helpers({
  booksTable: function () {
    return Books;  
  },
  
  tableSettings: function () {
        return {
            rowsPerPage: 5,
            showFilter: true,
            //fields: ['title', 'author'],
            useFontAwesome: true,
            fields: [
              { key: 'title', label: 'Título' },
              { key: 'author', label: 'Autor' },
              { key: 'mediaType', label: 'Tipo de medio' },
              { key: 'classification', label: 'Clasificación' },
              { key: '_id', label: 'Editar', fn: function (value) {
                return new Spacebars.SafeString('<a href="/book/'+value+'"><i class="fa fa-edit"></i></a>');
              }},
              { key: '_id', label: 'Eliminar', fn: function (value) {
                var str="";
                if(Session.get('toConfirmDelete') !== undefined && 
                   Session.get('toConfirmDelete') && 
                   Session.get('edit_bookId') == value){
                     str = '<a href="#" id="cancelDelete" name ="'+value+'" class="btn btn-primary btn-sm {{toConfirmDelete _id}}">Cancelar</a>' + 
                       '<a href="#" id="confirmDelete" name="'+value+'" class="btn btn-danger btn-sm {{toConfirmDelete _id}}">Confirmar Eliminación</a>  ';                     
                }else{
                  str= '<a href="#"><i id="deleteBook" name="'+value+'" class="fa fa-times-circle {{toEnableDelete _id}}" style="color:#C8423E;"></i></a>';   
                }
                return new Spacebars.SafeString(str);
              }},
            ] 
        };
    }
});