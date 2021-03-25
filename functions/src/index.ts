import * as functions from 'firebase-functions';

// Firebase
import * as admin from 'firebase-admin';
admin.initializeApp();


// Cloud Vision
import * as vision from '@google-cloud/vision';
const visionClient =  new vision.ImageAnnotatorClient();

// Dedicated bucket for cloud function invocation
const bucketName = 'lagerale-7660b-vision';

export const imageTagger = functions.storage
    
    .bucket(bucketName)
    .object()
    .onChange( async (event: { data: any; }) => {

            // File data
            const object = event.data;
            const filePath = object.name;

            // Location of saved file in bucket
            const imageUri = `gs://${bucketName}/${filePath}`;

            const docId = filePath.split('.jpg')[0];

            const docRef  = admin.firestore().collection('photos').doc(docId);

            // Await the cloud vision response
            const results = await visionClient.labelDetection(imageUri) as any;

            // Map the data to desired format
            const labels = results[0].labelAnnotations.map((obj: { description: any; }) => obj.description);
            const hotdog = labels.includes('hot dog');


            return docRef.set({ hotdog, labels });
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
