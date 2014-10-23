Template.entidadReguladoraPage.helpers({
  editingDoc: function () {
    return EntidadesReguladoras.findOne({_id: this._id});
  },
  
  entidadReguladoraOptions: function () {
    return EntidadesReguladoras.find().map(function (a) {
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

Template.entidadReguladoraPage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
  "click #returnButton": function(){
    Router.go('entidadesReguladorasList');
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedEntidadReguladora', this);
    EntidadesReguladoras.remove({'_id': this._id});
    Router.go("/entidadesReguladorasList")
  },
});

Template.entidadesReguladorasList.rendered = function(){
    Session.set("formType","disabled");
}

Template.entidadesReguladorasList.destroyed = function(){
    Session.set("formType","disabled");
}