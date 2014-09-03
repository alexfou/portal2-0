Template.home.rendered = function(){
  
  var self = this;
  self.node = self.find("svg");
  

  if (! self.handle) {
    self.handle = Deps.autorun(function () {
      var authors = Authors.find().fetch();
      var books = Books.find().fetch();
      var stores = Stores.find().fetch();
      var svg =  d3.select("#authorsGraph");
      var svg2 =  d3.select("#booksGraph");
      var svg3 =  d3.select("#storesGraph");
      
      var width = 200;
      var height = 200;
    var radius = Math.min(width, height) / 2;
      
// var dataset = {
//   apples: [53245, 28479, 19697, 24037, 40245],
// };
     var dataset = _.countBy(authors,function(author){return author.birthCountry;}); 
     var datasetValues = _.values(dataset);
     var datasetKeys = _.keys(dataset);
      var datasetTotal = _.reduce(datasetValues, function(memo, num){ return memo + num; }, 0);
      
      var dataset2 = _.countBy(books,function(book){return book.mediaType;}); 
     var datasetValues2 = _.values(dataset2);
     var datasetKeys2 = _.keys(dataset2);
      var datasetTotal2 = _.reduce(datasetValues2, function(memo, num){ return memo + num; }, 0);
      
      var dataset3 = _.countBy(stores,function(store){return store.type;}); 
     var datasetValues3 = _.values(dataset3);
     var datasetKeys3 = _.keys(dataset3);
      var datasetTotal3 = _.reduce(datasetValues3, function(memo, num){ return memo + num; }, 0);

      

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 35)
    .outerRadius(radius - 10);

 svgb = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svgb.selectAll("path")
    .data(pie(datasetValues))
    .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc)
    .on("click", function(d, i) {
              //console.log("mousein")
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
      
      //////////////////////////////
      
      var svg2b = svg2
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 svg2b.selectAll("path")
    .data(pie(datasetValues2))
    .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc)
    .on("click", function(d, i) {
              //console.log("mousein")
              text = svg2b.append("text")
                  .attr("transform", "translate(" + arc.centroid(d) + ")")
                  .attr("dy", ".5em")
                  .attr("font-size", "12px")
                  .style("text-anchor", "middle")
                  .attr("fill", "#2C3E4E")
                  .text(datasetKeys2[i]);
      });
    
       svg2b.append("text").attr("x", 0)
                 .attr("y", 0)
                 .text(datasetTotal2)
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "40px")
                 .attr("text-anchor", "middle")
                 .attr("dominant-baseline", "central")
                 .attr("fill", "#2C3E4E");
      
//       var legend = svg.selectAll(".legend")
//         .data(datasetKeys)
//         .enter().append("g")
//         .attr("class", "legend")
//         .attr("transform", function (d, i) {
//           return "translate(0," + i * 20 + ")";
//         });

// legend.append("rect")
//     .attr("x", width - 18)
//     .attr("width", 18)
//     .attr("height", 18)
//     .style("fill", function(d, i) { return color(i); });

// legend.append("text")
//     .attr("x", width - 24)
//     .attr("y", 9)
//     .attr("dy", ".35em")
//     .style("text-anchor", "end")
//     .text(function (d) {
//     return d;
// });
      
      
      var svg3b = svg3
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 svg3b.selectAll("path")
    .data(pie(datasetValues3))
    .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc)
    .on("click", function(d, i) {
              //console.log("mousein")
              text = svg3b.append("text")
                  .attr("transform", "translate(" + arc.centroid(d) + ")")
                  .attr("dy", ".5em")
                  .attr("font-size", "12px")
                  .style("text-anchor", "middle")
                  .attr("fill", "#2C3E4E")
                  .text(datasetKeys3[i]);
      });
    
       svg3b.append("text").attr("x", 0)
                 .attr("y", 0)
                 .text(datasetTotal3)
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "40px")
                 .attr("text-anchor", "middle")
                 .attr("dominant-baseline", "central")
                 .attr("fill", "#2C3E4E");
      
      
    });
    
   
  }
}

Template.home.helpers({
  checkGUIAccess: function(r){
    console.log("ROUTER URL: " + Router.current().path);
    console.log('TEMPLATE NAME: ' + r.hash.template);
    console.log('GUI ELEMENT: ' + r.hash.guiElement);
    
//     var temp = [{routeURL: "/home", template:"home", guiElement: "homeBooksMeter", permittedRoles: ["admin","crud-books"]},
//                {routeURL: "/home", template:"home", guiElement: "homeAuthorsMeter", permittedRoles: ["admin","crud-authors"]},
//                {routeURL: "/home", template:"home", guiElement: "homeStoresMeter", permittedRoles: ["admin","crud-stores"]}];
    
    temp = RolePermissions.find().fetch();
    console.log('Lenght of Permissions: ' +temp.length);
    
    var roles = _.findWhere(temp, {routeUrl:Router.current().path, template:r.hash.template, guiElement:r.hash.guiElement});
    
    console.log('Permitted roles' + roles.permittedRoles);
    
    //var grants = _.values(_.pick(temp,r.hash.guiElement));
    var userRoles = Meteor.user().roles;
    var intersection = _.intersection(roles.permittedRoles, userRoles);
   // console.log("check var: " + _.isArray(grants) + "and roles: " + _.isArray(userRoles) + " intersection: " + intersection);
    if(_.isEmpty(intersection)){
       return false;
    }else{
      return true;
    }
  }
});
                               