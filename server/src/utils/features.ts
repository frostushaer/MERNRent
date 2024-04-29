import mongoose from "mongoose";
import { myCache } from "../app.js";
import { InvalidateCacheProps } from "../types/types.js";


export const connectDB = (uri: string)=> {
    mongoose.connect(uri, {
        dbName: "mern_rent"
    }).then(c=> console.log(`DB connected to ${c.connection.host}`)
    ).catch((e)=> console.log(e)
    )
};

export const invalidateCache = ({
    product,
    order,
    admin,
    userId,
    productId,
  }: InvalidateCacheProps) => {
    if (product) {
      const productKeys: string[] = [
        "latest-products",
        "categories",
        "all-products",
      ];
  
      if (typeof productId === "string") productKeys.push(`product-${productId}`);
  
      if (typeof productId === "object")
        productId.forEach((i: any) => productKeys.push(`product-${i}`));
  
      myCache.del(productKeys);
    }
    if (admin) {
      myCache.del([
        "admin-stats",
        "admin-pie-charts",
        "admin-bar-charts",
        "admin-line-charts",
      ]);
    }
  };