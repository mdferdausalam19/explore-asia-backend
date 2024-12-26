const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup for CORS, security headers, and JSON parsing
app.use(cors());
app.use(helmet());
app.use(express.json());

// MongoDB dependencies and client initialization
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kmxsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a new MongoDB client with configuration
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to the MongoDB database and define the 'touristSpots' collection
    const database = client.db("exploreAsia");
    const touristSpots = database.collection("touristSpots");

    // Route to fetch all tourist spots
    app.get("/tourist-spots", async (req, res) => {
      const cursor = touristSpots.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Route to fetch a single tourist spot by ID
    app.get("/tourist-spots/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await touristSpots.findOne(query);
      res.send(result);
    });

    // Route to fetch tourist spots added by a specific user using their email
    app.get("/user-tourist-spots", async (req, res) => {
      const email = req.query.email;
      const query = { userEmail: email };
      const result = await touristSpots.find(query).toArray();
      res.send(result);
    });

    // Route to fetch all tourist spots with sorting by average cost (asc/desc)
    app.get("/all-tourist-spots", async (req, res) => {
      const sort = req.query.sort || "asc";
      const sortOrder = sort === "asc" ? 1 : -1;
      const result = await touristSpots
        .find()
        .sort({ averageCost: sortOrder })
        .toArray();
      res.send(result);
    });

    // Route to add a new tourist spot to the collection
    app.post("/tourist-spots", async (req, res) => {
      const touristSpotInfo = req.body;
      const result = await touristSpots.insertOne(touristSpotInfo);
      res.send(result);
    });

    // Route to update an existing tourist spot by ID
    app.put("/tourist-spots/:id", async (req, res) => {
      const id = req.params.id;
      const touristSpot = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateTouristSpot = {
        $set: {
          imageURL: touristSpot.imageURL,
          touristsSpotName: touristSpot.touristsSpotName,
          countryName: touristSpot.countryName,
          location: touristSpot.location,
          description: touristSpot.description,
          averageCost: touristSpot.averageCost,
          seasonality: touristSpot.seasonality,
          travelTime: touristSpot.travelTime,
          totalVisitorsPerYear: touristSpot.totalVisitorsPerYear,
        },
      };
      const result = await touristSpots.updateOne(
        filter,
        updateTouristSpot,
        options
      );
      res.send(result);
    });

    // Route to delete a tourist spot by ID
    app.delete("/tourist-spots/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await touristSpots.deleteOne(query);
      res.send(result);
    });

    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    // Log any errors during connection or runtime
    console.error("Error connecting to MongoDB: ", err.message);
  }
}

// Run the async function to initialize the database connection and routes
run().catch(console.dir);

// Root endpoint for the server
app.get("/", (req, res) => {
  res.send(
    "Welcome to the ExploreAsia server! Your gateway to Asia's wonders."
  );
});

// Start the Express server
app.listen(port, () => {
  console.log(`ExploreAsia server is running on port ${port}`);
});
