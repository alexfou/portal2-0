UI.registerHelper("getFichasBorradoresCollection", function() {
  return FichaIndicadores.find({estado:"borrador"}).fetch();
});

UI.registerHelper("getFichasActivasCollection", function() {
  return FichaIndicadores.find({estado:"activo"}).fetch();
});

UI.registerHelper("getFichasInactivasCollection", function() {
  return FichaIndicadores.find({estado:"inactivo"}).fetch();
});