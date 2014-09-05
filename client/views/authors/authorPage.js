Template.authorPage.helpers({
  editingDoc: function () {
    return Authors.findOne({_id: this._id});
  },
  
  authorOptions: function () {
    return Authors.find().map(function (a) {
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

Template.authorPage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
  "click #returnButton": function(){
    Router.go('authorsList');
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedAuthor', this);
    Authors.remove({'_id': this._id});
    Router.go("/authorsList")
  },
});

Template.authorsList.rendered = function(){
    Session.set("formType","disabled");
}

Template.authorsList.destroyed = function(){
    Session.set("formType","disabled");
}