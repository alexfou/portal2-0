Template.procesoPage.helpers({
  editingDoc: function () {
    return Procesos.findOne({_id: this._id});
  },
  
  procesoOptions: function () {
    return Procesos.find().map(function (a) {
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

Template.procesoPage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
  "click #returnButton": function(){
    Router.go('procesosList');
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedProceso', this);
    Procesos.remove({'_id': this._id});
    Router.go("/procesosList")
  },
});

Template.procesosList.rendered = function(){
    Session.set("formType","disabled");
}

Template.procesosList.destroyed = function(){
    Session.set("formType","disabled");
}