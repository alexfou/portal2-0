Meteor.myFixtures = {
  
  createUsers : function() {
    console.log('Creating users...');

    var users = [
      //  {name:"alejandro foullon gmail",email:"alejandro.foullon@gmail.com",roles:['admin']},
        {name:"A Name",email:"a@a.com",roles:['admin']},
        {name:"B Name",email:"b@b.com",roles:['crud-procesos']}
      ];

    _.each(users, function (userData) {
      var id,
          user;
      
     // console.log(userData);

      id = Accounts.createUser({
        email: userData.email,
        password: "a111111",
        profile: { name: userData.name }
      });

      // email verification
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, userData.roles);
    });
    
    console.log('Ended creating users...');
    
  },
  
  createRolePermissions: function(){
    console.log('Creating role permissions...');
    RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeBooksMeter", permittedRoles: ["admin","crud-books"]});
    RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeAuthorsMeter", permittedRoles: ["admin","crud-authors"]});
    RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeStoresMeter", permittedRoles: ["admin","crud-stores"]});
    RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeProcesosMeter", permittedRoles: ["admin","crud-procesos"]});
    RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeFichaIndicadoresMeter", permittedRoles: ["admin","crud-fichaIndicadores"]});
    RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeFuentesMeter", permittedRoles: ["admin","crud-fuentes"]});
    console.log('Creating role permissions...');
  },
  
  createAuthors : function() {
    console.log('Creating authors...');
    Authors.insert({name:"Juan Villoro",birthCountry:"México" });
    Authors.insert({name:"Gabriel García Márquez",birthCountry:"Colombia" });
    Authors.insert({name:"Julio Cortázar",birthCountry:"Argentina" });
    console.log('Ended creating authors...');
  },
  
  createBooks : function() {
    console.log('Creating books...');
    Books.insert({title: 'Cien años de soledad', 
                  authorId: Authors.findOne({name:"Gabriel García Márquez"})._id,
                  author: {name:"Gabriel García Márquez",birthCountry:"Colombia"},
                  copies: 1,
                  mediaType:"Papel",
                  classification:["Ficción"]
                 });
    Books.insert({title: 'Ojos de perro azul', 
                  authorId: Authors.findOne({name:"Gabriel García Márquez"})._id,
                  author: {name:"Gabriel García Márquez",birthCountry:"Colombia"},
                  copies: 1,
                  mediaType:"Papel",
                  classification:["Ficción"]
                 });
    Books.insert({title: '¿Hay vida después de la Tierra?', 
                  authorId: Authors.findOne({name:"Juan Villoro"})._id,
                  author: {name:"Juan Villoro",birthCountry:"México"},
                  copies: 1,
                  mediaType:"Electrónico",
                  classification:["No ficción"]
                 });
    Books.insert({title: 'Los once de la tribu', 
                  authorId: Authors.findOne({name:"Juan Villoro"})._id,
                  author: {name:"Juan Villoro",birthCountry:"México"},
                  copies: 1,
                  mediaType:"Electrónico",
                  classification:["No ficción"]
                 });
    Books.insert({title: 'Rayuela', 
                  authorId: Authors.findOne({name:"Julio Cortázar"})._id,
                  author: {name:"Julio Cortázar",birthCountry:"Argentina"},
                  copies: 1,
                  mediaType:"Papel",
                  classification:["Ficción"]
                 });
    console.log('Ended creating books...');
  },
  
  createStores: function(){
    console.log('Creating stores...');
    Stores.insert({name: 'Ghandi', type:"Física", address:"Miguel Angel de Quevedo #123, DF, México"});
    Stores.insert({name: 'Panamericana', type:"Física", address:"Cra 7, Bogotá, Colombia"});
    Stores.insert({name: 'Amazon', type:"Virtual", address:"www.amazon.com"});
    console.log('Ended creating stores...');
  },
  
  createProcesos: function(){
    console.log('Creating procesos...');
    Procesos.insert({nombre: 'Gestión de Urgencias', macroProceso_1:"Macro procesos misionales", macroProceso_2:"Gestión clínica"});
    Procesos.insert({nombre: 'Gestión a Usuarios', macroProceso_1:"Macro procesos de apoyo", macroProceso_2:"Gestión del servicio"});
    console.log('Ended creating processes...');
  },
  
  createFuentes: function(){
    console.log('Creating fuentes...');
    Fuentes.insert({nombre: 'Servinte-Facturación', tipo:"Sistema transaccional institucional", areaMantenimientoDatos:"Sistemas"});
    Fuentes.insert({nombre: 'Hoja de cálculo - Vacunación',  tipo:"Hoja de cálculo local", areaMantenimientoDatos:"Vacunación"});
    console.log('Ended creating fuentes...');
  },
  
  createFichaIndicadores: function(){
    console.log('Creating fichaIndicadores...');
    var p1 = Procesos.findOne({nombre:'Gestión de Urgencias'});
    var p2 = Procesos.findOne({nombre:'Gestión a Usuarios'});
    console.log(p1._id);
    console.log(p1);
    
    var f1 = Fuentes.findOne({nombre:'Servinte-Facturación'});
    var f2 = Fuentes.findOne({nombre:'Hoja de cálculo - Vacunación'});
    
     FichaIndicadores.insert({
       nombre: 'Oportunidad en la atención de triage', 
       objetivo: 'Medir los tiempos de atención del punto de registro a la realización del triage.',
       procesoId: p1._id,
       proceso: p1,
       fuenteId: f1._id,
       fuente: f1
       
     });
    
    FichaIndicadores.insert({
      nombre: 'Tasa de satisfacción al usuario', 
      objetivo: 'Medir la satisfacción sl usuario mediante las encuestas diseñadas para tal fin.',
      procesoId: p2._id,
      proceso: p2,
      fuenteId: f2._id,
      fuente: f2
    });
    

    console.log('Ended creating fichaIndicadores...');
  }
  
}