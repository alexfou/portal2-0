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
  
  atributoNormativoOptions: function () {
    return AtributosNormativos.find().map(function (a) {
      return {label: a.nombre, value: a.nombre};
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

Template.asignacionesAtributoNormativoIndicador.helpers({
  
  getAtributosNormativos: function () {
    //var fks =  _.pluck(AsignacionesAtributoNormativoIndicador.find({fichaIndicadorId: this._id}).fetch(), 'atributoNormativoId');
    var asig = AsignacionesAtributoNormativoIndicador.find({fichaIndicadorId: this._id}).fetch();
    return _.map(asig, function(as){ return _.extend(as, {nombreAt: AtributosNormativos.findOne(as.atributoNormativoId).nombre}); });
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

Template.asignacionesAtributoNormativoIndicador.events({
  "click .removeAtributoNormativo" : function(event){
    var anId = event.currentTarget.id;
    //var fiId = $(event.currentTarget).attr('for');
    //var toRemove = _.where(AsignacionesAtributoNormativoIndicador.find({}).fetch(), {fichaIndicadorId: fiId,atributoNormativoId: anId});
    AsignacionesAtributoNormativoIndicador.remove(anId);
    $('#addAtributoNormativo').val("");
    //console.log('clicked remove' + );
  },
});

Template.asignacionesAtributoNormativoIndicador.settings = function() {
  return {
   position: "top",
   limit: 5,
   rules: [
     {
       //token: '@',
       collection: AtributosNormativos,
       field: "nombre",
       template: Template.userPill,
       callback: function(doc) { 
         console.log(doc._id + "-" + Router.current().params._id);
         AsignacionesAtributoNormativoIndicador.insert({
          fichaIndicadorId: Router.current().params._id,
          atributoNormativoId: doc._id
          });
         $('#addAtributoNormativo').val("");
         }
     },
//      {
//        token: '!',
//        collection: Dataset,
//        field: "_id",
//        options: '',
//        matchAll: true,
//        filter: { type: "autocomplete" },
//        template: Template.dataPiece
//      }
   ]
  }
};