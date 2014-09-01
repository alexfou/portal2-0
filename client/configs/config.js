AutoForm.hooks({
  insertBookForm: {
    before: {
      insert: function(doc, template) {
        console.log('before insert: ' + Object.keys(doc) + " " +Object.keys(template));
        console.log('Doc: ' + doc._id + "-" + doc.authorId + "-" + doc.author);
        console.log('Type of doc: ' + typeof(doc));
        if(doc.authorId !== undefined){
           a = Authors.findOne({'_id':doc.authorId});
          console.log("Author find: " + a + " and its keys: " + Object.keys(a));
          doc.author = a;  
        }
       
         //Books.insert(doc);    
         //Session.set('tempInsertBook', undefined);
         //Router.go('/booksList');
        return doc;
    
      },
    },
    
    onSuccess: function(operation, result, template) {
      Session.set('tempInsertBook', undefined);
      Router.go('/booksList');
      
    },
      
  },
    
    updateBookForm:{
//       after: {
//         update: function(error, result, template) {
//          Router.go('/booksList')
//         }
//       },
        
      onSubmit: function(insertDoc, updateDoc, currentDoc) {
        console.log('InsertDoc: ' + Object.keys(insertDoc) + "-" +insertDoc.title);
        console.log('InsertDoc: ' + Object.keys(updateDoc) + "-" +updateDoc.title);
        console.log('InsertDoc: ' + Object.keys(currentDoc) + "-" +currentDoc.title); //tiene _id
        if(currentDoc.authorId !== insertDoc.authorId){
          console.log('Cambio de autor');
          a = Authors.findOne({'_id':insertDoc.authorId});
          console.log("Author find: " + a + " and its keys: " + Object.keys(a));
          insertDoc.author = a;
          Books.update({'_id':currentDoc._id}, {$set: insertDoc});
          this.done();
          Router.go('/booksList');
          return false;
          
        }else{
          Books.update({'_id':currentDoc._id}, {$set: insertDoc});
          this.done();
          Router.go('/booksList');
          return false;
        }
        //return false;
      },
      
    },
  
  updateAuthorForm: {
    onSuccess: function(operation, result, template) {
       Router.go('/authorsList');     
    }, 
  },
  
   insertAuthorForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/authorsList');   
      }
      if(s == 'bookInsert')
       Router.go('/bookInsert');     
    }, 
  },
  
  updateStoreForm: {
    onSuccess: function(operation, result, template) {
       Router.go('/storesList');     
    }, 
  },
  
   insertStoreForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/storesList');   
      }
      if(s == 'bookInsert')
       Router.go('/bookInsert');     
    }, 
  }
               
//     onSuccess: function(operation, result, template) {
//       Router.go('/booksList');
//     }
    
//   updateBookForm: {
//     onSuccess: function(operation, result, template) {
//       Router.go('/booksList');
//     }
//   }
});