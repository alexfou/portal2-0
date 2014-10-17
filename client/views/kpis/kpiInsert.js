Template.kpiInsert.helpers({
  processOptions: function () {
    return Processes.find().map(function (p) {
      return {label: p.name, value: p._id};
    });
  },
  
  tempInsertKpi: function(){
    return Session.get('tempInsertKpi')
  }
});

Template.kpiInsert.destroyed = function(){
  s= Session.get('tempInsertKpi');
  console.log('session in destoryed: ' +s)
  if(s === undefined || s === false || s === null){
    
  }else{
    tempInsertKpi = AutoForm.getFormValues('insertKpiForm');
    console.log('session in destoryed SETTING')
    Session.set('tempInsertKpi',tempInsertKpi.insertDoc);    
  }
};

Template.kpiInsert.events({
  'click #addProcess': function(){
    tempInsertKpi = AutoForm.getFormValues('insertKpiForm');
    Session.set('tempInsertKpi',tempInsertKpi.insertDoc);
    Session.set('originRoute', 'kpiInsert');
    Router.go('/processInsert');
  },
  
  'click #cancelButton': function(){
    Router.go('kpisList');    
  }
});

Template.kpiInsert.rendered = function(){
  console.log('inside rendered kpi Insert')
};