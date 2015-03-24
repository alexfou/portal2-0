AutoForm.hooks({
  
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
  
////////// PROCESO //////////  
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
        doc.fechaHoraEfectiva = new Date();
        doc.ultimaVersion = true;
        doc.estado = "borrador";
        doc.aprobAdminPublicacion = null;
        doc.aprobGestorPublicacion = null;
        doc.eliminacion = null;
        doc.fichasFormula =_.pluck( Session.get('newFichasFormula'),'fichaIndicadorId');
        
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
       var arr = Session.get('newGrupos');
      _.map(arr, function(a){
        AsignacionesGrupoIndicador.insert({fichaIndicadorId:result, grupoId:a.grupoId});
      });
      Session.set('tempInsertFichaIndicador', undefined);
      Session.set('newAtributosNormativos', undefined);
      Session.set('newUsuariosRoles', undefined);
      Session.set('newGrupos', undefined);
       Session.set('newFichasFormula', undefined);
      Router.go('/fichaIndicadoresList');
      
    },
  },
  
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
        }if(currentDoc.fuenteId !== insertDoc.fuenteId){
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
//         FichaIndicadores.update({'_id':currentDoc._id}, {$set: {ultimaVersion:false}});
        insertDoc.fechaHoraEfectiva = new Date();
        insertDoc.ultimaVersion = true;
        insertDoc.estado = currentDoc.estado;
        insertDoc.aprobAdminPublicacion = currentDoc.aprobAdminPublicacion;
        insertDoc.aprobGestorPublicacion = currentDoc.aprobGestorPublicacion;
        insertDoc.eliminacion = currentDoc.eliminacion;
        
        //insertDoc.eliminado = false;
        
        FichaIndicadores.update({'_id':currentDoc._id}, {$set: insertDoc});
       // FichaIndicadores.update({'_id':currentDoc._id}, {$set: {fechaHoraEfectiva: newDate}});
        
//         var a = Procesos.findOne({'_id':insertDoc.procesoId});
//         insertDoc.proceso = a;
//         a = Fuentes.findOne({'_id':insertDoc.fuenteId});
//         insertDoc.fuente = a;
//         insertDoc.ultimaVersion = false;
//         insertDoc.fechaHoraEfectiva = lastDate;
//         var fi = _.omit(insertDoc,'_id');
          //currentDoc.fechaHoraEfectiva = lastDate;
          currentDoc.ultimaVersion = false;
        currentDoc.idOriginal = currentDoc._id;
          var fi = _.omit(currentDoc,'_id');
         fi = FichaIndicadores.insert(fi);
        //AsignacionesAtributoNormativoIndicador.update({fichaIndicadorId: currentDoc._id}, {$set:{fichaIndicadorId: fi._id}});
          this.done();
          Router.go('/fichaIndicadoresList');
          return false;
        //}
        //return false;
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
  
////////// PERIODOS DE MEDICION //////////  
  insertPeriodoMedicionForm: {
    onSuccess: function(operation, result, template) {
      s = Session.get('originRoute');
      if(s === undefined || s === false || s === null){
        Router.go('/periodosMedicionList');   
      }
      if(s == 'periodoMedicionInsert')
       Router.go('/periodoMedicionInsert');     
    }, 
  },
  
   updatePeriodoMedicionForm: {
    onSuccess: function(operation, result, template) {
       Router.go('/periodosMedicionList');     
    }, 
  },

                   
});