medicionesFormulados = function(fichaId, periodo, segmento){
  
  //OJO: periodo significa o que existe la Medcion o que es el periodo que faltaba medir
  //console.log("MedicionesFormlados con: " + fichaId)
  
  //obtener fichas con formula que tengan en su campo fichasFormula el valor 
  var ff = _.filter(FichaIndicadores.find().fetch(),function(f){
    return (_.contains(f.fichasFormula,fichaId)) && (!_.isUndefined(f.formula));
  })
  
  //para cada ficha con formula encontrada verificar si existe los valores de las otras fichas que depende
  _.map(ff, function(ff_i){
    console.log('FICHAS CON FORMULA ENCONTRADOS: ' + ff_i._id);
    //OJO: tiene que tener la variables f porque es la que esta en eval
    var f = [];
    _.map(ff_i.fichasFormula,function(fArray){ 
      console.log('FICHA DENTRO DE FORMULA: ' + fArray + " - PERIODO: " + periodo + " - SEG: " + segmento);
      var v = Mediciones.findOne({fichaIndicadorId: fArray, periodoMedicionId: periodo, segmentoMedicion:segmento});
      console.log('vaaible encontrada para formula: ' + v.valorActual);
      f.push(v.valorActual);
      
      
//       var ficha = FichaIndicadores.findOne({'_id': f2});
//       console.log('Existía medicion: ' + existeMed);
//       var med = null
//       if(existeMed){
//         med = Mediciones.findOne({'_id': periodo});   
//       }else{
//         med = Mediciones.find({fichaIndicadorId: fff, periodoMedicionId: periodo, segmento:segmento}).fetch();
//       }
      
//       console.log("Valro actual encotnrado: " + med.valorActual);
//       f.push(med.valorActual);
    });
    console.log('Elementos en el arreglo f: ' + f);
    var medicionFormulada = eval(ff_i.formula);
    medicionFormulada = Number(medicionFormulada.toFixed(2));
    console.log('VALOR DE MEDICION: ' + medicionFormulada);
    if(_.isNaN(medicionFormulada)){
      
    }else{
      var med = Mediciones.findOne({fichaIndicadorId: ff_i._id, periodoMedicionId: periodo, segmentoMedicion:segmento});
      if(_.isUndefined(med)){
        console.log()
        Mediciones.insert({
          fichaIndicadorId: ff_i._id,
          periodoMedicionId: periodo,
          userId:Meteor.users.findOne()._id,
          segmentoMedicion:segmento,
          valorActual: medicionFormulada,
          metaActual: Infinity,
          valorAnterior: Infinity,
          metaAnterior: Infinity,
          comentario: null
        });
        
      }else{
        
         Mediciones.update({'_id':med._id},
           {$set:{valorActual: medicionFormulada}});
        
      }
      
    }
      
    
  });
  //realizar la medicion en caso de que se den las condiciones
  // insertar o actualizar la nueva emdicion para cada ficha formaulada enconrada
  return false; 
}