const AWS = require('aws-sdk');
const { reject } = require('promise');

const aws_region = process.env.AWS_REGION;
const access_id = process.env.ACCESS_KEY_ID;
const access_secret_key = process.env.SECRET_ACCESS_KEY;

const dynamoDB = new AWS.DynamoDB.DocumentClient( {
    region : aws_region ,
    accessKeyId : access_id ,
    secretAccessKey : access_secret_key,
})


module.exports.fetchCategories = async()=>{
    const params = {
        TableName  : "categories"
    }

    return new Promise((resolve , reject)=>{
        dynamoDB.scan(params , function(err , data){
            if(err){
                console.log("Error" , err)
                reject(err)
    
            }else {
                const categories = {
                    totalCategories : data.Count,
                    categories : data.Items 
                }
                console.log(categories)
                resolve(categories)
            }
        })

    }) 
}

module.exports.fetchProducts = (categoryId)=>{
    return new Promise(async(resolve , reject)=>{
        
        const categoryProducts = await getcategoryProducts(categoryId)
        if(categoryProducts)
        {
            const params = {
                TableName: 'products',
                FilterExpression: 'categoryId = :cid',
                ExpressionAttributeValues: {
                  ':cid': parseInt(categoryId),
                },
              };
              
              dynamoDB.scan(params, (err, data) => {
                if (err) {
                  console.error('Unable to scan. Error:', JSON.stringify(err, null, 2));
                  reject(err)
                } else {
                  const items = data.Items;
                  categoryProducts.products = data.Items
                  console.log(categoryProducts);
                  resolve(categoryProducts)
                }
              });
        }else{
            reject({message : "Category not found"})
        }
    })
  
}

module.exports.saveProduct = (product)=>{
    const params = {
        TableName  : "products",
        Item : product
    }
    console.log(product)
    return new Promise((resolve , reject)=>{
        dynamoDB.put(params , function(err ){
            if(err){
                console.log("Error" , err)
                reject(err)
    
            }else {
                const message  = "Product has been Successfully saved "
                console.log(message)
                resolve(message)
            }
        })
    })
}

const getcategoryProducts = (categoryId)=>{
    return new Promise((resolve , reject)=>{

        const params = {
            TableName: 'categories',
            FilterExpression: 'categoryId = :cid',
            ExpressionAttributeValues: {
              ':cid': parseInt(categoryId),
            },
          };
          
          dynamoDB.scan(params, (err, data) => {
            if (err) {
              console.error('Unable to find the  product Id . Error:', JSON.stringify(err, null, 2));
              reject(err) 
            } else {
              const items = data.Items;
              resolve(items[0]) 
            }
          });
    })

} 