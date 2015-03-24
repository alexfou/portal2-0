Template.graficaBarras.rendered = function(){
  
  var fichaId = this.data.idFicha;
  var segmento = this.data.segmento;
  var anio = this.data.anio;
  console.log('INSIDE DASHBOARD RENDERED - this is: ' +  fichaId + "/" + segmento + "/"+anio);
  
  var self = this;
  self.node = self.find("svg");
  
  var periodos = [];
    var valores = [];
    var periodosTotales = PeriodosMedicion.find().fetch();
//     var valoresActuales = [];
//     var metasActuales = [];
  
  var svg =  d3.select("#a-"+fichaId+"-"+segmento);
  
  var drawBarsGraph = function(){
    
    //console.log('UPDATE VALUE: ' + update);
//      var points = Mediciones.find({"published.kpiId": kpiId, "published.year":2014, "published.type":"value"}).fetch();
//      var pointsLY = Data.find({"published.kpiId": kpiId, "published.year":2013, "published.type":"value"}).fetch();
//      var pointsG = Data.find({"published.kpiId": kpiId, "published.year":2014, "published.type":"goal"}).fetch();
    
    var periodos = [];
    var valores = [];
//     var periodosTotales = PeriodosMedicion.find().fetch();
    var valoresActuales = [];
    var metasActuales = [];
    
    _.each(periodosTotales, function(p){
      if(p.fechaReferencia.getUTCFullYear() == anio){
        periodos.push({'_id':p._id, fechaReferencia: p.fechaReferencia});
      }  
    });
    
//     console.log('COUNT Periodos Totales: ' + periodosTotales.length);
//     console.log('COUNT Periodos : ' + periodos.length);
    
    _.each(periodos, function(p){
      var med = Mediciones.findOne({fichaIndicadorId: fichaId, periodoMedicionId: p._id, segmentoMedicion: segmento});   
      if(_.isUndefined(med)){
       // valores.push({medicionId: p, fichaId:fichaId, texto: "S.D.", segmento:segmento});
      }else{
        if(med.valorActual != Infinity){
          var f = p.fechaReferencia.getUTCMonth();
          valoresActuales.push({'_id': med._id+"valor", valor: med.valorActual, posicion: f});   
        }
        if(med.metaActual != Infinity){
          var f = p.fechaReferencia.getUTCMonth();
          metasActuales.push({'_id': med._id+"meta", valor: med.metaActual, posicion: f});          
        }        
      }
    });
    
   // console.log('COUNT Metas Actuales: ' + metasActuales.length);
    
//     _.each(metasActuales, function(m){
//       console.log('Metas Actuales: ' + m._id)
//     })
    
    var fontSize = "13px";
      if(d3.select("#a-"+fichaId+"-"+segmento).style("width").replace("px", "") > 500){
        svg.style("width", 750);
        svg.style("height", 400);
      }else{
        svg.style("width", 300);
        svg.style("height", 160);
        fontSize = "8px";
      }
    
    padding = 30;
        w = svg.style("width").replace("px", "");
        h = svg.style("height").replace("px", "");
    
    var xScale = d3.scale.ordinal()
      .domain(d3.range(12))
      .rangeRoundBands([0, w - padding], 0.05);
    
    var yScale = d3.scale.linear()
      .domain([0,d3.max(valoresActuales, function(d) { return parseFloat(d.valor); })*1.25])
      .range([h - padding, 0 + padding]);
    
    var updateBars = function (group) {
        group.attr("id", function (point) { return point._id; })
        .attr("x", function(d, i) {
         // return i * (w / points.length);
          //return xScale(i) + padding;
          return xScale(d.posicion) + padding;
        })
        .attr("y", function(d) {
          //return h - d.y*15; //Height minus data value
          //return h - yScale(d.y) - padding;
          return yScale(d.valor);
        })
        .attr("height", function(d){
          //return d.y * 15;
          return h - yScale(d.valor) - padding;
        })
        //.attr("width", w / points.length - barPadding)
        .attr("width", xScale.rangeBand())
        //.attr("fill", "#428BCA
        .attr("fill", "#3498db");
      };
    
    var bars = d3.select("#a-"+fichaId+"-"+segmento).select(".bars").selectAll("rect")
        .data(valoresActuales, function (point) { return point._id; });

      updateBars(bars.enter().append("rect"));
      updateBars(bars.transition().duration(250).ease("cubic-out"));
      bars.exit().transition().duration(100).attr("r", 0).remove();
    
    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");
      //.ticks(5);
      d3.select("#axis-"+fichaId+"-"+segmento).remove();
       //Create y-axis
      d3.select("#a-"+fichaId+"-"+segmento).append("g")
        .attr("class", "axis") // <-- Note y added here
        .attr("id", "axis-" + fichaId+"-"+segmento)
        .attr("font-size", fontSize)
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);
    
    var xAxis = d3.svg.axis()
        .scale(xScale)
      .tickValues(['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'])
        .orient("bottom");
       d3.select("#x-axis-" +fichaId+"-"+segmento).remove();
       //Create y-axis
       svg.append("g")
        .attr("class", "axis") // <-- Note y added here
        .attr("id", "x-axis-"+fichaId+"-"+segmento)
        .attr("font-size", fontSize)
        .attr("transform", "translate(" + padding + ","+yScale(0)+")")
        .call(xAxis);
    
     var line = d3.svg.line()
        .x(function(d,i) { return (xScale(d.posicion) + padding + xScale.rangeBand()/2); })
        .y(function(d) { return (yScale(d.valor)); });
        //.transition().duration(250).ease("cubic-out");
      
     // var lines = d3.select("#line-"+kpiId);
     // var lines = $( "#line-"+fichaId+"-"+segmento); 
     // console.log('found lineID? ' + lines.length);
      
      d3.select("#lineLY-"+fichaId+"-"+segmento).remove();
      svg.append("g")
        .attr("id", "lineLY-"+fichaId+"-"+segmento)
        .attr("class", "lineLY")
        .append("path")
        .datum(metasActuales)
        .attr("d", line)
        .transition()
        .duration(5000)
        .ease("linear");
    
    
    
  }; //drawBarsGraph
  
  //drawBarsGraph();
//   var medCursor = Mediciones.find({fichaIndicadorId:fichaId, segmentoMedicion: segmento});
  
//   medCursor.observe({
//       added: function () {  //added is for initialization
//         //console.log("-----------------DBCURSOR ADDED");
//         drawBarsGraph(false);
//       },
//       //changed: _.partial(drawCircles, true)
//     changed: function() {
//        //console.log("-----------------DBCURSOR CHANGED");
//       drawBarsGraph(true);
//     },
//     removed: function () {
//        //console.log("-----------------DBCURSOR REMOVED");
//       drawBarsGraph(true);
//     }
//     });
  
  Tracker.autorun(function () {
    var medCursor = Mediciones.find({fichaIndicadorId:fichaId, segmentoMedicion: segmento}).fetch();
    //console.log('TRACKER: ');
    drawBarsGraph();
  });
  

};

Template.graficaBarras.destroyed = function () {
  this.handle && this.handle.stop();
};