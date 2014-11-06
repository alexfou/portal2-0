Router.configure({
  layoutTemplate: 'navBarTop',
  loadingTemplate: 'loading'
});

Router.map(function() {
  
  this.route('signIn', {
    path: '/signIn',
  });
  
//   this.route('signOut', {
//     path: '/signOut',
//     onBeforeAction: function(pause){
      
//      // this.redirect('/portalFace');
//       //pause();
//     }
//   });
  
  this.route('deniedAccess', {
    path: '/deniedAccess',
  });
   
  this.route('portalFace', {
    path: '/',
  });
  
  this.route('home', {
    path: '/home',
    waitOn: function() { 
      var userRoles = Meteor.user().roles;
      var intersection = _.intersection(['admin'], userRoles);
      if(_.isEmpty(intersection)){
       return Meteor.subscribe('fichaIndicadoresResponsable');
      }else{
        return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('rolePermissions'), Meteor.subscribe('procesos'),
              Meteor.subscribe('fichaIndicadores'), Meteor.subscribe('fuentes'), Meteor.subscribe('unidadesMedicion'), Meteor.subscribe('atributosNormativos'), Meteor.subscribe('entidadesReguladoras'), Meteor.subscribe('normas'), Meteor.subscribe('usersList'), Meteor.subscribe('tableros'), Meteor.subscribe('gruposTableros')];;
      }
      
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-books','crud-authors','crud-stores','noAdmin'])
    }
  });
  
  
  this.route('rolePermissionsList', {
    path: '/rolePermissionsList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('rolePermissions')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
  });
  
  this.route('rolePermissionInsert', {
    path: '/rolePermissionInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
  });
  
  this.route('rolePermissionPage', {
    path: '/rolePermission/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('rolePermissions')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
    data: function() { return RolePermissions.findOne(this.params._id); }
  });
  
  this.route('userInsert', {
    path: '/userInsert',
     waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
  });
  
  
  this.route('usersList', {
    path: '/usersList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('usersList')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
  });
  
  this.route('userPage', {
    path: '/user/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('usersList')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin'])
    },
    data: function() { return Meteor.users.findOne(this.params._id); }
  });
  
////////// fichaIndicadores ///////////////////////////////////////////////////////////////////
   this.route('fichaIndicadoresList', {
    path: '/fichaIndicadoresList',
    waitOn:function() { 
      var userRoles = Meteor.user().roles;
      var intersection = _.intersection(['admin'], userRoles);
      if(_.isEmpty(intersection)){
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('fichaIndicadoresResponsable'),                                     Meteor.subscribe('procesos')];
      }else{ 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('fichaIndicadores'),                                     Meteor.subscribe('procesos')];
    }
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'noAdmin'])
    },
  });
  
  this.route('fichaIndicadorInsert', {
    path: '/fichaIndicadorInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'),Meteor.subscribe('procesos'), Meteor.subscribe('fuentes'), Meteor.subscribe('unidadesMedicion'), Meteor.subscribe('atributosNormativos'), Meteor.subscribe('usersList'), Meteor.subscribe('gruposTableros')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'noAdmin', 'crud-fichaIndicadores'])
    }
  });
  
  this.route('fichaIndicadorPage', {
    path: '/fichaIndicador/:_id',
    waitOn: function() { 
      var subscriptions = [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('procesos'),     Meteor.subscribe('fuentes'),Meteor.subscribe('unidadesMedicion'),Meteor.subscribe('atributosNormativos'), Meteor.subscribe('asignacionesAtributoNormativoIndicador'), Meteor.subscribe('asignacionesUsuarioIndicador'),Meteor.subscribe('asignacionesGrupoIndicador'),Meteor.subscribe('gruposTableros')];
 
      var userRoles = Meteor.user().roles;
      var intersection = _.intersection(['admin'], userRoles);
      if(_.isEmpty(intersection)){
        subscriptions.push( Meteor.subscribe('fichaIndicadoresResponsable'));
      return subscriptions;
      }else{ 
        subscriptions.push( Meteor.subscribe('fichaIndicadores'));
      subscriptions.push( Meteor.subscribe('usersList'));
      return subscriptions;
    }
      
//       return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('fichaIndicadores'), Meteor.subscribe('procesos'), Meteor.subscribe('fuentes'),Meteor.subscribe('unidadesMedicion'),Meteor.subscribe('atributosNormativos'), Meteor.subscribe('asignacionesAtributoNormativoIndicador'), Meteor.subscribe('asignacionesUsuarioIndicador'),Meteor.subscribe('asignacionesGrupoIndicador'),Meteor.subscribe('gruposTableros'),
//              Meteor.subscribe('usersList')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'noAdmin', 'crud-fichaIndicadores'])
    },
    data: function() { return FichaIndicadores.findOne(this.params._id); }
  });
  
    
////////// procesos ///////////////////////////////////////////////////////////////////
   this.route('procesosList', {
    path: '/procesosList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('procesos')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-procesos'])
    },
  });
  
  this.route('procesoInsert', {
    path: '/procesoInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'),Meteor.subscribe('procesos')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-procesos'])
    }
  });
  
  this.route('procesoPage', {
    path: '/proceso/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('procesos')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-procesos'])
    },
    data: function() { return Procesos.findOne(this.params._id); }
  });
  
