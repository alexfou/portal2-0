Template.normasList.rendered = function(){
  s = Session.get('colSelectedNormas');
  if( s === undefined || s === false || _.isEmpty(s)){
    Session.set('colSelectedNormas',['nombre']);
  }
}
Template.normasList.helpers({
  normas: function () {
    return Normas.find().fetch();  
  },
  
  showWarningDeletedNorma: function(){
    ldb = Session.get('lastDeletedNorma');
    if(ldb === undefined || ldb === false || ldb === null){
      return false; 
    }else{
      return true;
    }
  },
  
  toConfirmDelete: function(normaId){
    if(Session.get('toConfirmDelete') !== undefined && Session.get('toConfirmDelete') && Session.get('edit_normaId') == normaId){
      return "";   
    }else{
      return "hidden";
    }
  },
  
  toEnableDelete: function(normaId){
    if(Session.get('toConfirmDelete') === undefined || !Session.get('toConfirmDelete')){
      return "";   
    }else{
      return "hidden";
    }
  }
});


Template.normasList.events({
  "click .fa-times-circle" : function(event){    
    bId = $(event.target).attr("name");
    Session.set('edit_normaId', bId);
    Session.set('toConfirmDelete', true);
  },
  
  "click #cancelDelete" : function(event){
    Session.set('edit_normaId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click #confirmDelete" : function(event){  
    Normas.remove({_id:bId});
    Session.set('edit_normaId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click .colSelect" : function(event){  
    
    s = Session.get('colSelectedNormas');
    colClicked = $(event.target).attr("name");
    
    console.log("clicked: " + colClicked);
    
    if( s === undefined || s === false || _.isEmpty(s)){
      Session.set('colSelectedNormas',['title']); 
    }else{
      if(_.contains(s,colClicked)){
        if(s.length > 1){
          Session.set('colSelectedNormas',_.without(s,colClicked));
        }
      }else{
        Session.set('colSelectedNormas',_.union(s,colClicked));
      }
    }
  },
  
  'click .rowTable': function (event) {
    // set the blog post we'll display details and news for
    Session.set("formType","disabled");
    var normaId = this;
    Router.go("/norma/"+ normaId._id);
  },
  
  'click #undoDeletedNorma': function (event) {
    console.log('inside undo');
    lda = Session.get('lastDeletedNorma');
    Normas.insert(_.omit(lda, '_id'));
    Session.set("lastDeletedNorma",null);
  },
  
  'click .close': function (event) {
    Session.set('lastDeletedNorma', null);
  }
  
});


Template.normasList.helpers({
  
  normasTable: function () {
    return Normas;  
  },
  
  tableSettings: function () {
    
        var sel = Session.get('colSelectedNormas');
    
     var fs =[
          { key: 'nombre', label: 'Nombre' }
          ];
        
        
      
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
            //fields: ['title', 'norma'],
            useFontAwesome: true,
          fields: finalArray,
          rowClass: function(item) {
            return "rowTable";
          }
        };
    },
  
//   colSelected: function(){
//     return [{ key: 'name', label: 'Título' }, { key: 'norma', label: 'Autor' }];
//   },
  
  buttonClass: function(field){
    s = Session.get('colSelectedNormas');
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