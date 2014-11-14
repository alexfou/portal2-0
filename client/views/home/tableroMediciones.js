Template.tableroMediciones.rendered = function(){
   var periodosTotales= [];
   var periodosPeriodo= [];
   var fis = FichaIndicadores.find({}).fetch();
  
  _.each(fis, function(f){
      var today = new Date();
      var fechaInicio = f.fechaInicioMedicion;
     // var periodos = PeriodosMedicion.find({fechaReferencia: { $gte: fechaInicio } }).fetch()
      var periodos = PeriodosMedicion.find({
        $and: [{fechaReferencia: { $gte: fechaInicio }}, 
               {fechaReferencia: { $lte: today }} 
              ]}).fetch();
      var seg = f.segmentosMediciones;
      console.log("Segmentos: " + seg);
      _.each(periodos, function(p){
        _.each(seg, function(s){
          periodosTotales.push({fichaIndicadorId:f._id, periodoMedicionId:p._id, segmentoMedicion:s}); 
          console.log('Meses: ' + today.getUTCMonth() + "/" + p.fechaReferencia.getUTCMonth());
          if(today.getUTCMonth() == p.fechaReferencia.getUTCMonth()){
            periodosPeriodo.push({fichaIndicadorId:f._id, periodoMedicionId:p._id, segmentoMedicion:s}); 
          }
        });    
      });
    });
     
     Session.set('periodosTotales',periodosTotales);
     Session.set('periodosPeriodo',periodosPeriodo);
     
//      if(tipo == "totales"){
//         return periodosTotales.length; 
//      }else{
//        return periodosPeriodo.length; 
//      }
    
   var mediciones = Mediciones.find().fetch();
   var periodosMedidosTotales = [];
  var periodoMedido = null
    _.each(periodosTotales, function(p){
      periodoMedido = _.where(mediciones, {fichaIndicadorId: p.fichaIndicadorId, 
                           periodoMedicionId: p.periodoMedicionId,
                           segmentoMedicion: p.segmentoMedicion
                          });
      if (!_.isEmpty(periodoMedido)){
        periodosMedidosTotales.push(periodoMedido);  
      }
    });
    
      Session.set('periodosMedidosTotales', periodosMedidosTotales); 
  
  mediciones = Mediciones.find().fetch();
  var periodosMedidosPeriodo = [];
   periodoMedido = null
    _.each(periodosPeriodo, function(p){
      periodoMedido = _.where(mediciones, {fichaIndicadorId: p.fichaIndicadorId, 
                           periodoMedicionId: p.periodoMedicionId,
                           segmentoMedicion: p.segmentoMedicion
                          });
      if (!_.isEmpty(periodoMedido)){
        periodosMedidosPeriodo.push(periodoMedido);  
      }
    });
    
      Session.set('periodosMedidosPeriodo', periodosMedidosPeriodo); 

};

Template.tableroMediciones.helpers({
  
  getMonth: function(){
    var d = new Date();
    return d.getUTCMonth() + 1; 
  },
  
   periodosAReportar: function(tipo){
    
//      var periodosTotales= [];
//      var periodosPeriodo= [];
//     var fis = FichaIndicadores.find({}).fetch();
     
//     _.each(fis, function(f){
//       var today = new Date();
//       var fechaInicio = f.fechaInicioMedicion;
//      // var periodos = PeriodosMedicion.find({fechaReferencia: { $gte: fechaInicio } }).fetch()
//       var periodos = PeriodosMedicion.find({
//         $and: [{fechaReferencia: { $gte: fechaInicio }}, 
//                {fechaReferencia: { $lte: today }} 
//               ]}).fetch();
//       var seg = f.segmentosMediciones;
//       console.log("Segmentos: " + seg);
//       _.each(periodos, function(p){
//         _.each(seg, function(s){
//           periodosTotales.push({fichaIndicadorId:f._id, periodoMedicionId:p._id, segmentoMedicion:s}); 
//           console.log('Meses: ' + today.getUTCMonth() + "/" + p.fechaReferencia.getUTCMonth());
//           if(today.getUTCMonth() == p.fechaReferencia.getUTCMonth()){
//             periodosPeriodo.push({fichaIndicadorId:f._id, periodoMedicionId:p._id, segmentoMedicion:s}); 
//           }
//         });    
//       });
//     });
     
//      Session.set('periodosTotales',periodosTotales);
//      Session.set('periodosPeriodo',periodosPeriodo);
     
     var periodosTotales = Session.get('periodosTotales');
      var periodosPeriodo = Session.get('periodosPeriodo');
     
     if(tipo == "totales"){
        return periodosTotales.length; 
     }else{
       return periodosPeriodo.length; 
     }
     
    
     
   // return PeriodosMedicion.find({}).fetch().length
  },
  
  periodosAlDia: function(tipo){  
    
    var periodosMedidos = null;
    
    if(tipo == "totales"){
      periodosMedidos = Session.get('periodosMedidosTotales');     
    }else{
      periodosMedidos = Session.get('periodosMedidosPeriodo');  
    }
      
    if(_.isEmpty(periodosMedidos)){
      return 0;
    }else{
      return periodosMedidos.length;  
    }
    
  },
  
   periodosFaltantes: function(tipo){
     var aReportar = null;
     var medidos = null;
      if(tipo == "totales"){
        aReportar = Session.get('periodosTotales'); 
        medidos = Session.get('periodosMedidosTotales'); 
     }else{
       aReportar = Session.get('periodosPeriodo');  
       medidos = Session.get('periodosMedidosPeriodo'); 
     }
        
    return aReportar.length - medidos.length; 
  },
                                   
  getYear: function(){
    var d= new Date();
    return d.getUTCFullYear();
  },
  
  fis: function(){
    return FichaIndicadores.find({estado:"activo"}).fetch();
  },
  
  numMediciones: function(){
    var cont = 0
    
    var fis = FichaIndicadores.find({estado:"activo"}).fetch();
    _.each(fis, function(f){cont = cont + f.segmentosMediciones.length;});

    return cont;
  }
});