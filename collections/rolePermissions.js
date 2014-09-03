RolePermissions = new Meteor.Collection("rolePermissions");

Schemas.RolePermissions = new SimpleSchema({
  routeUrl: {
    type: String,
    label: "RouteURL",
    max: 200
  },
  template: {
    type: String,
    label: "Template",
    max:200  
  },
  guiElement: {
    type: String,
    label: "GUIElement",
    max: 200
  },
  permittedRoles:{
    type:[String],
    label: "permittedRoles",
    max:1000
  }
});
  
RolePermissions.attachSchema(Schemas.RolePermissions);

RolePermissions.allow({
insert: function(userId, doc) {
// only allow posting if you are logged in
//return !! userId;
  return true;
},
  update: function(userId, doc) {
  return true;
},
  remove: function(userId, doc) {
    return true; 
}
});
