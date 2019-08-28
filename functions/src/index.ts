import * as functions from 'firebase-functions';

// // https://firebase.google.com/docs/functions/typescript
export const test = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
