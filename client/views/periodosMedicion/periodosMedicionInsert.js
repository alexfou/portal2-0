Template.periodoMedicionInsert.helpers({
  entidadReguladoraOptions: function () {
    return EntidadesReguladoras.find().map(function (a) {
      return {label: a.nombre, value: a._id};
    });
  },
  
  tempInsertPeriodoMedicion: function(){
    return Session.get('tempInsertPeriodoMedicion')
  }
});

Template.periodoMedicionInsert.destroyed = function(){
  s= Session.get('tempInsertPeriodoMedicion');
  console.log('session in destoryed: ' +s)
  if(s === undefined || s === false || s === null){
    
  }else{
    tempInsertPeriodoMedicion = AutoForm.getFormValues('insertPeriodoMedicionForm');
    console.log('session in destoryed SETTING')
    Session.set('tempInsertPeriodoMedicion',tempInsertPeriodoMedicion.insertDoc);    
  }
};

Template.periodoMedicionInsert.events({
  'click #addEntidadReguladoraPeriodoMedicion': function(){
    tempInsertPeriodoMedicion = AutoForm.getFormValues('insertPeriodoMedicionForm');
    Session.set('tempInsertPeriodoMedicion',tempInsertPeriodoMedicion.insertDoc);
    Session.set('originRoute', 'periodoMedicionInsert');
    Router.go('/entidadReguladoraInsert');
  },
  
  'click #cancelButton': function(){
    Router.go('periodosMedicionList');    
  }
});

Template.periodoMedicionInsert.rendered = function(){
  console.log('inside rendered periodoMedicion Insert')
};