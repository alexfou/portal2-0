Template.booksList.rendered = function(){
  s = Session.get('colSelectedBooks');
  if( s === undefined || s === false || _.isEmpty(s)){
    Session.set('colSelectedBooks',['title', 'author.name', 'mediaType']);
  }
}
Template.booksList.helpers({
  books: function () {
    return Books.find().fetch();  
  },
  
  showWarningDeletedBook: function(){
    ldb = Session.get('lastDeletedBook');
    if(ldb === undefined || ldb === false || ldb === null){
      return false; 
    }else{
      return true;
    }
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
  
  "click .colSelect" : function(event){  
    
    s = Session.get('colSelectedBooks');
    colClicked = $(event.target).attr("name");
    
    console.log("clicked: " + colClicked);
    
    if( s === undefined || s === false || _.isEmpty(s)){
      Session.set('colSelectedBooks',['title']); 
    }else{
      if(_.contains(s,colClicked)){
        if(s.length > 1){
          Session.set('colSelectedBooks',_.without(s,colClicked));
        }
      }else{
        Session.set('colSelectedBooks',_.union(s,colClicked));
      }
    }
  },
  
  'click .rowTable': function (event) {
    // set the blog post we'll display details and news for
    Session.set("formType","disabled");
    var bookId = this;
    Router.go("/book/"+bookId._id);      
    
  },
  
  'click #undoDeletedBook': function (event) {
    console.log('inside undo');
    ldb = Session.get('lastDeletedBook');
    Books.insert(_.omit(ldb, '_id'));
    Session.set("lastDeletedBook",null);
  },
  
  'click .close': function (event) {
    Session.set('lastDeletedBook', null);
  }
  
});


Template.booksList.helpers({
  
  booksTable: function () {
    return Books;  
  },
  
  tableSettings: function () {
    
        var sel = Session.get('colSelectedBooks');
        
        var fs =[
          { key: 'title', label: 'Título' },
          { key: 'author.name', label: 'Autor' },
          { key: 'mediaType', label: 'Tipo de medio' }];
      
        var finalArray = _.filter(fs , function(fsObj){return _.contains(sel,fsObj.key);});
//         finalArray.push({ key: 'title', label: ' ', fn: function (value) {
//           return new Spacebars.SafeString('ver detalles');
//         }});
//         finalArray.push({ key: '_id', label: 'Editar', fn: function (value) {
//                  return new Spacebars.SafeString('<a href="/book/'+value+'"><i class="fa fa-edit"></i></a>');
//                }});
//        finalArray.push({ key: '_id', label: 'Eliminar', fn: function (value) {
//                 var str="";
//                 if(Session.get('toConfirmDelete') !== undefined && 
//                    Session.get('toConfirmDelete') && 
//                    Session.get('edit_bookId') == value){
//                      str = '<a href="#" id="cancelDelete" name ="'+value+'" class="btn btn-primary btn-sm {{toConfirmDelete _id}}">Cancelar</a>' + 
//                        '<a href="#" id="confirmDelete" name="'+value+'" class="btn btn-danger btn-sm {{toConfirmDelete _id}}">Confirmar Eliminación</a>  ';                     
//                 }else{
//                   str= '<a href="#"><i id="deleteBook" name="'+value+'" class="fa fa-times-circle {{toEnableDelete _id}}" style="color:#C8423E;"></i></a>';   
//                 }
//                 return new Spacebars.SafeString(str);
//               }});
    
        return {
            rowsPerPage: 5,
            showFilter: true,
            //fields: ['title', 'author'],
            useFontAwesome: true,
          fields: finalArray,
          rowClass: function(item) {
            return "rowTable";
          }
        };
    },
  
  colSelected: function(){
    return [{ key: 'title', label: 'Título' }, { key: 'author', label: 'Autor' }];
  },
  
  buttonClass: function(field){
    s = Session.get('colSelectedBooks');
    if( s === undefined || s === false){
      return 'btn btn-primary btn-xs';
    }else{
      if(_.contains(s, field)){
        return 'btn btn-primary btn-xs';  
      }else{
        return 'btn btn-default btn-xs';   
      }
        
    }
    
  }
});