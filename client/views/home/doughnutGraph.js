Template.doughnutGraph.rendered = function(){
  
  var self = this;
  self.node = self.find("svg");
  
  var col = this.data.collection;      
  var svg =  d3.select("#"+this.data.svgName);
  var grupos =  this.data.groupBy;
  
  console.log('INSIDE Template.doughnutGraph.rendered: ' + col + "-" + svg + "-" + grupos);
  if (! self.handle) {
    self.handle = Deps.autorun(function () {
          
     // var dataset = _.countBy(col,function(fi){return fi[grupos];}); 
      var dataset = _.countBy(col,function(fi){
        var current=fi; 
        grupos.split('.').forEach(function(p){ current = current[p]; }); 
        return current;        
      }); 
      
      var datasetValues = _.values(dataset);
      var datasetKeys = _.keys(dataset);
      var datasetTotal = _.reduce(datasetValues, function(memo, num){ return memo + num; }, 0);
      
       drawDoughnut(svg, datasetValues, datasetKeys, datasetTotal);  
        
    });
    
  }
}

drawDoughnut = function(svg, datasetValues, datasetKeys, datasetTotal) {
  
  var width = svg.attr('width');
      var height = svg.attr('height');
      var radius = Math.min(width, height) / 2;
      
      var color = d3.scale.category20();

      var pie = d3.layout.pie().sort(null);

      var arc = d3.svg.arc()
        .innerRadius(radius - 35)
        .outerRadius(radius - 10);

      var svgb = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  if(datasetTotal === 0){datasetValues = ["9"];}

      var path = svgb.selectAll("path")
       .data(pie(datasetValues))
       .enter().append("path")
       .attr("fill", function(d, i) { 
         if (datasetTotal === 0){
           return "transparent";
         }else{
           return color(i); 
         }
       })
      .attr("stroke", function(d, i) {
        if (datasetTotal === 0){
           return "#a4a4aa";
         }else{
           return ""; 
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
    
       svgb.append("text").attr("x", 0)
                 .attr("y", 0)
                 .text(datasetTotal)
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "40px")
                 .attr("text-anchor", "middle")
                 .attr("dominant-baseline", "central")
                 .attr("fill", "#2C3E4E");
  
};