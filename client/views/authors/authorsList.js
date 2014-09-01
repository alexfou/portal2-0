Template.authorsList.rendered = function(){
  s = Session.get('colSelectedAuthors');
  if( s === undefined || s === false || _.isEmpty(s)){
    Session.set('colSelectedAuthors',['name', 'birthCountry']);
  }
}
Template.authorsList.helpers({
  authors: function () {
    return Authors.find().fetch();  
  },
  
  showWarningDeletedAuthor: function(){
    ldb = Session.get('lastDeletedAuthor');
    if(ldb === undefined || ldb === false || ldb === null){
      return false; 
    }else{
      return true;
    }
  },
  
  toConfirmDelete: function(authorId){
    if(Session.get('toConfirmDelete') !== undefined && Session.get('toConfirmDelete') && Session.get('edit_authorId') == authorId){
      return "";   
    }else{
      return "hidden";
    }
  },
  
  toEnableDelete: function(authorId){
    if(Session.get('toConfirmDelete') === undefined || !Session.get('toConfirmDelete')){
      return "";   
    }else{
      return "hidden";
    }
  }
});


Template.authorsList.events({
  "click .fa-times-circle" : function(event){    
    bId = $(event.target).attr("name");
    Session.set('edit_authorId', bId);
    Session.set('toConfirmDelete', true);
  },
  
  "click #cancelDelete" : function(event){
    Session.set('edit_authorId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click #confirmDelete" : function(event){  
    Authors.remove({_id:bId});
    Session.set('edit_authorId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click .colSelect" : function(event){  
    
    s = Session.get('colSelectedAuthors');
    colClicked = $(event.target).attr("name");
    
    console.log("clicked: " + colClicked);
    
    if( s === undefined || s === false || _.isEmpty(s)){
      Session.set('colSelectedAuthors',['title']); 
    }else{
      if(_.contains(s,colClicked)){
        if(s.length > 1){
          Session.set('colSelectedAuthors',_.without(s,colClicked));
        }
      }else{
        Session.set('colSelectedAuthors',_.union(s,colClicked));
      }
    }
  },
  
  'click .reactive-table tr': function (event) {
    // set the blog post we'll display details and news for
    Session.set("formType","disabled");
    var authorId = this;
    Router.go("/author/"+ authorId._id);
  },
  
  'click #undoDeletedAuthor': function (event) {
    console.log('inside undo');
    lda = Session.get('lastDeletedAuthor');
    Authors.insert(_.omit(lda, '_id'));
    Session.set("lastDeletedAuthor",null);
  },
  
  'click .close': function (event) {
    Session.set('lastDeletedAuthor', null);
  }
  
});


Template.authorsList.helpers({
  
  authorsTable: function () {
    return Authors;  
  },
  
  tableSettings: function () {
    
        var sel = Session.get('colSelectedAuthors');
        
        var fs =[
          { key: 'name', label: 'Nombre completo' },
          { key: 'birthCountry', label: 'País de nacimiento' }];
      
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
          fields: finalArray
        };
    },
  
//   colSelected: function(){
//     return [{ key: 'name', label: 'Título' }, { key: 'author', label: 'Autor' }];
//   },
  
  buttonClass: function(field){
    s = Session.get('colSelectedAuthors');
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