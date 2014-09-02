Meteor.myFunctions = {
  
  createUsers : function() {
    console.log('Creating users...');

    var users = [
        {name:"a (admin)",email:"a@a.com",roles:['admin']},
        {name:"b (create stores)",email:"cs@a.com",roles:['create-stores']}
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
  }
}