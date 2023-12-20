// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "@/models/Product"; // import product model
import connectDB from "@/middleware/mongoose"; // import mongoose middleware

const handler = async (req, res, next) =>{
    
    let products = await Product.find();
    let tshirts = {};
    for (let item of products) {
        // if item is already present in the collection
        if(item.title in tshirts) {
            // If the item is present and the item does not contains the color and size then add it to the array so we can return the item
            if(!tshirts[item.title].color.includes(item.color) && item.availableQty > 0){
                tshirts[item.title].color.push(item.color);
            }

            if(!tshirts[item.title].size.includes(item.size) && item.availableQty > 0){
                tshirts[item.title].size.push(item.size);
            }
        }
        else{
            //Initaily tshirts object is empty so we need to fill it with data
            //if it is empty, then copy the whole product into tshirt object which will now contain an array of products
            //key here is the title of the product
            // like thsrits {title , size[] , color[], and so on}

            tshirts[item.title] = JSON.parse(JSON.stringify(item));
            if(item.availableQty > 0){
                tshirts[item.title].color = [item.color];
                tshirts[item.title].size = [item.size];
            }

        }
    }

    res.status(200).json({ tshirts });
}

export default connectDB(handler);
  