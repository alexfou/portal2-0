Meteor.startup(function () {
  
  Accounts.config({
  //sendVerificationEmail: true,
  forbidClientAccountCreation: true,
});

  //process.env.MAIL_URL="smtp://alejandro.foullon%40gmail.com:SOR7nEo2@smtp.gmail.com:465/";
//   process.env.MAIL_URL="smtp://AKIAIOIJJ4AGJ4CR7TEQ:AjObpPIv5EOudagTmecq16%2BjYL5uV1lRTePLt765D42T@SES_SMTP_URL:465";
  

  ////////////////////////////////////////////////////////////////////
  // Create Test Secrets
  //
    
//   if (Meteor.secrets.find().fetch().length === 0) {
//     Meteor.secrets.insert({secret:"ec2 password: apple2"});
//     Meteor.secrets.insert({secret:"domain registration pw: apple3"});
//   }


  ////////////////////////////////////////////////////////////////////
  // Create Test Users
  //

  if (Meteor.users.find().fetch().length === 0) {

    Meteor.myFixtures.createUsers();
    Meteor.myFixtures.createAuthors();
    Meteor.myFixtures.createBooks();
    Meteor.myFixtures.createStores();
    Meteor.myFixtures.createRolePermissions();
    Meteor.myFixtures.createProcesos();
    Meteor.myFixtures.createFuentes();
    Meteor.myFixtures.createUnidadesMedicion();
    Meteor.myFixtures.createEntidadesReguladoras();
    Meteor.myFixtures.createNormas();
    Meteor.myFixtures.createAtributosNormativos(); 
    Meteor.myFixtures.createFichaIndicadores();
    Meteor.myFixtures.createAsignacionesAtributoNormativoIndicador();
    
  }



  ////////////////////////////////////////////////////////////////////
  // Prevent non-authorized users from creating new users
  //

//   Accounts.validateNewUser(function (user) {
//     var loggedInUser = Meteor.user();

//     if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
//       return true;
//     }

//     throw new Meteor.Error(403, "Not authorized to create new users");
//   });

});
