Template.fichaIndicadorPage.helpers({
  editingDoc: function () {
    return FichaIndicadores.findOne({_id: this._id});
  },
  
  getEstado: function () {
    return FichaIndicadores.findOne({_id: this._id}).estado;
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
  },
  
  showToAproveAdmin: function(aprobAdmin){
    var userRoleAdmin = _.contains(Meteor.user().roles,'admin');
    //aquí llega ya el campo de la fecha solamente
    console.log('Aprobacion: ' + aprobAdmin);
    if (userRoleAdmin && (aprobAdmin === null)){
      return true;
    }else{
      return false;
    }
  },
  
  showToAproveGestor: function(aprobGestor){
    var userRoleAdmin = _.contains(Meteor.user().roles,'admin');
    //aquí llega ya el campo de la fecha solamente
    console.log('Aprobacion: ' + aprobGestor);
    if (userRoleAdmin && (aprobGestor === null)){
      return true;
    }else{
      return false;
    }
  },
  
  fechaAprobacionAdmin: function(fi){
//     var userRoleAdmin = _.contains(Meteor.user().roles,'admin');
//     if (userRoleAdmin && (aprobGestor.aprobAdminPublicacion === null)){
//       return "Sin fecha de aprobación";
//     }else{
//       return fi.aprobAdminPublicacion;  
//     }
    
    return fi.aprobAdminPublicacion;  
     
  },
  
  fechaAprobacionGestor: function(fi){
    var userRoleAdmin = _.contains(Meteor.user().roles,'admin');
    if (userRoleAdmin && (fi.aprobGestorPublicacion === null)){
      return "Sin fecha de aprobación";
    }else{
      return fi.aprobGestorPublicacion;  
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
    Session.set('lastDeletedFichaIndicador', this._id);
    FichaIndicadores.update({'_id': this._id},{$set: { eliminacion: new Date() }});
    //FichaIndicadores.remove({'_id': this._id});
    Router.go("/fichaIndicadoresList")
  },
  
  "click #aprobAdminButton": function(){
    FichaIndicadores.update({'_id': this._id},{$set: { aprobAdminPublicacion: new Date() }});
  }
});

Template.fichaIndicadoresList.rendered = function(){
    Session.set("formType","disabled");
}

Template.fichaIndicadoresList.destroyed = function(){
    Session.set("formType","disabled");
}

Template.asignacionesAtributoNormativoIndicador.helpers({
  
  getAtributosNormativos: function () {
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

/////////////// ASIGNACIONES USUARIO INDICADOR /////////////////////////////////////////
Template.asignacionesUsuarioIndicador.helpers({
  
  getUsuarios: function () {
    var asig = AsignacionesUsuarioIndicador.find({fichaIndicadorId: this._id}).fetch();
    return _.map(asig, function(as){ return _.extend(as, {nombreUsuario: Meteor.users.findOne(as.userId).profile.name}); });
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

Template.asignacionesUsuarioIndicador.events({
  "click .removeUsuario" : function(event){
    var anId = event.currentTarget.id;
    //var fiId = $(event.currentTarget).attr('for');
    //var toRemove = _.where(AsignacionesAtributoNormativoIndicador.find({}).fetch(), {fichaIndicadorId: fiId,atributoNormativoId: anId});
    AsignacionesUsuarioIndicador.remove(anId);
    $('#addUsuario').val("");
    //console.log('clicked remove' + );
  },
  
  "change #addRol" : function(event){
    var userNombre = $("#addUsuario").val();
    var userId = Meteor.users.findOne({"profile.name":userNombre})._id;
    var fiId = Router.current().params._id;
    var rol = $("#addRol").val();
    AsignacionesUsuarioIndicador.insert({fichaIndicadorId: fiId, userId: userId, rol:[rol]});
    $("#addRol").val("default");
    $("#addUsuario").val("");
    console.log("Change rol: " + userId + "-" + rol);
  },
  
});

Template.asignacionesUsuarioIndicador.settings = function() {
  return {
   position: "top",
   limit: 5,
   rules: [
     {
       //token: '@',
       collection: Meteor.users,
       field: "profile.name",
       template: Template.userPillUser,
       callback: function(doc) { 
         console.log(doc._id + "-" + Router.current().params._id);
//          AsignacionesUsuarioIndicador.insert({
//           fichaIndicadorId: Router.current().params._id,
//           userId: doc._id,
//           rol:["responsable"]
//           });
//          $('#addUsuario').val("");
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

Template.asignacionesUsuarioIndicador.helpers({
  getRoles: function () {
    return [{nombre:"administrador"},{nombre:"responsable"}, {nombre:"reporteador"}, {nombre:"auditor"}];
  },
});

////////// ASIGNACIONES GRUPO INDICADOR //////////////////////////////////
Template.asignacionesGrupoIndicador.helpers({
  
  getGrupos: function () {
    var asig = AsignacionesGrupoIndicador.find({fichaIndicadorId: this._id}).fetch();
    return _.map(asig, function(as){ return _.extend(as, {nombre: GruposTableros.findOne(as.grupoId).nombre, nombreTablero: GruposTableros.findOne(as.grupoId).nombreTablero}); });
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
  },
  
  settings: function(){
    return {
   position: "top",
   limit: 5,
   rules: [
     {
       //token: '@',
       collection: GruposTableros,
       field: "nombre",
       template: Template.autoCompleteGruposTableros,
       callback: function(doc) { 
         console.log(doc._id + "-" + Router.current().params._id);
         AsignacionesGrupoIndicador.insert({
          fichaIndicadorId: Router.current().params._id,
          grupoId: doc._id
          });
         $('#addGrupo').val("");
         }
     },
   ]
    }
    
  }
  
});

Template.asignacionesGrupoIndicador.events({
  "click .removeGrupo" : function(event){
    var anId = event.currentTarget.id;
    //var fiId = $(event.currentTarget).attr('for');
    //var toRemove = _.where(AsignacionesAtributoNormativoIndicador.find({}).fetch(), {fichaIndicadorId: fiId,atributoNormativoId: anId});
    AsignacionesGrupoIndicador.remove(anId);
    $('#addGrupo').val("");
    //console.log('clicked remove' + );
  },
  
  
});

// Template.asignacionesAtributoNormativoIndicador.settings = function() {
//   return {
//    position: "top",
//    limit: 5,
//    rules: [
//      {
//        //token: '@',
//        collection: AtributosNormativos,
//        field: "nombre",
//        template: Template.userPill,
//        callback: function(doc) { 
//          console.log(doc._id + "-" + Router.current().params._id);
//          AsignacionesAtributoNormativoIndicador.insert({
//           fichaIndicadorId: Router.current().params._id,
//           atributoNormativoId: doc._id
//           });
//          $('#addAtributoNormativo').val("");
//          }
//      },
//    ]
//   }
// };


