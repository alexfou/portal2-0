Template.fuentesList.rendered = function(){
  s = Session.get('colSelectedFuentes');
  if( s === undefined || s === false || _.isEmpty(s)){
    Session.set('colSelectedFuentes',['nombre', 'tipo']);
  }
}
Template.fuentesList.helpers({
  fuentes: function () {
    return Fuentes.find().fetch();  
  },
  
  showWarningDeletedFuente: function(){
    ldb = Session.get('lastDeletedFuente');
    if(ldb === undefined || ldb === false || ldb === null){
      return false; 
    }else{
      return true;
    }
  },
  
  toConfirmDelete: function(fuenteId){
    if(Session.get('toConfirmDelete') !== undefined && Session.get('toConfirmDelete') && Session.get('edit_fuenteId') == fuenteId){
      return "";   
    }else{
      return "hidden";
    }
  },
  
  toEnableDelete: function(fuenteId){
    if(Session.get('toConfirmDelete') === undefined || !Session.get('toConfirmDelete')){
      return "";   
    }else{
      return "hidden";
    }
  }
});


Template.fuentesList.events({
  "click .fa-times-circle" : function(event){    
    bId = $(event.target).attr("name");
    Session.set('edit_fuenteId', bId);
    Session.set('toConfirmDelete', true);
  },
  
  "click #cancelDelete" : function(event){
    Session.set('edit_fuenteId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click #confirmDelete" : function(event){  
    Fuentes.remove({_id:bId});
    Session.set('edit_fuenteId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click .colSelect" : function(event){  
    
    s = Session.get('colSelectedFuentes');
    colClicked = $(event.target).attr("name");
    
    console.log("clicked: " + colClicked);
    
    if( s === undefined || s === false || _.isEmpty(s)){
      Session.set('colSelectedFuentes',['title']); 
    }else{
      if(_.contains(s,colClicked)){
        if(s.length > 1){
          Session.set('colSelectedFuentes',_.without(s,colClicked));
        }
      }else{
        Session.set('colSelectedFuentes',_.union(s,colClicked));
      }
    }
  },
  
  'click .rowTable': function (event) {
    // set the blog post we'll display details and news for
    Session.set("formType","disabled");
    var fuenteId = this;
    Router.go("/fuente/"+ fuenteId._id);
  },
  
  'click #undoDeletedFuente': function (event) {
    console.log('inside undo');
    lda = Session.get('lastDeletedFuente');
    Fuentes.insert(_.omit(lda, '_id'));
    Session.set("lastDeletedFuente",null);
  },
  
  'click .close': function (event) {
    Session.set('lastDeletedFuente', null);
  }
  
});


Template.fuentesList.helpers({
  
  fuentesTable: function () {
    return Fuentes;  
  },
  
  tableSettings: function () {
    
        var sel = Session.get('colSelectedFuentes');
    
     var fs =[
          { key: 'nombre', label: 'Nombre' },
          { key: 'tipo', label: 'Tipo' }];
        
        
      
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
            //fields: ['title', 'fuente'],
            useFontAwesome: true,
          fields: finalArray,
          rowClass: function(item) {
            return "rowTable";
          }
        };
    },
  
//   colSelected: function(){
//     return [{ key: 'name', label: 'Título' }, { key: 'fuente', label: 'Autor' }];
//   },
  
  buttonClass: function(field){
    s = Session.get('colSelectedFuentes');
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