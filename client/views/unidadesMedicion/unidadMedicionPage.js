Template.unidadMedicionPage.helpers({
  editingDoc: function () {
    return UnidadesMedicion.findOne({_id: this._id});
  },
  
  unidadMedicionOptions: function () {
    return UnidadesMedicion.find().map(function (a) {
      return {label: a.nombre, value: a._id};
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

Template.unidadMedicionPage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
  "click #returnButton": function(){
    Router.go('unidadesMedicionList');
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedUnidadMedicion', this);
    UnidadesMedicion.remove({'_id': this._id});
    Router.go("/unidadesMedicionList")
  },
});

Template.unidadesMedicionList.rendered = function(){
    Session.set("formType","disabled");
}

Template.unidadesMedicionList.destroyed = function(){
    Session.set("formType","disabled");
}