////////// fuentes ///////////////////////////////////////////////////////////////////
   this.route('fuentesList', {
    path: '/fuentesList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('fuentes')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-fuentes'])
    },
  }); 
  
   this.route('fuenteInsert', {
    path: '/fuenteInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'),Meteor.subscribe('fuentes')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-fuentes'])
    }
  });
  
  this.route('fuentePage', {
    path: '/fuente/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('fuentes')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-fuentes'])
    },
    data: function() { return Fuentes.findOne(this.params._id); }
  });
  
////////// unidades medicion ///////////////////////////////////////////////////////////////////
   this.route('unidadesMedicionList', {
    path: '/unidadesMedicionList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('unidadesMedicion')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-unidadesMedicion'])
    },
  }); 
  
  this.route('unidadMedicionInsert', {
    path: '/unidadMedicionInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'),Meteor.subscribe('unidadesMedicion')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-unidadesMedicion'])
    }
  });
  
   this.route('unidadMedicionPage', {
    path: '/unidadMedicion/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('unidadesMedicion')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-unidadesMedicion'])
    },
    data: function() { return UnidadesMedicion.findOne(this.params._id); }
  });
  
////////// atributos normativos ///////////////////////////////////////////////////////////////////
   this.route('atributosNormativosList', {
    path: '/atributosNormativosList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('atributosNormativos')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-atributosNormativos'])
    },
  }); 
  
   this.route('atributoNormativoInsert', {
    path: '/atributoNormativoInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('normas')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-atrubutosNormativos'])
    }
  });
  
  this.route('atributoNormativoPage', {
    path: '/atributoNormativo/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('atributosNormativos'), Meteor.subscribe('normas')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-atributosNormativos'])
    },
    data: function() { return AtributosNormativos.findOne(this.params._id); }
  });


//////////  entidades reguladoras ///////////////////////////////////////////////////////////////////
   this.route('entidadesReguladorasList', {
    path: '/entidadesReguladorasList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('entidadesReguladoras')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-entidadesReguladoras'])
    },
  }); 
  
   this.route('entidadReguladoraInsert', {
    path: '/entidadReguladoraInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-entidadesReguladoras'])
    }
  });
  
  this.route('entidadReguladoraPage', {
    path: '/entidadReguladora/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('entidadesReguladoras')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-entidadesReguladoras'])
    },
    data: function() { return EntidadesReguladoras.findOne(this.params._id); }
   });
  
    

//////////  normas  ///////////////////////////////////////////////////////////////////
   this.route('normasList', {
    path: '/normasList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('normas')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-normas'])
    },
  }); 
  
   this.route('normaInsert', {
    path: '/normaInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('entidadesReguladoras')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-normas'])
    }
  });
  
  this.route('normaPage', {
    path: '/norma/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('normas'),  Meteor.subscribe('entidadesReguladoras')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-normas'])
    },
    data: function() { return Normas.findOne(this.params._id); }
  });
  
////////// tableros ///////////////////////////////////////////////////////////////////
   this.route('tablerosList', {
    path: '/tablerosList',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('tableros')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-tableros'])
    },
  });
  
  this.route('tableroInsert', {
    path: '/tableroInsert',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-tableros'])
    }
  });
  
  this.route('tableroPage', {
    path: '/tablero/:_id',
    waitOn: function() { 
      return [Meteor.subscribe('currentUserLogged'), Meteor.subscribe('tableros')];
    },
    onBeforeAction: function(){
      checkPermissions(['admin', 'crud-tableros'])
    },
    data: function() { return Tableros.findOne(this.params._id); }
  });
  
});//Router.map






var adminFilter = function () {
  console.log('on adminFilter');
  if (Meteor.logginIn()) {
   //we are just going to show them the loading template
    this.render('loading');
    this.stop();
  } 
//   else if (!user.admin()) {
//     this.render('notFound');
//     this.stop();
//   }
};

var checkPermissions = function(permittedRoles){
  
  console.log('checking permissions...');
  
  
  if ((!Meteor.user()) && (this !== undefined)) {
        if (Meteor.loggingIn()){
          console.log('user logging in');
          //Router.go('portalFace');
          //pause(); 
           // this.render('loading');
        }
          
  }else if(Meteor.user()){
    console.log('checking user roles');
          var userRoles = Meteor.user().roles;
      //console.log('Intersections: ' + userRoles + ":"+ permittedRoles);
  var intersection = _.intersection(userRoles, permittedRoles)
  if(_.isEmpty(intersection)){
    Router.go('deniedAccess');
    //Router.go('accessDenied');
    this.stop();
        }
           // this.render('accessDenied');
            //this.stop();
    console.log('OUT OF checking user roles');
        }
  
   
}
  
  

// var mustBeSignedIn = function(pause) {
//   if (!(Meteor.user() || Meteor.loggingIn())) {
//     Router.go('portalFace');
//     pause();
//   }
// };

// var goToHome = function(pause) {
//   if (Meteor.user()) {
//     Router.go('home');
//     pause();
//   }
// };

Router.onBeforeAction('loading');
// Router.onBeforeAction(checkPermissionsAuthorInsert, {only: ['authorInsert']});
//Router.onBeforeAction(mustBeSignedIn, {except: ['portalFace', 'sign-in']});
//Router.onBeforeAction(goToHome, {only: ['portalFace']});