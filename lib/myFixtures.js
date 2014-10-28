Meteor.myFixtures = {
  
  createUsers : function() {
    console.log('Creating users...');

    var users = [
      //  {name:"alejandro foullon gmail",email:"alejandro.foullon@gmail.com",roles:['admin']},
      {name:"A Name",email:"a@a.com", position: "Coordinador Central de Información", telephone: "111-222", roles:['admin']},
      {name:"B Name",email:"b@b.com", position: "Gestor Urgencias", telephone:"123-456", roles:['crud-procesos']},
      {name:"C Name",email:"c@c.com", position: "Coordinador Urgencias", telephone:"123-456", roles:['crud-procesos']}
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
    RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeUnidadesMedicionMeter", permittedRoles: ["admin","crud-unidadesMedicion"]});
    RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeAtributosNormativosMeter", permittedRoles: ["admin","crud-atributosNormativos"]});
    RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeEntidadesReguladorasMeter", permittedRoles: ["admin","crud-entidadesReguladoras"]});
     RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeNormasMeter", permittedRoles: ["admin","crud-normas"]});
     RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeUsersMeter", permittedRoles: ["admin","crud-users"]});
    RolePermissions.insert({routeUrl: "/home", template:"home", guiElement: "homeTablerosMeter", permittedRoles: ["admin","crud-tableros"]});
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
  
   createUnidadesMedicion: function(){
    console.log('Creating unidades de medicion...');
    UnidadesMedicion.insert({nombre: 'Pacientes', descripcion:"Persona que solicitud una atención en salud en Méderi."});
    UnidadesMedicion.insert({nombre: 'Minutos', descripcion:"Un minuto se refiere  unidad de tiempo que equivale a la sexagésima parte de una hora."});
    console.log('Ended creating unidades de medicion...');
  },
  
  createAtributosNormativos: function(){
    console.log('Creating atributos normativos...');
    var n1 = Normas.findOne({nombre: 'Circular 045'});
    AtributosNormativos.insert({nombre: 'Accesibilidad', normaId: n1._id});
    AtributosNormativos.insert({nombre: 'Pertinencia', normaId: n1._id});
    console.log('Ended creating atributos normativos...');
  },
  
  createEntidadesReguladoras: function(){
    console.log('Creating entidades reguladoras...');
    EntidadesReguladoras.insert({nombre: 'Ministerio de Salud y Protección Social', direccion:"Carrera 13 No. 32-76, piso 1, Bogotá. Código Postal 110311", telefono:"595 35 25"});
    console.log('Ended creating entidades reguladoras...');
  },
  
  createNormas: function(){
    console.log('Creating normas...');
    var er1 = EntidadesReguladoras.findOne({nombre:'Ministerio de Salud y Protección Social'});
    Normas.insert({nombre: 'Circular 045', descripcion:"descripcion detallada de la 045", entidadReguladoraId: er1._id});
    console.log('Ended creating normas...');
  },
  
   createTableros : function() {
    console.log('Creating tableros...');
    Tableros.insert({nombre:"Tablero de Productividad", descripcion:"descripción tablero de productividad" });
    Tableros.insert({nombre:"Tablero de mando gerencial",descripcion:"descripción tablero de mando gerencial" });
    console.log('Ended creating tableros...');
  },
  
  createFichaIndicadores: function(){
    console.log('Creating fichaIndicadores...');
    var p1 = Procesos.findOne({nombre:'Gestión de Urgencias'});
    var p2 = Procesos.findOne({nombre:'Gestión a Usuarios'});
    console.log(p1._id);
    console.log(p1);
    
    var f1 = Fuentes.findOne({nombre:'Servinte-Facturación'});
    var f2 = Fuentes.findOne({nombre:'Hoja de cálculo - Vacunación'});
    
    var um1 = UnidadesMedicion.findOne({nombre:'Pacientes'});
    var um2 = UnidadesMedicion.findOne({nombre:'Minutos'});
    
    var an1 = AtributosNormativos.findOne({nombre:'Accesibilidad'});
    var an2 = AtributosNormativos.findOne({nombre:'Pertinencia'});
    
     FichaIndicadores.insert({
       nombre: 'Oportunidad en la atención de triage', 
       objetivo: 'Medir los tiempos de atención del punto de registro a la realización del triage.',
       procesoId: p1._id,
       proceso: p1,
       fuenteId: f1._id,
       fuente: f1,
       unidadMedicionId: um1._id,
       unidadMedicion: um1,
       tendencia: "incremental",
       alcance: ["eficiencia","eficacia"],
       frecuenciaMedicion: "anual",
       segmentosMediciones: ["HUM", "HUBU"],
       observaciones: "Sin observaciones específicas",
       estado:"borrador"
     });
    
    FichaIndicadores.insert({
      nombre: 'Tasa de satisfacción al usuario', 
      objetivo: 'Medir la satisfacción sl usuario mediante las encuestas diseñadas para tal fin.',
      procesoId: p2._id,
      proceso: p2,
      fuenteId: f2._id,
      fuente: f2,
      unidadMedicionId: um2._id,
      unidadMedicion: um2,
      tendencia:"neutral",
      alcance:["efectividad"],
      frecuenciaMedicion: "mensual",
      segmentosMediciones: ["Méderi"],
      observaciones: "sin observaciones",
      estado:"borrador"
    });
 
    console.log('Ended creating fichaIndicadores...');
  },
  
  createAsignacionesAtributoNormativoIndicador: function(){
    console.log('Creating atributos normativos...');
    var fi1 = FichaIndicadores.findOne({nombre:'Oportunidad en la atención de triage'});
    var fi2 = FichaIndicadores.findOne({nombre:'Tasa de satisfacción al usuario'});
    var an1 = AtributosNormativos.findOne({nombre:'Accesibilidad'});
    var an2 = AtributosNormativos.findOne({nombre:'Pertinencia'});
    
    AsignacionesAtributoNormativoIndicador.insert({
      fichaIndicadorId: fi1._id,
      atributoNormativoId: an1._id
    });
     AsignacionesAtributoNormativoIndicador.insert({
      fichaIndicadorId: fi1._id,
      atributoNormativoId: an2._id
    });
     AsignacionesAtributoNormativoIndicador.insert({
      fichaIndicadorId: fi2._id,
      atributoNormativoId: an1._id
    });
    console.log('Ended creating atributos normativos...');
  },
  
   createAsignacionesUsuarioIndicador: function(){
    console.log('Creating asignaciones usuario indicador...');
    var u1 = Meteor.users.findOne({"profile.name":"A Name"});
    var u2 = Meteor.users.findOne({"profile.name":"B Name"});
    var u3 = Meteor.users.findOne({"profile.name":"C Name"});
    
    var fi1 = FichaIndicadores.findOne({nombre:'Oportunidad en la atención de triage'});
    var fi2 = FichaIndicadores.findOne({nombre:'Tasa de satisfacción al usuario'});
    
     AsignacionesUsuarioIndicador.insert({fichaIndicadorId: fi1._id, userId: u1._id, rol:["administrador"]});
    AsignacionesUsuarioIndicador.insert({fichaIndicadorId: fi1._id, userId: u2._id, rol:["responsable"]});
    AsignacionesUsuarioIndicador.insert({fichaIndicadorId: fi1._id, userId: u3._id, rol:["reporteador"]});
     
    AsignacionesUsuarioIndicador.insert({fichaIndicadorId: fi2._id, userId: u1._id, rol:["administrador"]});
    AsignacionesUsuarioIndicador.insert({fichaIndicadorId: fi2._id, userId: u2._id, rol:["responsable"]});
     
     console.log('Ended creating asignaciones usuario indicador...');
  },
  
  
  
}