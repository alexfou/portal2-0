Template.fuentePage.helpers({
  editingDoc: function () {
    return Fuentes.findOne({_id: this._id});
  },
  
  fuenteOptions: function () {
    return Fuentes.find().map(function (a) {
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

Template.fuentePage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
  "click #returnButton": function(){
    Router.go('fuentesList');
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedFuente', this);
    Fuentes.remove({'_id': this._id});
    Router.go("/fuentesList")
  },
});

Template.fuentesList.rendered = function(){
    Session.set("formType","disabled");
}

Template.fuentesList.destroyed = function(){
    Session.set("formType","disabled");
}