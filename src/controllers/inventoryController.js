const uuid = require('uuid');
const { fetchCategories, fetchProducts, saveProduct } = require("../services/dynamo")
const inventoryController = {}

inventoryController.getCategories = async(req , res )=>{
    try{
        const categories = await fetchCategories()  
        res.json(categories)

    }catch(error){
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching category info');
    }
}


inventoryController.getCategoyProducts = async(req , res )=>{
    try{
        const categoryId = req.query.categoryId
        const products = await fetchProducts(categoryId)
        res.json(products)
    }catch(error){
        console.error('Error:', error);
        res.status(500).send(error.message)
    }
}

inventoryController.addProducts = async(req , res )=>{
    try{

        const product = req.body
        
        product.productId = uuid.v1()
        console.log(product.productId)
        const response = await saveProduct(product)
        res.json({message : response})

    }catch(error){
        console.error('Error:', error);
        res.status(500).send('An error occurred while adding product');

    }
}

module.exports = inventoryController;



