Template.homeNoAdmin.events({
   
  'click #fichasBorrador': function(){
    Session.set('busquedaFichaEstado', '(borradores)');
    Router.go('/fichaIndicadoresList');
  },
  
  'click #agregarBorrador': function(){
    Session.set('busquedaFichaEstado', undefined);
    Router.go('/fichaIndicadorInsert');
  },
  
  'click #fichasActivas': function(){
    Session.set('busquedaFichaEstado', '(activas)');
    Router.go('/fichaIndicadoresList');
  },
  
  'click #fichasInactivas': function(){
    Session.set('busquedaFichaEstado', '(inactivas)');
    Router.go('/fichaIndicadoresList');
  },
  
  
});