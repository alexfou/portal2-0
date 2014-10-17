Template.fichaIndicadoresList.rendered = function(){
  s = Session.get('colSelectedFichaIndicadores');
  if( s === undefined || s === false || _.isEmpty(s)){
    Session.set('colSelectedFichaIndicadores',['nombre', 'proceso.nombre']);
  }
}
Template.fichaIndicadoresList.helpers({
  fichaIndicadores: function () {
    return FichaIndicadores.find().fetch();  
  },
  
  showWarningDeletedFichaIndicador: function(){
    ldb = Session.get('lastDeletedFichaIndicador');
    if(ldb === undefined || ldb === false || ldb === null){
      return false; 
    }else{
      return true;
    }
  },
  
  toConfirmDelete: function(fichaIndicadorId){
    if(Session.get('toConfirmDelete') !== undefined && Session.get('toConfirmDelete') && Session.get('edit_fichaIndicadorId') == fichaIndicadorId){
      return "";   
    }else{
      return "hidden";
    }
  },
  
  toEnableDelete: function(fichaIndicadorId){
    if(Session.get('toConfirmDelete') === undefined || !Session.get('toConfirmDelete')){
      return "";   
    }else{
      return "hidden";
    }
  }
});


Template.fichaIndicadoresList.events({
  "click .fa-times-circle" : function(event){    
    bId = $(event.target).attr("name");
    Session.set('edit_fichaIndicadorId', bId);
    Session.set('toConfirmDelete', true);
  },
  
  "click #cancelDelete" : function(event){
    Session.set('edit_fichaIndicadorId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click #confirmDelete" : function(event){  
    FichaIndicadores.remove({_id:bId});
    Session.set('edit_fichaIndicadorId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click .colSelect" : function(event){  
    
    s = Session.get('colSelectedFichaIndicadores');
    colClicked = $(event.target).attr("name");
    
    console.log("clicked: " + colClicked);
    
    if( s === undefined || s === false || _.isEmpty(s)){
      Session.set('colSelectedFichaIndicadores',['title']); 
    }else{
      if(_.contains(s,colClicked)){
        if(s.length > 1){
          Session.set('colSelectedFichaIndicadores',_.without(s,colClicked));
        }
      }else{
        Session.set('colSelectedFichaIndicadores',_.union(s,colClicked));
      }
    }
  },
  
  'click .rowTable': function (event) {
    // set the blog post we'll display details and news for
    Session.set("formType","disabled");
    var fichaIndicadorId = this;
    Router.go("/fichaIndicador/"+fichaIndicadorId._id);      
    
  },
  
  'click #undoDeletedFichaIndicador': function (event) {
    console.log('inside undo');
    ldb = Session.get('lastDeletedFichaIndicador');
    FichaIndicadores.insert(_.omit(ldb, '_id'));
    Session.set("lastDeletedFichaIndicador",null);
  },
  
  'click .close': function (event) {
    Session.set('lastDeletedFichaIndicador', null);
  }
  
});


Template.fichaIndicadoresList.helpers({
  
  fichaIndicadoresTable: function () {
    return FichaIndicadores;  
  },
  
  tableSettings: function () {
    
        var sel = Session.get('colSelectedFichaIndicadores');
        
        var fs =[
          { key: 'nombre', label: 'Nombre' },
          { key: 'proceso.nombre', label: 'Proceso' },
          ];
      
        var finalArray = _.filter(fs , function(fsObj){return _.contains(sel,fsObj.key);});
//         finalArray.push({ key: 'title', label: ' ', fn: function (value) {
//           return new Spacebars.SafeString('ver detalles');
//         }});
//         finalArray.push({ key: '_id', label: 'Editar', fn: function (value) {
//                  return new Spacebars.SafeString('<a href="/fichaIndicador/'+value+'"><i class="fa fa-edit"></i></a>');
//                }});
//        finalArray.push({ key: '_id', label: 'Eliminar', fn: function (value) {
//                 var str="";
//                 if(Session.get('toConfirmDelete') !== undefined && 
//                    Session.get('toConfirmDelete') && 
//                    Session.get('edit_fichaIndicadorId') == value){
//                      str = '<a href="#" id="cancelDelete" name ="'+value+'" class="btn btn-primary btn-sm {{toConfirmDelete _id}}">Cancelar</a>' + 
//                        '<a href="#" id="confirmDelete" name="'+value+'" class="btn btn-danger btn-sm {{toConfirmDelete _id}}">Confirmar Eliminación</a>  ';                     
//                 }else{
//                   str= '<a href="#"><i id="deleteFichaIndicador" name="'+value+'" class="fa fa-times-circle {{toEnableDelete _id}}" style="color:#C8423E;"></i></a>';   
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
    s = Session.get('colSelectedFichaIndicadores');
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