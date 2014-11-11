UI.registerHelper("borradoresCursor", function() {
  return FichaIndicadores.find({estado:"borrador"});
});

UI.registerHelper("getFichasActivasCollection", function() {
  return FichaIndicadores.find({estado:"activo"});
});

UI.registerHelper("getFichasInactivasCollection", function() {
  return FichaIndicadores.find({estado:"inactivo"});
});