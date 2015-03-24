Template.donutGraph.rendered = function () {
  var dbCursor = this.data.collCursor;
  var svg, width = 200, height = 200;
  var grupos =  this.data.groupBy;
  var svgName =  this.data.svgName;
  
  svg = d3.select("#"+svgName).append('svg')
      .attr('width', width)
      .attr('height', height);
  
  var svgb = svg.append("g")
       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  
 
  var drawDonut = function(update){
    var col = dbCursor.fetch();
    
   // console.log(svgName + "VALUES LENGTH COL: " + col.length)
    var dataset = [{"Sin registros":0}];
      var datasetValues = ["100"];
      var datasetKeys = ["Sin registros"];
      var datasetTotal = 0;
    if(col.length !== 0){
     dataset = _.countBy(col,function(fi){
        var current=fi; 
        grupos.split('.').forEach(function(p){ current = current[p]; }); 
        return current;        
      }); 
      
       datasetValues = _.values(dataset);
       datasetKeys = _.keys(dataset);
       datasetTotal = _.reduce(datasetValues, function(memo, num){ return memo + num; }, 0);
    }
    
    var color = d3.scale.category20();
    var pie = d3.layout.pie().sort(null);

    var radius = Math.min(width, height) / 2;
      var arc = d3.svg.arc()
        .innerRadius(radius - 35)
        .outerRadius(radius - 10);
    
   // console.log('DATASET VALUES: ' + datasetValues);
    var donuts = svgb.selectAll('path').data(pie(datasetValues), function(d){return Math.random();});
   // var numText = svgb.selectAll('text').data([datasetTotal], function(d){return d;});
     var numText = svgb.selectAll('text').data([datasetTotal], function(d){return d;});
    
    if ($("text").length > 0){
       update = true;
    }else{
      update=false;
    }
    

//     var path = svgb.selectAll("path")
//        .data(pie(datasetValues))
   // console.log('VALUE UPDATE IN drawDoughnut: ' + update);
    if(!update){
      console.log('IN ADDED!!!!!!!!!!!!!11')
      donuts.enter().append("path")
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
    
    donuts 
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
    
    donuts.exit().remove();   
  }
  }
  
  //console.log(svgName +  ': LENGTH IN dbCursor,col: ' + dbCursor.fetch().length);
  if(dbCursor.fetch().length === 0){
    drawDonut(false);
  }
  
  //var dbCursor = this.data.collectionCursor;
  //var dbCursor = FichaIndicadores.find();
  
  dbCursor.observe({
      added: function () {  //added is for initialization
        //console.log("-----------------DBCURSOR ADDED");
        drawDonut(false);
      },
      //changed: _.partial(drawCircles, true)
    changed: function() {
      // console.log("-----------------DBCURSOR CHANGED");
       drawDonut(true);
    },
    removed: function () {
      // console.log("-----------------DBCURSOR REMOVED");
       drawDonut(true);
    }
    });
  
};