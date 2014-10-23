Meteor.publish('fichaIndicadores', function() {
return FichaIndicadores.find();
});

Meteor.publish('procesos', function() {
return Procesos.find();
});

Meteor.publish('fuentes', function() {
return Fuentes.find();
});

Meteor.publish('unidadesMedicion', function() {
return UnidadesMedicion.find();
});

Meteor.publish('atributosNormativos', function() {
return AtributosNormativos.find();
});

Meteor.publish('normas', function() {
return Normas.find();
});

Meteor.publish('entidadesReguladoras', function() {
return EntidadesReguladoras.find();
});

Meteor.publish('asignacionesAtributoNormativoIndicador', function() {
return AsignacionesAtributoNormativoIndicador.find();
});

Meteor.publish('books', function() {
return Books.find();
});

Meteor.publish('authors', function() {
return Authors.find();
});

Meteor.publish('stores', function() {
return Stores.find();
});

//this is for the roles package to be available without subscribes to every client
Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
})

Meteor.publish('currentUserLogged', function (){ 
  if (this.userId) {
    return Meteor.users.find(
      {_id: this.userId},
      {fields: {profile: 1, username: 1, emails: 1}});
  } else {
    return null;
  }
});

Meteor.publish('rolePermissions', function() {
return RolePermissions.find({});
});

Meteor.publish("usersList", function() {

    var user = Meteor.users.findOne({
        _id: this.userId
    });


    if (Roles.userIsInRole(user, ["admin"])) {
        return Meteor.users.find({}, {
            fields: {
                emails: 1,
                roles: 1,
              profile: 1
            }
        });
    }
    this.stop();
    return;
});
