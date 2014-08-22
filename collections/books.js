Books = new Meteor.Collection("books");
Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Título",
    max: 200
  },
  author: {
    type: String,
    label: "Autor"
  },
  copies: {
    type: Number,
    label: "Número de copias",
    min: 0
  },
  lastCheckedOut: {
    type: Date,
    label: "Última fecha de checkout",
    optional: true
  },
  summary: {
    type: String,
    label: "Resumen",
    optional: true,
    max: 1000
  },
  mediaType: {
    type: String,
    label: "Tipo de medio",
    allowedValues:["Papel", "Electrónico"]    
  },
  
  classification: {
    type: [String],
    label: "Clasificación",
    allowedValues:["Ficción", "No ficción", "Drama", "Thriller"]    
  }
}));

SimpleSchema.messages({
  required: "[label] es un campo requerido",
  minString: "[label] debe tener al menos [min] caracteres",
  maxString: "[label] no puede exceder [max] caracteres",
  minNumber: "[label] debe ser al menos [min]",
  maxNumber: "[label] no puede ser mayor a [max]",
  minDate: "[label] debe ser antes on en esta fecha [min]",
  maxDate: "[label] no puede ser después de [max]",
  minCount: "Se deben especificar al menos [minCount] valores",
  maxCount: "No se pueden especificar más de [maxCount] valores",
  noDecimal: "[label] debe ser valor entero",
  notAllowed: "[value] no es un valor permitido",
  expectedString: "[label] debe ser de sólo caracteres",
  expectedNumber: "[label] debe ser un número",
  expectedBoolean: "[label] de ser un valor boolean",
  expectedArray: "[label] debe ser un arreglo",
  expectedObject: "[label] debe ser un objeto",
  expectedConstructor: "[label] debe ser del tipo [type]",
  regEx: [
    {msg: "[label] falla en la validación de la expresión"},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] debe ser una dirección email válida"},
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] debe ser una dirección email válida"},
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] debe ser un dominio válido"},
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] debe ser un dominio válido"},
    {exp: SimpleSchema.RegEx.IP, msg: "[label] debe ser una dirección válida de IPv4 o IPv6"},
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] debe ser una dirección válida de IPv4"},
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] debe ser una dirección válida de IPv6"},
    {exp: SimpleSchema.RegEx.Url, msg: "[label] debe ser una dirección válida de URL"},
    {exp: SimpleSchema.RegEx.Id, msg: "[label] debe ser un ID alfanumérico"}
  ],
  keyNotInSchema: "[label] no esta permitido por el esquema"
});