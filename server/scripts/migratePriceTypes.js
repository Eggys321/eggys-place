// One-off migration: earlier product/order documents stored `price` as a String.
// The schema now declares these fields as Number (see models/productModel.js,
// models/OrderModel.js) so new writes are already correct - this script just
// normalizes the type of data that existed before that change.
//
// Uses raw aggregation-pipeline updates (not Mongoose .save()) because Mongoose
// casts String -> Number on read, which makes its own dirty-checking think an
// already-correct-looking in-memory value hasn't changed and skips the write -
// leaving the stored BSON type as a string. $toDouble bypasses that entirely and
// is a safe no-op to re-run against documents that are already numeric.
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
