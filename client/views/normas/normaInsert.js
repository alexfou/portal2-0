Template.normaInsert.helpers({
  entidadReguladoraOptions: function () {
    return EntidadesReguladoras.find().map(function (a) {
      return {label: a.nombre, value: a._id};
    });
  },
  
  tempInsertNorma: function(){
    return Session.get('tempInsertNorma')
  }
});

Template.normaInsert.destroyed = function(){
  s= Session.get('tempInsertNorma');
  console.log('session in destoryed: ' +s)
  if(s === undefined || s === false || s === null){
    
  }else{
    tempInsertNorma = AutoForm.getFormValues('insertNormaForm');
    console.log('session in destoryed SETTING')
    Session.set('tempInsertNorma',tempInsertNorma.insertDoc);    
  }
};

Template.normaInsert.events({
  'click #addEntidadReguladoraNorma': function(){
    tempInsertNorma = AutoForm.getFormValues('insertNormaForm');
    Session.set('tempInsertNorma',tempInsertNorma.insertDoc);
    Session.set('originRoute', 'normaInsert');
    Router.go('/entidadReguladoraInsert');
  },
  
  'click #cancelButton': function(){
    Router.go('normasList');    
  }
});

Template.normaInsert.rendered = function(){
  console.log('inside rendered norma Insert')
};