 Template.signIn.events({

    'submit #signInForm' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#signInEmail').value;
      var password = t.find('#signInPassword').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err){
        if (err){
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
          Session.set('userPasswordIncorrect', true);
        }
          
        else{
          // The user has been logged in.
          Session.set('userPasswordIncorrect', false);
          Router.go('/home');
          
        }
          
      });
         return false; 
      }
  });

Template.signIn.helpers({
  userPasswordIncorrect: function(){
    return Session.get('userPasswordIncorrect');
  }
});