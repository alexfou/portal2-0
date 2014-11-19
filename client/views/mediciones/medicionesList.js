Template.medicionesList.helpers({
  getFichas: function(){
    return FichaIndicadores.find().fetch();
  }
  
});