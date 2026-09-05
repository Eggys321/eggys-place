import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { connect } from "../config/db.js";

const run = async () => {
  await connect();
  const db = mongoose.connection.db;

  const productsResult = await db.collection("products").updateMany(
    {},
    [{ $set: { price: { $toDouble: "$price" } } }]
  );
  console.log(`Products: matched ${productsResult.matchedCount}, modified ${productsResult.modifiedCount}`);

  const ordersResult = await db.collection("orders").updateMany(
    {},
    [{
      $set: {
        orderItems: {
          $map: {
            input: "$orderItems",
            as: "item",
            in: { $mergeObjects: ["$$item", { price: { $toDouble: "$$item.price" } }] },
          },
        },
      },
    }]
  );
  console.log(`Orders: matched ${ordersResult.matchedCount}, modified ${ordersResult.modifiedCount}`);

  await mongoose.disconnect();
};

run().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
