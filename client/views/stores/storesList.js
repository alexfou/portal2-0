Template.storesList.rendered = function(){
  s = Session.get('colSelectedStores');
  if( s === undefined || s === false || _.isEmpty(s)){
    Session.set('colSelectedStores',['name', 'type', 'address']);
  }
}
Template.storesList.helpers({
  stores: function () {
    return Stores.find().fetch();  
  },
  
  showWarningDeletedStore: function(){
    ldb = Session.get('lastDeletedStore');
    if(ldb === undefined || ldb === false || ldb === null){
      return false; 
    }else{
      return true;
    }
  },
  
  toConfirmDelete: function(storeId){
    if(Session.get('toConfirmDelete') !== undefined && Session.get('toConfirmDelete') && Session.get('edit_storeId') == storeId){
      return "";   
    }else{
      return "hidden";
    }
  },
  
  toEnableDelete: function(storeId){
    if(Session.get('toConfirmDelete') === undefined || !Session.get('toConfirmDelete')){
      return "";   
    }else{
      return "hidden";
    }
  }
});


Template.storesList.events({
  "click .fa-times-circle" : function(event){    
    bId = $(event.target).attr("name");
    Session.set('edit_storeId', bId);
    Session.set('toConfirmDelete', true);
  },
  
  "click #cancelDelete" : function(event){
    Session.set('edit_storeId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click #confirmDelete" : function(event){  
    Stores.remove({_id:bId});
    Session.set('edit_storeId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click .colSelect" : function(event){  
    
    s = Session.get('colSelectedStores');
    colClicked = $(event.target).attr("name");
    
    console.log("clicked: " + colClicked);
    
    if( s === undefined || s === false || _.isEmpty(s)){
      Session.set('colSelectedStoress',['name']); 
    }else{
      if(_.contains(s,colClicked)){
        if(s.length > 1){
          Session.set('colSelectedStores',_.without(s,colClicked));
        }
      }else{
        Session.set('colSelectedStores',_.union(s,colClicked));
      }
    }
  },
  
  'click .reactive-table tr': function (event) {
    // set the blog post we'll display details and news for
    Session.set("formType","disabled");
    var storeId = this;
    Router.go("/store/"+ storeId._id);
  },
  
  'click #undoDeletedStore': function (event) {
    console.log('inside undo');
    lda = Session.get('lastDeletedStore');
    Stores.insert(_.omit(lda, '_id'));
    Session.set("lastDeletedStore",null);
  },
  
  'click .close': function (event) {
    Session.set('lastDeletedStore', null);
  }
  
});


Template.storesList.helpers({
  
  storesTable: function () {
    return Stores;  
  },
  
  tableSettings: function () {
    
        var sel = Session.get('colSelectedStores');
        
        var fs =[
          { key: 'name', label: 'Nombre completo' },
          { key: 'type', label: 'Tipo de tienda' },
          { key: 'address', label: 'Dirección' }];
      
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
    s = Session.get('colSelectedStores');
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