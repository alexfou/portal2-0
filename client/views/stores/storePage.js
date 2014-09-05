Template.storePage.helpers({
  editingDoc: function () {
    return Stores.findOne({_id: this._id});
  },
  
  storeOptions: function () {
    return Stores.find().map(function (a) {
      return {label: a.name, value: a._id};
    });
  },
  
  formType: function(t){
    var ft = Session.get('formType');
    if((ft === undefined || ft === false || ft === null) && (t == "disabled")){
      return true;
    }
    if((ft === undefined || ft === false || ft === null) && (t == "update")){
      return false;
    }  
    if((ft == "update") && (t == "update")){
      return true;
    }
    if((ft == "disabled") && (t == "disabled")){
      return true;
    } 
  }
});

Template.storePage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
  "click #returnButton": function(){
    Router.go('storesList');
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedStore', this);
    Stores.remove({'_id': this._id});
    Router.go("/storesList")
  },
});

Template.storesList.rendered = function(){
    Session.set("formType","disabled");
}

Template.storesList.destroyed = function(){
    Session.set("formType","disabled");
}