Template.fichaIndicadorPage.helpers({
  editingDoc: function () {
    return FichaIndicadores.findOne({_id: this._id});
  },
  
  procesoOptions: function () {
    return Procesos.find().map(function (a) {
      return {label: a.nombre, value: a._id};
    });
  },
  
  fuenteOptions: function () {
    return Fuentes.find().map(function (a) {
      return {label: a.nombre, value: a._id};
    });
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

Template.fichaIndicadorPage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
   "click #returnButton" : function(event){   
    Session.set('formType', "disabled");
    Router.go('fichaIndicadoresList');
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedFichaIndicador', this);
    FichaIndicadores.remove({'_id': this._id});
    Router.go("/fichaIndicadoresList")
  },
});

Template.fichaIndicadoresList.rendered = function(){
    Session.set("formType","disabled");
}

Template.fichaIndicadoresList.destroyed = function(){
    Session.set("formType","disabled");
}