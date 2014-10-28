Template.tableroPage.helpers({
  editingDoc: function () {
    return Tableros.findOne({_id: this._id});
  },
  
  tableroOptions: function () {
    return Tableros.find().map(function (a) {
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

Template.tableroPage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
  "click #returnButton": function(){
    Router.go('tablerosList');
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedTablero', this);
    Tableros.remove({'_id': this._id});
    Router.go("/tablerosList")
  },
});

Template.tablerosList.rendered = function(){
    Session.set("formType","disabled");
}

Template.tablerosList.destroyed = function(){
    Session.set("formType","disabled");
}