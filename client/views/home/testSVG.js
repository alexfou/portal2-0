Template.testSVG.rendered = function () {
    var svg, width = 200, height = 200, x;
  var grupos =  this.data.groupBy;
  
  svg = d3.select("#"+this.data.svgName).append('svg')
      .attr('width', width)
      .attr('height', height);
  
  var svgb = svg.append("g")
       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  var drawDoughnut = function(update){
    
    
    
    var col = FichaIndicadores.find().fetch();
    var dataset = _.countBy(col,function(fi){
        var current=fi; 
        grupos.split('.').forEach(function(p){ current = current[p]; }); 
        return current;        
      }); 
      
      var datasetValues = _.values(dataset);
      var datasetKeys = _.keys(dataset);
      var datasetTotal = _.reduce(datasetValues, function(memo, num){ return memo + num; }, 0);
    
    var color = d3.scale.category20();
    var pie = d3.layout.pie().sort(null);

    var radius = Math.min(width, height) / 2;
      var arc = d3.svg.arc()
        .innerRadius(radius - 35)
        .outerRadius(radius - 10);
    
    var doughnuts = svgb.selectAll('path').data(pie(datasetValues), function(d){return Math.random();});
   // var numText = svgb.selectAll('text').data([datasetTotal], function(d){return d;});
     var numText = svgb.selectAll('text').data([datasetTotal], function(d){return d;});
    
    if ($("text").length > 0){
       update = true;
    }else{
      update=false;
    }
    

//     var path = svgb.selectAll("path")
//        .data(pie(datasetValues))
    console.log('VALUE UPDATE IN drawDoughnut: ' + update);
    if(!update){
      console.log('IN ADDED!!!!!!!!!!!!!11')
      doughnuts = doughnuts 
       .enter().append("path")
       .attr("fill", function(d, i) { 
         if (datasetTotal === 0){
           return "transparent";
         }else{
           return color(i); 
         }
       })
       .attr("d", arc)
       .on("click", function(d, i) {
              console.log("mousein")
              text = svgb.append("text")
                  .attr("transform", "translate(" + arc.centroid(d) + ")")
                  .attr("dy", ".5em")
                  .attr("font-size", "12px")
                  .style("text-anchor", "middle")
                  .attr("fill", "#2C3E4E")
                  .text(datasetKeys[i]);
       });
    
    //var dataTot = [datasetTotal];
    // svgb.selectAll("text").data(dataTot).enter().append("text").attr("x", 0)
      numText.enter().append("text").attr("x", 0)
                 .attr("y", 0)
                 .text(function(d){return d;})
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "40px")
                 .attr("text-anchor", "middle")
                 .attr("dominant-baseline", "central")
                 .attr("fill", "#2C3E4E");
      
      //numText = numText.exit().remove();
      //doughnuts = doughnuts.transition().duration(1000);
      //numText = numText.transition().duration(1000);
    
   
  }else{
    numText.enter().append("text").attr("x", 0)
                 .attr("y", 0)
                 .text(function(d){return d;})
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "40px")
                 .attr("text-anchor", "middle")
                 .attr("dominant-baseline", "central")
                 .attr("fill", "#2C3E4E");

    numText.exit().remove();
    
    doughnuts 
       .enter().append("path")
       .attr("fill", function(d, i) { 
         if (datasetTotal === 0){
           return "transparent";
         }else{
           return color(i); 
         }
       })
       .attr("d", arc)
       .on("click", function(d, i) {
              console.log("mousein")
              text = svgb.append("text")
                  .attr("transform", "translate(" + arc.centroid(d) + ")")
                  .attr("dy", ".5em")
                  .attr("font-size", "12px")
                  .style("text-anchor", "middle")
                  .attr("fill", "#2C3E4E")
                  .text(datasetKeys[i]);
       });
    
    doughnuts.exit().remove();
    
    
  }
  }
  
  FichaIndicadores.find().observe({
      added: function () {  //added is for initialization
        drawDoughnut(false);
      },
      //changed: _.partial(drawCircles, true)
    changed: _.partial(drawDoughnut,true)
    });
  
};