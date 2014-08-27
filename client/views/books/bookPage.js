Template.bookPage.helpers({
  editingDoc: function () {
    return Books.findOne({_id: this._id});
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

Template.bookPage.events({
  "click #editButton" : function(event){   
    Session.set('formType', "update");
  },
  
  "click #cancelButton" : function(event){   
    Session.set('formType', "disabled");
  },
  
  "click #deleteButton" : function(event){
    Session.set('lastDeletedBook', this);
    Books.remove({'_id': this._id});
    Router.go("/booksList")
  },
});

Template.booksList.rendered = function(){
    Session.set("formType","disabled");
}

Template.booksList.destroyed = function(){
    Session.set("formType","disabled");
}