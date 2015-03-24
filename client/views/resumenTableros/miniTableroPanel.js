Template.miniTableroPanel.events({
  
  'click .miniTablero': function(){
    console.log('clickedTablero' + this._id);
    Router.go('/resumenTableroPage/'+this._id);
  }
  
});