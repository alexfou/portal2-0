Template.tablaDatos.helpers({
  getMediciones: function(fichaId, segmento){
    return Mediciones.find({fichaIndicadorId: fichaId, segmentoMedicion:segmento}).fetch();
  },
  
  dataPoints: function(fichaId, segmento, tipoValor, anio){
    var periodos = [];
    var valores = [];
    var periodosTotales = PeriodosMedicion.find().fetch();
    
    // obtener los periodos del año seleccionado para luego buscar sus mediciones
    _.each(periodosTotales, function(p){
      if(p.fechaReferencia.getUTCFullYear() == anio){
        periodos.push(p._id);
      }  
    });
    
    // obtener las mediciones de la ficha en curso con los periodos en curso
    _.each(periodos, function(p){
      var ficha = FichaIndicadores.findOne({'_id': fichaId});
      var isFormula = !_.isEmpty(ficha.formula);
      var med = Mediciones.findOne({fichaIndicadorId: fichaId, periodoMedicionId: p, segmentoMedicion: segmento});
      
      if(isFormula){
        if(_.isUndefined(med)){
          var f = [];
          _.each(ficha.fichasFormula, function(f_i){
            var med_i = Mediciones.findOne({fichaIndicadorId: f_i, periodoMedicionId: p, segmentoMedicion: segmento});
            if(med_i !== undefined){
              f.push(med_i.valorActual);      
            }
          });
          var forEval = eval(ficha.formula)
          console.log('Have to insert Medicion with formula: ' + forEval);
          console.log('Tyoe of evak: ' + isNaN(forEval));
          if(!isNaN(forEval)){
             med = Mediciones.insert({
              fichaIndicadorId: fichaId,
              periodoMedicionId: p,
              userId: Meteor.user()._id,
              segmentoMedicion:segmento,
              valorActual: forEval,
              metaActual: Infinity,
              valorAnterior: Infinity,
              metaAnterior: Infinity,
              comentario: null
            });            
          }
        }
        
//          med = Mediciones.insert({
//           fichaIndicadorId: fichaId,
//           periodoMedicionId: p,
//           userId: Meteor.user()._id,
//           segmentoMedicion:segmento,
//           valorActual: eval(ficha.formula),
//           metaActual: Infinity,
//           valorAnterior: Infinity,
//           metaAnterior: Infinity,
//           comentario: null
//         });
      }
      
      
      
      
//       if(_.isEmpty(ficha.formula)){
//         med = Mediciones.findOne({fichaIndicadorId: fichaId, periodoMedicionId: p, segmentoMedicion: segmento}); 
//       }else{
//         if(med !== undefined){
          
//         }
        
//         _.each(ficha.fichasFormula, function(f_i){
//           var med_i = Mediciones.findOne({fichaIndicadorId: f_i, periodoMedicionId: p, segmentoMedicion: segmento});
//           if(med_i !== undefined){
//             f.push(med_i.valorActual);      
//           }else{
            
//           }
          
//         });
        
//         if(!_.isEmpty(f)){
//           var valorFinal = eval(ficha.formula);
//           var med = ({'_id': 'Sin ID', fichaId:fichaId, valorActual: valorFinal, segmento:segmento});
//         }
        
       
//       }
      
      // OJO: si existe la medicion el medcionId va a ser de la tabla Mediciones
      // de lo contrario medcionId será el del periodo
      if(_.isUndefined(med)){
        valores.push({medicionId: p, fichaId:fichaId, texto: "S.D.", segmento:segmento});
      }else{
        if(tipoValor == "valor actual"){
          if(med.valorActual == Infinity){
            valores.push({medicionId: med._id, fichaId:fichaId, texto: "S.D.", segmento:segmento});   
          }else{
            valores.push({medicionId: med._id, fichaId:fichaId, texto: med.valorActual, segmento:segmento});   
          }
                
        }
        if(tipoValor == "meta"){
          if(med.metaActual == Infinity){
            valores.push({medicionId: med._id, fichaId:fichaId, texto: "S.D.", segmento:segmento});   
          }else{
            valores.push({medicionId: med._id, fichaId:fichaId, texto: med.metaActual, segmento:segmento});   
          }       
        }
        
      }
    });
    
    //var mediciones = Mediciones.find({periodoMedicionId: {$in: periodos}});
    
    return valores;
    
//     var med = Mediciones.find({fichaIndicadorId: fichaId,
//                                segmentoMedicion:segmento,
//                                }).fetch();
  }
 
});


