// UI.registerHelper("getFichasBorradoresCollection", function() {
//   Tracker.autorun(function() {
//     var fis = FichaIndicadores.find({estado:"borrador"}).fetch();
//     return FichaIndicadores.find({estado:"borrador"}).fetch();
//   });
  
//   return FichaIndicadores.find({estado:"borrador"}).fetch();
// });

UI.registerHelper("getFichasActivasCollection", function() {
  return FichaIndicadores.find({estado:"activo"}).fetch();
});

UI.registerHelper("getFichasInactivasCollection", function() {
  return FichaIndicadores.find({estado:"inactivo"}).fetch();
});