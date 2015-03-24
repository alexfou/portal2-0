Template.resumenTablerosList.helpers({
  getTableros: function(){
    return Tableros.find().fetch();
  }  
});