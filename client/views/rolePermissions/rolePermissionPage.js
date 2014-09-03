Template.rolePermissionPage.helpers({
  editingDoc: function () {
    return RolePermissions.findOne({_id: this._id});
  },
  
  rolePermissionOptions: function () {
    return RolePermissions.find().map(function (a) {
      return {label: a.name, value: a._id};
    });
  },
  
  formType: function(t){
    var ft = Session.get('formType');
    if((ft === undefined || ft === false || ft === null) && (t == "disabled")){
      return true;
    }
    if((ft === undefined || ft === false || ft === null) && (t == "update")){
      return false;
    }  
    if((ft == "update") && (t == "update")){
      return true;
    }
    if((ft == "disabled") && (t == "disabled")){
      return true;
    } 
  }
});

Template.rolePermissionPage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedRolePermission', this);
    RolePermissions.remove({'_id': this._id});
    Router.go("/rolePermissionsList")
  },
});

Template.rolePermissionsList.rendered = function(){
    Session.set("formType","disabled");
}

Template.rolePermissionsList.destroyed = function(){
    Session.set("formType","disabled");
}