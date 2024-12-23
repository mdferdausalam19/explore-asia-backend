const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kmxsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const database = client.db("exploreAsia");
    const touristSpots = database.collection("touristSpots");

    // routes
    app.get("/tourist-spots", async (req, res) => {
      const cursor = touristSpots.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/tourist-spots/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await touristSpots.findOne(query);
      res.send(result);
    });

    app.get("/user-tourist-spots", async (req, res) => {
      const email = req.query.email;
      const query = { userEmail: email };
      const result = await touristSpots.find(query).toArray();
      res.send(result);
    });

    app.get("/all-tourist-spots", async (req, res) => {
      const sort = req.query.sort || "asc";
      const sortOrder = sort === "asc" ? 1 : -1;
      const result = await touristSpots
        .find()
        .sort({ averageCost: sortOrder })
        .toArray();
      res.send(result);
    });

    app.post("/tourist-spots", async (req, res) => {
      const touristSpotInfo = req.body;
      const result = await touristSpots.insertOne(touristSpotInfo);
      res.send(result);
    });

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

    app.delete("/tourist-spots/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await touristSpots.deleteOne(query);
      res.send(result);
    });

    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err.message);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(
    "Welcome to the ExploreAsia server! Your gateway to Asia's wonders."
  );
});

app.listen(port, () => {
  console.log(`ExploreAsia server is running on port ${port}`);
});
