Meteor.myFixtures = {
  
  createUsers : function() {
    console.log('Creating users...');

    var users = [
      //  {name:"alejandro foullon gmail",email:"alejandro.foullon@gmail.com",roles:['admin']},
        {name:"A Name",email:"a@a.com",roles:['admin']},
        {name:"B Name",email:"b@b.com",roles:['crud-stores']}
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
  
  createProcesses: function(){
    console.log('Creating processes...');
    Processes.insert({name: 'Gestión de Urgencias', level_1:"Macro procesos misionales", level_2:"Gestión clínica"});
    Processes.insert({name: 'Gestión a Usuarios', level_1:"Macro procesos de apoyo", level_2:"Gestión del servicio"});
    console.log('Ended creating processes...');
  },
  
  createKpis: function(){
    console.log('Creating kpis...');
    var p1 = Processes.findOne({name:'Gestión de Urgencias'});
    var p2 = Processes.findOne({name:'Gestión a Usuarios'});
    console.log(p1._id);
    console.log(p1);
    
     Kpis.insert({name: 'Oportunidad en la atención de triage', 
                  processKpiId: p1._id,
                  processKpi: p1
                 });
    
    Kpis.insert({name: 'Tasa de satisfacción al usuario', 
                  processKpiId: p2._id,
                  processKpi: p2
                 });
    

    console.log('Ended creating kpis...');
  }
  
}