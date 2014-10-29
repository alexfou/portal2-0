Template.fichaIndicadorInsert.helpers({
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
  
  tempInsertFichaIndicador: function(){
    return Session.get('tempInsertFichaIndicador')
  }
});

Template.fichaIndicadorInsert.destroyed = function(){
  s= Session.get('tempInsertFichaIndicador');
  console.log('session in destoryed: ' +s)
  if(s === undefined || s === false || s === null){
    
  }else{
    tempInsertFichaIndicador = AutoForm.getFormValues('insertFichaIndicadorForm');
    console.log('session in destoryed SETTING')
    Session.set('tempInsertFichaIndicador',tempInsertFichaIndicador.insertDoc);    
  }
};

Template.fichaIndicadorInsert.events({
  'click #addProcesoFichaIndicador': function(){
    tempInsertFichaIndicador = AutoForm.getFormValues('insertFichaIndicadorForm');
    Session.set('tempInsertFichaIndicador',tempInsertFichaIndicador.insertDoc);
    Session.set('originRoute', 'fichaIndicadorInsert');
    Router.go('/procesoInsert');
  },
  
   'click #addFuenteFichaIndicador': function(){
    tempInsertFichaIndicador = AutoForm.getFormValues('insertFichaIndicadorForm');
    Session.set('tempInsertFichaIndicador',tempInsertFichaIndicador.insertDoc);
    Session.set('originRoute', 'fichaIndicadorInsert');
    Router.go('/fuenteInsert');
  },
  
  'click #cancelButton': function(){
    Router.go('fichaIndicadoresList');    
  }
});

Template.fichaIndicadorInsert.rendered = function(){
  console.log('inside rendered fichaIndicador Insert')
};

