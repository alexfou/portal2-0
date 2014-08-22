Template.bookPage.helpers({
  editingDoc: function () {
    return Books.findOne({_id: this._id});
  }
});