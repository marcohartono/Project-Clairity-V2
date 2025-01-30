const admin = require('firebase-admin');
const { Parser } = require('json2csv');
const fs = require('fs');

// Initialize the Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportData() {
  // Replace 'your-collection' with the name of the collection you want to export
  const snapshot = await db.collection('your-collection').get();
  
  // Convert documents to JSON
  const data = snapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() };
  });

  // If there's no data, handle that
  if (data.length === 0) {
    console.log("No documents found.");
    return;
  }

  // Use json2csv to convert to CSV
  const parser = new Parser();
  const csv = parser.parse(data);

  // Write CSV to file
  fs.writeFileSync('export.csv', csv);
  console.log("Data exported to export.csv");
}

exportData().catch(console.error);
