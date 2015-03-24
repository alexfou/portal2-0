Template.panelFicha.helpers({
  
    panelType: function(kpi){
//     monthSelected = parseInt(Session.get('monthFilter')) || 12;
//     yearSelected = parseInt(Session.get('yearFilter')) || 2014;
      var monthSelected = 10;
      var yearSelected = 2014;
      
      //var data = Mediciones.find().fetch();
      var periodo = PeriodosMedicion.findOne({$where: function(){
        return ((this.fechaReferencia.getUTCMonth() == monthSelected) && 
                (this.fechaReferencia.getUTCFullYear() == yearSelected));}});
      console.log('Periodo para panel: ' + periodo._id + "ficha: " + kpi._id);
      
      var data = Mediciones.findOne({$and: [{fichaIndicadorId:kpi._id},{periodoMedicionId: periodo._id}]});

    diff = data.valorActual - data.metaActual;
    diffPerc = diff/data.metaActual;
      console.log('Valor Actual: ' + data.valorActual + " - Meta Actual: " + data.metaActual);
    console.log("Difference with goal: " + kpi.nombre + " / "+diffPerc);
    var tendency = kpi.tendencia;
    console.log("Tendency: " + tendency);
    
    if(tendency == "incremental"){
      if (diffPerc >= -0.05){
        return "panel panel-success"
      } else if (diffPerc < -0.05 && diffPerc > -0.2){
        return "panel panel-warning"
      } else{
        return "panel panel-danger"
      }
    }
    
    if(tendency == "decremental"){
      if (diffPerc <= 0.05){
        return "panel panel-success"
      } else if (diffPerc > 0.05 && diffPerc < 0.2){
        return "panel panel-warning"
      } else{
        return "panel panel-danger"
      }
    }
      
      if(tendency == "neutral"){
        return "panel panel-default"
      }
    
  },
  
  arrowType: function(kpi){
//     monthSelected = parseInt(Session.get('monthFilter')) || 12;
//     prevMonth = monthSelected-1;
//     yearSelected = parseInt(Session.get('yearFilter')) || 2014;
//     yearSelectedPrev = yearSelected
    
    var monthSelected = 10;
    var prevMonth = monthSelected-1;
    var yearSelected = 2014;
    var yearSelectedPrev = 2014;
    
    if(prevMonth <0){
      prevMonth=11;
      yearSelectedPrev = yearSelected-1;
    }
//     var data = Data.find({"published.kpiId": kpi._id, 
//                           "published.year": yearSelected,
//                           "published.type": "value",
//                           "published.x": monthSelected}).fetch();
    var periodo = PeriodosMedicion.findOne({$where: function(){
        return ((this.fechaReferencia.getUTCMonth() == monthSelected) && 
                (this.fechaReferencia.getUTCFullYear() == yearSelected));}});
      
      var data = Mediciones.findOne({$and: [{fichaIndicadorId:kpi._id},{periodoMedicionId: periodo._id}]});
    
//     var dataLM = Data.find({"published.kpiId": kpi._id, 
//                           "published.year": yearSelectedPrev,
//                           "published.type": "value",
//                            "published.x": prevMonth}).fetch();
    
    var periodoLM = PeriodosMedicion.findOne({$where: function(){
        return ((this.fechaReferencia.getUTCMonth() == prevMonth) && 
                (this.fechaReferencia.getUTCFullYear() == yearSelectedPrev));}});
      
      var dataLM = Mediciones.findOne({$and: [{fichaIndicadorId:kpi._id},{periodoMedicionId: periodoLM._id}]});
    
    diff = data.valorActual - dataLM.valorActual;
    
    if (diff>0){
      return "fa fa-arrow-circle-up fa-5x";
    }else if(diff<0){
      return "fa fa-arrow-circle-down fa-5x";
    }else{
      return "fa fa-arrow-circle-right fa-5x";
    }
    
  },
  
  arrowColor: function(kpi){
//     monthSelected = parseInt(Session.get('monthFilter')) || 12;
//     prevMonth = monthSelected-1;
//     yearSelected = parseInt(Session.get('yearFilter')) || 2014;
//     yearSelectedPrev = yearSelected
    
    var monthSelected = 10;
    var prevMonth = monthSelected-1;
    var yearSelected = 2014;
    var yearSelectedPrev = 2014;
    
    if(prevMonth <0){
      prevMonth=11;
      yearSelectedPrev = yearSelected-1;
    }
//     var data = Data.find({"published.kpiId": kpi._id, 
//                           "published.year": yearSelected,
//                           "published.type": "value",
//                           "published.x": monthSelected}).fetch();
    
     var periodo = PeriodosMedicion.findOne({$where: function(){
        return ((this.fechaReferencia.getUTCMonth() == monthSelected) && 
                (this.fechaReferencia.getUTCFullYear() == yearSelected));}});
      
      var data = Mediciones.findOne({$and: [{fichaIndicadorId:kpi._id},{periodoMedicionId: periodo._id}]});
    
//     var dataLM = Data.find({"published.kpiId": kpi._id, 
//                           "published.year": yearSelectedPrev,
//                           "published.type": "value",
//                           "published.x": prevMonth}).fetch();
    
    var periodoLM = PeriodosMedicion.findOne({$where: function(){
        return ((this.fechaReferencia.getUTCMonth() == prevMonth) && 
                (this.fechaReferencia.getUTCFullYear() == yearSelectedPrev));}});
      
      var dataLM = Mediciones.findOne({$and: [{fichaIndicadorId:kpi._id},{periodoMedicionId: periodoLM._id}]});
    
    diff = data.valorActual - dataLM.valorActual;
     
    var tendency = kpi.tendencia;
    green = "color:#4BA74B";
    red = "color:#C8423E";
    gray = "color:#949494";
    
    if (diff>0 && tendency =="incremental"){
      return green;
    }else if(diff<0 && tendency =="incremental"){
      return red;
    }else if (diff>0 && tendency =="decremental"){
      return red;
    }else if(diff<0 && tendency =="decremental"){
      return green;
    }else{
      return gray;
    }
    
  },
  
   getValue: function(kpi){
//     monthSelected = parseInt(Session.get('monthFilter')) || 12;
//     yearSelected = parseInt(Session.get('yearFilter')) || 2014;
     var monthSelected = 10;
     var yearSelected = 2014;
    
//     var data = Data.find({"published.kpiId": kpi._id, 
//                           "published.year": yearSelected,
//                           "published.type": "value",
//                           "published.x": monthSelected}).fetch();
     
      var periodo = PeriodosMedicion.findOne({$where: function(){
        return ((this.fechaReferencia.getUTCMonth() == monthSelected) && 
                (this.fechaReferencia.getUTCFullYear() == yearSelected));}});
      
      var data = Mediciones.findOne({$and: [{fichaIndicadorId:kpi._id},{periodoMedicionId: periodo._id}]});
    
   // console.log("To find kpi: " + kpi._id + " : "+ data[0].published.y)
    return data.valorActual;
  },
  
  
});