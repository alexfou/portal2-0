Template.atributoNormativoInsert.helpers({
  normaOptions: function () {
    return Normas.find().map(function (a) {
      return {label: a.nombre, value: a._id};
    });
  },
  
  tempInsertAtributoNormativo: function(){
    return Session.get('tempInsertAtributoNormativo')
  }
});

Template.atributoNormativoInsert.destroyed = function(){
  s= Session.get('tempInsertAtributoNormativo');
  console.log('session in destoryed: ' +s)
  if(s === undefined || s === false || s === null){
    
  }else{
    tempInsertAtributoNormativo = AutoForm.getFormValues('insertAtributoNormativoForm');
    console.log('session in destoryed SETTING')
    Session.set('tempInsertAtributoNormativo',tempInsertAtributoNormativo.insertDoc);    
  }
};

Template.atributoNormativoInsert.events({
  'click #addNormaAtributoNormativo': function(){
    tempInsertAtributoNormativo = AutoForm.getFormValues('insertAtributoNormativoForm');
    Session.set('tempInsertAtributoNormativo',tempInsertAtributoNormativo.insertDoc);
    Session.set('originRoute', 'atributoNormativoInsert');
    Router.go('/normaInsert');
  },
  
  'click #cancelButton': function(){
    Router.go('/atributosNormativosList');    
  }
});

Template.atributoNormativoInsert.rendered = function(){
  console.log('inside rendered atributoNormativo Insert')
};