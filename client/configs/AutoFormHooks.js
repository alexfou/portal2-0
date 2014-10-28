AutoForm.hooks({
  
   
  updateFichaIndicadorForm:{
      onSubmit: function(insertDoc, updateDoc, currentDoc) {
        console.log('InsertDoc: ' + Object.keys(insertDoc) + "-" +insertDoc.nombre);
        console.log('InsertDoc: ' + Object.keys(updateDoc) + "-" +updateDoc.nombre);
        console.log('InsertDoc: ' + Object.keys(currentDoc) + "-" +currentDoc.nombre); //tiene _id
        if(currentDoc.procesoId !== insertDoc.procesoId){
          console.log('Cambio de proceso');
          a = Procesos.findOne({'_id':insertDoc.procesoId});
          console.log("Proceso find: " + a + " and its keys: " + Object.keys(a));
          insertDoc.procesoId = a._id;
          insertDoc.proceso = a;
          //FichaIndicadores.update({'_id':currentDoc._id}, {$set: insertDoc});
          //this.done();
          //Router.go('/fichaIndicadoresList');
          //return false;     
        }if(currentDoc.fuenteId !== insertDoc.procesoId){
          console.log('Cambio de fuente');
          a = Fuentes.findOne({'_id':insertDoc.fuenteId});
          console.log("Fuente find: " + a + " and its keys: " + Object.keys(a));
          insertDoc.fuenteId = a._id;
          insertDoc.fuente = a;
        }
         // Procesos.update({'_id':currentDoc._id}, {$set: insertDoc});
          //this.done();
          //Router.go('/fichaIndicadoresList');
          //return false;
        //}else{
          FichaIndicadores.update({'_id':currentDoc._id}, {$set: insertDoc});
          this.done();
          Router.go('/fichaIndicadoresList');
          return false;
        //}
        //return false;
      },
  },
 
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
  
  insertRolePermissionForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/rolePermissionsList');   
      }
      if(s == 'bookInsert')
       Router.go('/bookInsert');     
    }, 
  },
  
  updateRolePermissionForm: {
    onSuccess: function(operation, result, template) {
       Router.go('/rolePermissionsList');     
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
  },
  
   insertKpiForm: {
    before: {
      insert: function(doc, template) {
//         console.log('before insert: ' + Object.keys(doc) + " " +Object.keys(template));
//         console.log('Doc: ' + doc._id + "-" + doc.authorId + "-" + doc.author);
//         console.log('Type of doc: ' + typeof(doc));
        if(doc.processId !== undefined){
           a = Processes.findOne({'_id':doc.processId});
          console.log("Process find: " + a + " and its keys: " + Object.keys(a));
          doc.process = a;  
        }
       
         //Books.insert(doc);    
         //Session.set('tempInsertBook', undefined);
         //Router.go('/booksList');
        return doc;
    
      },
    },
     
     onSuccess: function(operation, result, template) {
      Session.set('tempInsertKpi', undefined);
      Router.go('/kpis/kpisList');
      
    },
   },
  
  insertProcesoForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/procesosList');   
      }
      if(s == 'fichaIndicadorInsert')
       Router.go('/fichaIndicadorInsert');     
    }, 
  },
  
   updateProcesoForm: {
    onSuccess: function(operation, result, template) {
       Router.go('/procesosList');     
    }, 
  },
  
    
