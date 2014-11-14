UI.registerHelper("borradoresCursor", function() {
  return FichaIndicadores.find({estado:"borrador"});
});

UI.registerHelper("getFichasActivasCollection", function() {
  return FichaIndicadores.find({estado:"activo"});
});

UI.registerHelper("getFichasInactivasCollection", function() {
  return FichaIndicadores.find({estado:"inactivo"});
});

UI.registerHelper("getPeriodosMedicionCollection", function() {
  return PeriodosMedicion.find();
});

UI.registerHelper("getMedicionesCollection", function() {
  return Mediciones.find();
});