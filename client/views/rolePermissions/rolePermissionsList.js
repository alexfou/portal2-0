Template.rolePermissionsList.rendered = function(){
  s = Session.get('colSelectedRolePermissions');
  if( s === undefined || s === false || _.isEmpty(s)){
    Session.set('colSelectedRolePermissions',['routeUrl', 'template', 'guiElement', 'permittedRoles']);
  }
}
Template.rolePermissionsList.helpers({
  rolePermissions: function () {
    return RolePermissions.find().fetch();  
  },
  
  showWarningDeletedRolePermission: function(){
    ldb = Session.get('lastDeletedRolePermission');
    if(ldb === undefined || ldb === false || ldb === null){
      return false; 
    }else{
      return true;
    }
  },
  
  toConfirmDelete: function(rolePermissionId){
    if(Session.get('toConfirmDelete') !== undefined && Session.get('toConfirmDelete') && Session.get('edit_rolePermissionId') == rolePermissionId){
      return "";   
    }else{
      return "hidden";
    }
  },
  
  toEnableDelete: function(rolePermissionId){
    if(Session.get('toConfirmDelete') === undefined || !Session.get('toConfirmDelete')){
      return "";   
    }else{
      return "hidden";
    }
  }
});


Template.rolePermissionsList.events({
  "click .fa-times-circle" : function(event){    
    bId = $(event.target).attr("name");
    Session.set('edit_rolePermissionId', bId);
    Session.set('toConfirmDelete', true);
  },
  
  "click #cancelDelete" : function(event){
    Session.set('edit_rolePermissionId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click #confirmDelete" : function(event){  
    RolePermissions.remove({_id:bId});
    Session.set('edit_rolePermissionId', null);
    Session.set('toConfirmDelete', false);
  },
  
  "click .colSelect" : function(event){  
    
    s = Session.get('colSelectedRolePermissions');
    colClicked = $(event.target).attr("name");
    
    console.log("clicked: " + colClicked);
    
    if( s === undefined || s === false || _.isEmpty(s)){
      Session.set('colSelectedRolePermissions',['title']); 
    }else{
      if(_.contains(s,colClicked)){
        if(s.length > 1){
          Session.set('colSelectedRolePermissions',_.without(s,colClicked));
        }
      }else{
        Session.set('colSelectedRolePermissions',_.union(s,colClicked));
      }
    }
  },
  
  'click .rowTable': function (event) {
    // set the blog post we'll display details and news for
    Session.set("formType","disabled");
    var rolePermissionId = this;
    Router.go("/rolePermission/"+ rolePermissionId._id);
  },
  
  'click #undoDeletedRolePermission': function (event) {
    console.log('inside undo');
    lda = Session.get('lastDeletedRolePermission');
    RolePermissions.insert(_.omit(lda, '_id'));
    Session.set("lastDeletedRolePermission",null);
  },
  
  'click .close': function (event) {
    Session.set('lastDeletedRolePermission', null);
  }
  
});


Template.rolePermissionsList.helpers({
  
  rolePermissionsTable: function () {
    return RolePermissions;  
  },
  
  tableSettings: function () {
    
        var sel = Session.get('colSelectedRolePermissions');
        
        var fs =[
          { key: 'routeUrl', label: 'Route Url' },
          { key: 'template', label: 'Template' },
          { key: 'guiElement', label: 'GUI Element' },
          { key: 'permittedRoles', label: 'Permitted Roles' }];
      
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
            //fields: ['title', 'rolePermission'],
            useFontAwesome: true,
          fields: finalArray,
          rowClass: function(item) {
            return "rowTable";
          }
        };
    },
  
//   colSelected: function(){
//     return [{ key: 'name', label: 'Título' }, { key: 'rolePermission', label: 'Autor' }];
//   },
  
  buttonClass: function(field){
    s = Session.get('colSelectedRolePermissions');
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