////////// FICHA INDICADOR //////////////////////////
  insertFichaIndicadorForm: {
    before: {
      insert: function(doc, template) {
        console.log('before insert: ' + Object.keys(doc) + " " +Object.keys(template));
        console.log('Doc: ' + doc._id + "-" + doc.procesoId + "-" + doc.proceso);
        console.log('Type of doc: ' + typeof(doc));
        if(doc.procesoId !== undefined){
           a = Procesos.findOne({'_id':doc.procesoId});
          console.log("Proceso find: " + a + " and its keys: " + Object.keys(a));
          doc.proceso = a;  
        }
        if(doc.fuenteId !== undefined){
           a = Fuentes.findOne({'_id':doc.fuenteId});
          console.log("Fuente find: " + a + " and its keys: " + Object.keys(a));
          doc.fuente = a;  
        }
        if(doc.unidadMedicionId !== undefined){
           a = UnidadesMedicion.findOne({'_id':doc.unidadMedicionId});
          console.log("Unidad de Medicion find: " + a + " and its keys: " + Object.keys(a));
          doc.unidadMedicion = a;  
        }
       
         //Books.insert(doc);    
         //Session.set('tempInsertBook', undefined);
         //Router.go('/booksList');
        doc.estado = "borrador"
        return doc;
    
      },
    },
    
    onSuccess: function(operation, result, template) {
      var arr = Session.get('newAtributosNormativos');
      _.map(arr, function(a){
        AsignacionesAtributoNormativoIndicador.insert({fichaIndicadorId:result, atributoNormativoId:a.atributoNormativoId});
      });
       var arr = Session.get('newUsuariosRoles');
      _.map(arr, function(a){
        AsignacionesUsuarioIndicador.insert({fichaIndicadorId:result, userId:a.userId, rol:[a.rol[0]]});
      });
      Session.set('tempInsertFichaIndicador', undefined);
      Session.set('newAtributosNormativos', undefined);
      Session.set('newUsuariosRoles', undefined);
      Router.go('/fichaIndicadoresList');
      
    },
  },

//////////// FUENTES /////////////////////////////////////////////////////
insertFuenteForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/fuentesList');   
      }
      if(s == 'fuenteInsert')
       Router.go('/fuenteInsert');     
    }, 
  },
  
  updateFuenteForm: {
    onSuccess: function(operation, result, template) {
       Router.go('/fuentesList');     
    }, 
  },

//////////// UNIDADES MEDICION /////////////////////////////////////////////////////
  insertUnidadMedicionForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/unidadesMedicionList');   
      }
      if(s == 'unidadMedicionInsert')
       Router.go('/unidadMedicionInsert');     
    }, 
  },
  
  updateUnidadMedicionForm: {
    onSuccess: function(operation, result, template) {
       Router.go('/unidadesMedicionList');     
    }, 
  },
  
//////////// ATRIBUTOS NORMATIVOS /////////////////////////////////////////////////////
  insertAtributoNormativoForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/atributosNormativosList');   
      }
      if(s == 'atributoNormativoInsert')
       Router.go('/atributoNormativoInsert');     
    }, 
  },
  
  updateAtributoNormativoForm: {
    onSuccess: function(operation, result, template) {
       Router.go('/atributosNormativosList');     
    }, 
  },

//////////// ENTIDADES REGULADORAS /////////////////////////////////////////////////////
insertEntidadReguladoraForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/entidadesReguladorasList');   
      }
      if(s == 'entidadReguladoraInsert')
       Router.go('/entidadReguladoraInsert');     
    }, 
  },
  
  updateFuenteForm: {
    onSuccess: function(operation, result, template) {
       Router.go('/entidadesReguladorasList');     
    }, 
  },

//////////// NORMAS /////////////////////////////////////////////////////
insertNormaForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/normasList');   
      }
      if(s == 'AtributoNormativoInsert')
       Router.go('/atributoNormativoInsert');     
    }, 
  },
  
   updateNormaForm: {
     onSubmit: function(insertDoc, updateDoc, currentDoc) {
       Normas.update({'_id':currentDoc._id}, {$set: insertDoc});
          this.done();
          Router.go('/normasList');
          return false;    
     }, 
   },
  
//////////// TABLEROS /////////////////////////////////////////////////////
insertTableroForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/tablerosList');   
      }
      if(s == 'tableroInsert')
       Router.go('/tableroInsert');     
    }, 
  },
  
  updateTableroForm: {
    onSuccess: function(operation, result, template) {
       Router.go('/tablerosList');     
    }, 
  },

                   
});