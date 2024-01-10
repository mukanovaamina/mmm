const fs = require('fs');
const { MongoClient } = require('mongodb');

async function uploadImage(imagePath, description) {
    const uri = 'mongodb+srv://aminamukanova:mP7VJA5x7awfWlFa@cluster0.qz00xol.mongodb.net';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB!');

        const database = client.db('mortex');
        const collection = database.collection('image');


        const imageBuffer = fs.readFileSync(imagePath);


        const imageDocument = {
            description: description,
            image: imageBuffer,
        };

        const result = await collection.insertOne(imageDocument);
        console.log('Image added with ID:', result.insertedId);
    } catch (err) {
        console.error('Error uploading image to MongoDB:', err);
    } finally {
        client.close();
    }
}


const imagePath = 'product5.jpg';
const imageDescription = 'shoes for women and men';





uploadImage(imagePath, imageDescription);
