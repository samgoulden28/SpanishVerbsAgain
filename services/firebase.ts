import firestore from '@react-native-firebase/firestore';

export const getVerbs = async () => {
  const verbs: {spanish: string; english: string}[] = [];
  const snapshot = await firestore().collection('verbs').get();
  snapshot.forEach(doc => {
    verbs.push(doc.data() as {spanish: string; english: string});
  });
  return verbs;
};