Template.asignacionesAtributoNormativoIndicadorInsert.helpers({
  
  getAtributosNormativos: function () {
    var asig = Session.get('newAtributosNormativos');
    var cont = 0;
    return _.map(asig, function(as){ cont++; return _.extend(as, {nombreAt: AtributosNormativos.findOne(as.atributoNormativoId).nombre},{numIt: cont-1}); });
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

Template.asignacionesAtributoNormativoIndicadorInsert.events({
  "click .removeAtributoNormativo" : function(event){
    var anId = event.currentTarget.id;
    var arr = Session.get('newAtributosNormativos'); 
    arr.splice(anId, 1);
    Session.set('newAtributosNormativos', arr); 
    //var fiId = $(event.currentTarget).attr('for');
    //var toRemove = _.where(AsignacionesAtributoNormativoIndicador.find({}).fetch(), {fichaIndicadorId: fiId,atributoNormativoId: anId});
    //AsignacionesAtributoNormativoIndicador.remove(anId);
    $('#addAtributoNormativo').val("");
    //console.log('clicked remove' + );
  },
});

Template.asignacionesAtributoNormativoIndicadorInsert.settings = function() {
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
//          AsignacionesAtributoNormativoIndicador.insert({
//           fichaIndicadorId: Router.current().params._id,
//           atributoNormativoId: doc._id
//           });
         if(Session.get('newAtributosNormativos') === undefined || Session.get('newAtributosNormativos') === null){
           Session.set('newAtributosNormativos', [{atributoNormativoId: doc._id}]);  
         }else{
           var arr = Session.get('newAtributosNormativos');
           arr.push({atributoNormativoId: doc._id});
           Session.set('newAtributosNormativos',arr);
         }
         
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

/////////////// ASIGNACIONES USUARIO INDICADOR INSERT/////////////////////////////////////////
Template.asignacionesUsuarioIndicadorInsert.helpers({
  
  getUsuarios: function () {
    var asig = Session.get('newUsuariosRoles');
    var cont = 0;
    return _.map(asig, function(as){ cont++; return _.extend(as, {nombreUsuario: Meteor.users.findOne(as.userId).profile.name},{numIt: cont-1}); });
  //},
   // var asig = AsignacionesUsuarioIndicador.find({fichaIndicadorId: this._id}).fetch();
  //  return _.map(asig, function(as){ return _.extend(as, {nombreUsuario: Meteor.users.findOne(as.userId).profile.name}); });
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
  
  getRoles: function () {
    return [{nombre:"administrador"},{nombre:"responsable"}, {nombre:"reporteador"}, {nombre:"auditor"}];
  },
  
});

Template.asignacionesUsuarioIndicadorInsert.events({
  "click .removeUsuario" : function(event){
    
    var anId = event.currentTarget.id;
    var arr = Session.get('newUsuariosRoles'); 
    arr.splice(anId, 1);
    Session.set('newUsuariosRoles', arr); 
    //var fiId = $(event.currentTarget).attr('for');
    //var toRemove = _.where(AsignacionesAtributoNormativoIndicador.find({}).fetch(), {fichaIndicadorId: fiId,atributoNormativoId: anId});
    //AsignacionesAtributoNormativoIndicador.remove(anId);
    //$('#addAtributoNormativo').val("");
    
    //var fiId = $(event.currentTarget).attr('for');
    //var toRemove = _.where(AsignacionesAtributoNormativoIndicador.find({}).fetch(), {fichaIndicadorId: fiId,atributoNormativoId: anId});
   // AsignacionesUsuarioIndicador.remove(anId);
    $('#addUsuario').val("");
    //console.log('clicked remove' + );
  },
  
  "change #addRol" : function(event){
    var userNombre = $("#addUsuario").val();
    var userId = Meteor.users.findOne({"profile.name":userNombre})._id;
    //var fiId = Router.current().params._id;
    var rol = $("#addRol").val();
    if(Session.get('newUsuariosRoles') === undefined || Session.get('newUsuariosRoles') === null){
      Session.set('newUsuariosRoles', [{userId: userId, rol:[rol]}]);  
         }else{
           var arr = Session.get('newUsuariosRoles');
           arr.push({userId: userId, rol:[rol]});
           Session.set('newUsuariosRoles',arr);
         }
    $("#addRol").val("default");
    $("#addUsuario").val("");
    console.log("Change rol: " + userId + "-" + rol);
  },
  
});

Template.asignacionesUsuarioIndicadorInsert.settings = function() {
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

/////////////// ASIGNACIONES GRUPO INDICADOR INSERT/////////////////////////////////////////
Template.asignacionesGrupoIndicadorInsert.helpers({
  
  getGrupos: function () {
    var asig = Session.get('newGrupos');
    var cont = 0;
    return _.map(asig, function(as){ cont++; return _.extend(as, {nombre: GruposTableros.findOne(as.grupoId).nombre,nombreTablero: GruposTableros.findOne(as.grupoId).nombreTablero,numIt: cont-1}); });
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
//          AsignacionesAtributoNormativoIndicador.insert({
//           fichaIndicadorId: Router.current().params._id,
//           atributoNormativoId: doc._id
//           });
         if(Session.get('newGrupos') === undefined || Session.get('newGrupos') === null){
           Session.set('newGrupos', [{grupoId: doc._id}]);  
         }else{
           var arr = Session.get('newGrupos');
           arr.push({grupoId: doc._id});
           Session.set('newGrupos',arr);
         }
         
         $('#addGrupo').val("");
         }
     },
   ]
  }
  }
  
});

Template.asignacionesAtributoNormativoIndicadorInsert.events({
  "click .removeGrupo" : function(event){
    var anId = event.currentTarget.id;
    var arr = Session.get('newGrupos'); 
    arr.splice(anId, 1);
    Session.set('newAtributosNormativos', arr); 
    //var fiId = $(event.currentTarget).attr('for');
    //var toRemove = _.where(AsignacionesAtributoNormativoIndicador.find({}).fetch(), {fichaIndicadorId: fiId,atributoNormativoId: anId});
    //AsignacionesAtributoNormativoIndicador.remove(anId);
    $('#addGrupo').val("");
    //console.log('clicked remove' + );
  },
});


