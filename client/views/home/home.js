Template.home.rendered = function(){
  
  var self = this;
  self.node = self.find("svg");
  

  if (! self.handle) {
    self.handle = Deps.autorun(function () {
      var authors = Authors.find().fetch();
      var svg =  d3.select("#authorsGraph");
      
// var dataset = {
//   apples: [53245, 28479, 19697, 24037, 40245],
// };
     var dataset = _.countBy(authors,function(customer){return customer.birthCountry;}); 
     var datasetValues = _.values(dataset);
      var datasetKeys = _.keys(dataset);

var width = 200,
    height = 200,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 35)
    .outerRadius(radius - 10);

 var svg2 = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg2.selectAll("path")
    .data(pie(datasetValues))
    .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc)
    .on("mouseover", function(d, i) {
              //console.log("mousein")
              text = svg2.append("text")
                  .attr("transform", "translate(" + arc.centroid(d) + ")")
                  .attr("dy", ".5em")
                  .style("text-anchor", "middle")
                  .style("fill", "blue")
                  .attr("class", "on")
                  .text(datasetKeys[i]);
      });
    
       svg2.append("text").attr("x", 0)
                 .attr("y", 0)
                 .text("42")
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "40px")
                 .attr("text-anchor", "middle")
                 .attr("dominant-baseline", "central")
                 .attr("fill", "#2C3E4E");
      
      
      
    });
    
   
  }
}
                               