Template.tablaDatos.events({
  "click .tbCell" : function(event){
    
   // Session.set('rendGraph',false);
    
    //dpId = $(event.target).attr("id");
     var dpIdString= $(event.target).attr('id');
     var fichaId = dpIdString.split('-')[0];
    var ficha = FichaIndicadores.findOne({'_id':fichaId});
    
    var name = $(event.target).attr("name");
    var val = $(event.target).attr("value");
    
    
    if(((fichaId !== undefined) && (_.isUndefined(ficha.formula))) || (name.indexOf("meta")> -1)){
      
    
    //console.log("clicked cell: " + dpId + ", name: " + name + ", text: " + val);
    if( (name.indexOf("valor") > -1) || (name.indexOf("meta")> -1)){
     // $(event.target).text(""); 
      $(event.target).append("<div><br><input  id=\""+dpIdString+"\" name =\""+name+"\" value=\""+val+"\" class=\"tbCellInput\"></input><br><i class=\"fa fa-check-circle-o fa-3x tbCellInputCheck\"></i> " +
                             "<i class=\"fa fa-times-circle-o fa-3x tbCellInputCancel\"></i>");                            
    }
    }
  },
  
  'click .tbCellInputCheck': function (e) {
     // e.preventDefault();
    
    var yVal= $(e.target).parent().find('input').val();
     var dpIdString= $(e.target).parent().find('input').attr('id');
    console.log('ID STRING: '+ dpIdString);
     var fichaId = dpIdString.split('-')[0];
    var dpId = dpIdString.split('-')[1]; 
     var segmento = dpIdString.split('-')[2];
      var oldVal= $(e.target).parent().find('input').attr('value');
    var variables= $(e.target).parent().find('input').attr('name');
    console.log("ENTER DATA!!! new value: " + yVal + " id: " + dpId + " oldVal: " + oldVal + " variables: " + variables);

    var med = Mediciones.findOne({'_id': dpId});
    var medExiste = null;
      if(_.isUndefined(med)){
        medExiste = false;
      }else{
        medExiste = true;
      }
    
    if(medExiste === false){
      if(variables.indexOf("valor") > -1){
        Mediciones.insert({
          fichaIndicadorId: fichaId,
          periodoMedicionId: dpId,
          userId:Meteor.users.findOne()._id,
          segmentoMedicion:segmento,
          valorActual: yVal,
          metaActual: Infinity,
          valorAnterior: Infinity,
          metaAnterior: Infinity,
          comentario: null
        }, function(err,id){medicionesFormulados(fichaId, dpId, segmento);}); 
      }else{
        Mediciones.insert({
          fichaIndicadorId: fichaId,
          periodoMedicionId: dpId,
          userId:Meteor.users.findOne()._id,
          segmentoMedicion:segmento,
          valorActual: Infinity,
          metaActual: yVal,
          valorAnterior: Infinity,
          metaAnterior: Infinity,
          comentario: null
        }, function(err,id){medicionesFormulados(fichaId, dpId, segmento);});
        
      }
      
    }else{
      if(oldVal == "S.D."){
        oldVal = Infinity
      }
      if(variables.split(' ')[0] == "valor"){
        var periodo = Mediciones.findOne({'_id': dpId}).periodoMedicionId;
        Mediciones.update({'_id':dpId},{$set:{valorActual: yVal, valorAnterior: oldVal}}, function(err,numRow){medicionesFormulados(fichaId, periodo, segmento);});
      }
    
       if(variables.split(' ')[0] == "meta"){
        Mediciones.update({'_id':dpId},{$set:{metaActual: yVal, metaAnterior: oldVal}});
      }
      
    }
    
    
  
//     Data.update({'_id':dpId},
//                 {$set:{"published.y":[yVal]}});
//     HistoryData.insert({kpiId: d.published.kpiId, dataId: dpId, newVal: yVal, oldVal: oldVal, changeDate: new Date(), type: d.published.type, xLabel: d.published.xLabel, year: d.published.year}); 
      $(e.target).parent().remove();
   // Session.set('supportEntryS', d.published.kpiId);
    
  },
  'click .tbCellInputCancel': function(e){
    
    var par = $(e.target).parent().remove();
    
  }
});