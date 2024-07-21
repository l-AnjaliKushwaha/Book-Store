const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = "mongodb://127.0.0.1:27017/bookstore";

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Database and Collection
const bookCollections = client.db("BookInventory").collection("Books");

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");

    // Routes
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.post("/upload-book", async (req, res) => {
      try {
        const data = req.body;
        const result = await bookCollections.insertOne(data);
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get("/all-books", async (req, res) => {
      try {
        const query = req.query?.category
          ? { category: req.query.category }
          : {};
        const books = await bookCollections.find(query).toArray();
        res.send(books);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.patch("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateBookData = req.body;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: updateBookData,
        };
        const options = { upsert: true };
        const result = await bookCollections.updateOne(
          filter,
          updatedDoc,
          options
        );
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.delete("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await bookCollections.deleteOne(filter);
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await bookCollections.findOne(filter);
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get("/book-category", async (req, res) => {
      try {
        const query = req.query?.category
          ? { category: req.query.category }
          : {};
        const result = await bookCollections.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close(); // Uncomment if you want to close the client after finishing
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
