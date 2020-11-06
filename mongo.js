const MongoClient = require('mongodb').MongoClient;

const url = `mongodb+srv://${process.env.USR}:${process.env.PASS}@cluster0.dnlkt.mongodb.net/${
    process.env.DBNAME}?retryWrites=true&w=majority`;

const createProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };
    const client = new MongoClient(url);
    
    console.log(newProduct)

    try {
        await client.connect();
        const db = client.db();
        const result = db.collection('products').insertOne(newProduct);
    } catch (error) {
        throw res.json({message: 'Could not store data.'})
    }
    client.close();
    res.json(newProduct);
};

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url);

    let products;
    try {
        await client.connect();
        const db = client.db();
        products = await db.collection('products').find().toArray();
    } catch (error) {
        console.log(error);
        throw res.json({message: 'Could not retrieve products.'})
    }
    client.close();
    console.log(products)
    res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;

