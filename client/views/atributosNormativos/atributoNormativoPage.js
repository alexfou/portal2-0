Template.atributoNormativoPage.helpers({
  editingDoc: function () {
    return AtributosNormativos.findOne({_id: this._id});
  },
  
  atributoNormativoOptions: function () {
    return AtributosNormativos.find().map(function (a) {
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

Template.atributoNormativoPage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
  "click #returnButton": function(){
    Router.go('atributosNormativosList');
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedAtributoNormativo', this);
    AtributosNormativos.remove({'_id': this._id});
    Router.go("/atributosNormativosList")
  },
});

Template.atributosNormativosList.rendered = function(){
    Session.set("formType","disabled");
}

Template.atributosNormativosList.destroyed = function(){
    Session.set("formType","disabled");
}