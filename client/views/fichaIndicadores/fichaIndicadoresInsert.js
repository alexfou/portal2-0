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