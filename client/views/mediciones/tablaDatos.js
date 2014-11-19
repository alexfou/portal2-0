Template.tablaDatos.helpers({
  getMediciones: function(fichaId, segmento){
    return Mediciones.find({fichaIndicadorId: fichaId, segmentoMedicion:segmento}).fetch();
  },
  
  dataPoints: function(fichaId, segmento, tipoValor, anio){
    var periodos = [];
    var valores = [];
    var periodosTotales = PeriodosMedicion.find().fetch();
    
    _.each(periodosTotales, function(p){
      if(p.fechaReferencia.getUTCFullYear() == anio){
        periodos.push(p._id);
      }  
    });
    
    _.each(periodos, function(p){
      //valores.push("S.D.") ;
      var med = Mediciones.findOne({fichaIndicadorId: fichaId, periodoMedicionId: p, segmentoMedicion: segmento});
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
    
    dpId = $(event.target).attr("id");
    if(dpId !== undefined){
      
    name = $(event.target).attr("name");
    val = $(event.target).attr("value");
    console.log("clicked cell: " + dpId + ", name: " + name + ", text: " + val);
    if( (name.indexOf("valor") > -1) || (name.indexOf("meta")> -1)){
     // $(event.target).text(""); 
      $(event.target).append("<div><br><input  id=\""+dpId+"\" name =\""+name+"\" value=\""+val+"\" class=\"tbCellInput\"></input><br><i class=\"fa fa-check-circle-o fa-3x tbCellInputCheck\"></i> " +
                             "<i class=\"fa fa-times-circle-o fa-3x tbCellInputCancel\"></i>");                            
    }
    }
  },
  
  'click .tbCellInputCheck': function (e) {
     // e.preventDefault();
    
    var yVal= $(e.target).parent().find('input').val();
     var dpIdString= $(e.target).parent().find('input').attr('id');
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
        }); 
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
        });
        
      }
      
    }else{
      if(oldVal == "S.D."){
        oldVal = Infinity
      }
      if(variables.split(' ')[0] == "valor"){
        Mediciones.update({'_id':dpId},{$set:{valorActual: yVal, valorAnterior: oldVal}});
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