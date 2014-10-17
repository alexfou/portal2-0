Template.procesosList.rendered = function(){
  s = Session.get('colSelectedProcesos');
  if( s === undefined || s === false || _.isEmpty(s)){
    Session.set('colSelectedProcesos',['nombre', 'macroProceso_1', 'macroProceso_2']);
  }
}
Template.procesosList.helpers({
  procesos: function () {
    return Procesos.find().fetch();  
  },
  
  showWarningDeletedProceso: function(){
    ldb = Session.get('lastDeletedProceso');
    if(ldb === undefined || ldb === false || ldb === null){
      return false; 
    }else{
      return true;
    }
  },
  
  toConfirmDelete: function(procesoId){
    if(Session.get('toConfirmDelete') !== undefined && Session.get('toConfirmDelete') && Session.get('edit_procesoId') == procesoId){
      return "";   
    }else{
      return "hidden";
    }
  },
  
  toEnableDelete: function(procesoId){
    if(Session.get('toConfirmDelete') === undefined || !Session.get('toConfirmDelete')){
      return "";   
    }else{
      return "hidden";
    }
  }
});


Template.procesosList.events({
  "click .fa-times-circle" : function(event){    
    bId = $(event.target).attr("name");
    Session.set('edit_procesoId', bId);
    Session.set('toConfirmDelete', true);
  },
  
  "click #cancelDelete" : function(event){
    Session.set('edit_procesoId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click #confirmDelete" : function(event){  
    Procesos.remove({_id:bId});
    Session.set('edit_procesoId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click .colSelect" : function(event){  
    
    s = Session.get('colSelectedProcesos');
    colClicked = $(event.target).attr("name");
    
    console.log("clicked: " + colClicked);
    
    if( s === undefined || s === false || _.isEmpty(s)){
      Session.set('colSelectedProcesos',['title']); 
    }else{
      if(_.contains(s,colClicked)){
        if(s.length > 1){
          Session.set('colSelectedProcesos',_.without(s,colClicked));
        }
      }else{
        Session.set('colSelectedProcesos',_.union(s,colClicked));
      }
    }
  },
  
  'click .rowTable': function (event) {
    // set the blog post we'll display details and news for
    Session.set("formType","disabled");
    var procesoId = this;
    Router.go("/proceso/"+ procesoId._id);
  },
  
  'click #undoDeletedProceso': function (event) {
    console.log('inside undo');
    lda = Session.get('lastDeletedProceso');
    Procesos.insert(_.omit(lda, '_id'));
    Session.set("lastDeletedProceso",null);
  },
  
  'click .close': function (event) {
    Session.set('lastDeletedProceso', null);
  }
  
});


Template.procesosList.helpers({
  
  procesosTable: function () {
    return Procesos;  
  },
  
  tableSettings: function () {
    
        var sel = Session.get('colSelectedProcesos');
        
       var fs =[
          { key: 'nombre', label: 'Nombre del proceso' },
          { key: 'macroProceso_1', label: 'Macro Proceso 1 (Alto)' },
          { key: 'macroProceso_2', label: 'Macro Proceso 2' }];
      
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
            //fields: ['title', 'proceso'],
            useFontAwesome: true,
          fields: finalArray,
          rowClass: function(item) {
            return "rowTable";
          }
        };
    },
  
//   colSelected: function(){
//     return [{ key: 'name', label: 'Título' }, { key: 'proceso', label: 'Autor' }];
//   },
  
  buttonClass: function(field){
    s = Session.get('colSelectedProcesos');
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