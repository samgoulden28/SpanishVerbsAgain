const admin = require('firebase-admin');
const serviceAccount = require('../spanish-verbs-4c061-firebase-adminsdk-kjnfo-d347b019a0.json'); // Replace with the path to your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const verbs = [
  {english: 'to speak', spanish: 'hablar'},
  {english: 'to eat', spanish: 'comer'},
  {english: 'to live', spanish: 'vivir'},
  {english: 'to write', spanish: 'escribir'},
  {english: 'to read', spanish: 'leer'},
  {english: 'to run', spanish: 'correr'},
  {english: 'to swim', spanish: 'nadar'},
  {english: 'to sleep', spanish: 'dormir'},
  {english: 'to work', spanish: 'trabajar'},
  {english: 'to study', spanish: 'estudiar'},
  {english: 'to open', spanish: 'abrir'},
  {english: 'to close', spanish: 'cerrar'},
  {english: 'to listen', spanish: 'escuchar'},
  {english: 'to see', spanish: 'ver'},
  {english: 'to look', spanish: 'mirar'},
  {english: 'to play', spanish: 'jugar'},
  {english: 'to learn', spanish: 'aprender'},
  {english: 'to teach', spanish: 'enseñar'},
  {english: 'to help', spanish: 'ayudar'},
  {english: 'to buy', spanish: 'comprar'},
  {english: 'to sell', spanish: 'vender'},
  {english: 'to bring', spanish: 'traer'},
  {english: 'to take', spanish: 'llevar'},
  {english: 'to do/make', spanish: 'hacer'},
  {english: 'to say/tell', spanish: 'decir'},
  {english: 'to ask', spanish: 'preguntar'},
  {english: 'to answer', spanish: 'responder'},
  {english: 'to understand', spanish: 'entender'},
  {english: 'to know/meet', spanish: 'conocer'},
  {english: 'to think', spanish: 'pensar'},
  {english: 'to remember', spanish: 'recordar'},
  {english: 'to forget', spanish: 'olvidar'},
  {english: 'to travel', spanish: 'viajar'},
  {english: 'to drive', spanish: 'conducir'},
  {english: 'to walk', spanish: 'caminar'},
  {english: 'to search/look for', spanish: 'buscar'},
  {english: 'to find', spanish: 'encontrar'},
  {english: 'to lose', spanish: 'perder'},
  {english: 'to win/earn', spanish: 'ganar'},
  {english: 'to pay', spanish: 'pagar'},
  {english: 'to invite', spanish: 'invitar'},
  {english: 'to wait/hope', spanish: 'esperar'},
  {english: 'to start/begin', spanish: 'comenzar'},
  {english: 'to finish/end', spanish: 'terminar'},
  {english: 'to return', spanish: 'regresar'},
  {english: 'to enter', spanish: 'entrar'},
  {english: 'to leave', spanish: 'salir'},
  {english: 'to go up/climb', spanish: 'subir'},
  {english: 'to go down/descend', spanish: 'bajar'},
  {english: 'to drink', spanish: 'beber'},
];

const uploadVerbs = async () => {
  const batch = db.batch();
  verbs.forEach((verb, index) => {
    const docRef = db.collection('verbs').doc(`verb${index + 1}`);
    batch.set(docRef, {translation: verb});
  });

  await batch.commit();
  console.log('Verbs uploaded successfully!');
};

uploadVerbs().catch(console.error);
