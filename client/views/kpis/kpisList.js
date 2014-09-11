Template.kpisList.rendered = function(){
  s = Session.get('colSelectedKpis');
  if( s === undefined || s === false || _.isEmpty(s)){
    Session.set('colSelectedKpis',['name', 'processKpi.name']);
  }
}
Template.kpisList.helpers({
  kpis: function () {
    return Kpis.find().fetch();  
  },
  
  showWarningDeletedKpi: function(){
    ldb = Session.get('lastDeletedKpi');
    if(ldb === undefined || ldb === false || ldb === null){
      return false; 
    }else{
      return true;
    }
  },
  
  toConfirmDelete: function(kpiId){
    if(Session.get('toConfirmDelete') !== undefined && Session.get('toConfirmDelete') && Session.get('edit_kpiId') == kpiId){
      return "";   
    }else{
      return "hidden";
    }
  },
  
  toEnableDelete: function(kpiId){
    if(Session.get('toConfirmDelete') === undefined || !Session.get('toConfirmDelete')){
      return "";   
    }else{
      return "hidden";
    }
  }
});


Template.kpisList.events({
  "click .fa-times-circle" : function(event){    
    bId = $(event.target).attr("name");
    Session.set('edit_kpiId', bId);
    Session.set('toConfirmDelete', true);
  },
  
  "click #cancelDelete" : function(event){
    Session.set('edit_kpiId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click #confirmDelete" : function(event){  
    Kpis.remove({_id:bId});
    Session.set('edit_kpiId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click .colSelect" : function(event){  
    
    s = Session.get('colSelectedKpis');
    colClicked = $(event.target).attr("name");
    
    console.log("clicked: " + colClicked);
    
    if( s === undefined || s === false || _.isEmpty(s)){
      Session.set('colSelectedKpis',['title']); 
    }else{
      if(_.contains(s,colClicked)){
        if(s.length > 1){
          Session.set('colSelectedKpis',_.without(s,colClicked));
        }
      }else{
        Session.set('colSelectedKpis',_.union(s,colClicked));
      }
    }
  },
  
  'click .rowTable': function (event) {
    // set the blog post we'll display details and news for
    Session.set("formType","disabled");
    var kpiId = this;
    Router.go("/kpi/"+ kpiId._id);
  },
  
  'click #undoDeletedKpi': function (event) {
    console.log('inside undo');
    lda = Session.get('lastDeletedKpi');
    Kpis.insert(_.omit(lda, '_id'));
    Session.set("lastDeletedKpi",null);
  },
  
  'click .close': function (event) {
    Session.set('lastDeletedKpi', null);
  }
  
});


Template.kpisList.helpers({
  
  kpisTable: function () {
    return Kpis;  
  },
  
  tableSettings: function () {
    
        var sel = Session.get('colSelectedKpis');
        
        var fs =[
          { key: 'name', label: 'Nombre' },
          { key: 'processKpi.name', label: 'Proceso' }];
      
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
            //fields: ['title', 'kpi'],
            useFontAwesome: true,
          fields: finalArray,
          rowClass: function(item) {
            return "rowTable";
          }
        };
    },
  
//   colSelected: function(){
//     return [{ key: 'name', label: 'Título' }, { key: 'kpi', label: 'Autor' }];
//   },
  
  buttonClass: function(field){
    s = Session.get('colSelectedKpis');
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