Meteor.publish('fichaIndicadores', function() {
  //var uVersiones = FichaIndicadores.find({ultimaVersion:true, eliminacion: {$ne: null }});
  return FichaIndicadores.find({ultimaVersion:true, eliminacion:{$in:[null]}});
   //return uVersiones;
 // return FichaIndicadores.find({ultimaVersion:true});
});

Meteor.publish('fichaIndicadoresResponsable', function() {
  
  if (this.userId) {
    var userId = this.userId;
    console.log('User ID: ' + this.userId);
     var fichasId = AsignacionesUsuarioIndicador.find({userId:userId}).fetch();
    fichasId = _.countBy(fichasId, "fichaIndicadorId");
    fichasId = _.keys(fichasId);
    return FichaIndicadores.find({_id:{$in: fichasId}});
    
  } else {
    return null;
  }
 
   //return uVersiones;
 // return FichaIndicadores.find({ultimaVersion:true});
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

Meteor.publish('tableros', function() {
return Tableros.find();
});

Meteor.publish('gruposTableros', function() {
return GruposTableros.find();
});

Meteor.publish('asignacionesAtributoNormativoIndicador', function() {
return AsignacionesAtributoNormativoIndicador.find();
});

Meteor.publish('asignacionesGrupoIndicador', function() {
return AsignacionesGrupoIndicador.find();
});

Meteor.publish('asignacionesUsuarioIndicador', function() {
return AsignacionesUsuarioIndicador.find();
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
