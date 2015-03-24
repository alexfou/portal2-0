Template.resumenTableroPage.helpers({
  getGrupos: function(){
    var grupos = GruposTableros.find({tableroId: this._id}).fetch();
    return grupos;
    
  },
  
  getFichas: function(grupoId){
    var fichas = AsignacionesGrupoIndicador.find({grupoId: grupoId}).fetch();
    var fichas2 = _.pluck(fichas, 'fichaIndicadorId');
    console.log('FICHAS ARRAY:' + grupoId + "/" + fichas2);
    return FichaIndicadores.find({'_id': {$in: fichas2}}).fetch();
}
  
});