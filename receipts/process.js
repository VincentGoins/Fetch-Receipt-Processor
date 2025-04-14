
const {v6} = require("uuid");
const map = new Map();

const handleProcess = async (req, res) =>{
    try{
        
        const receiptInfo = req.body;

        // Checking if all necessary parts of the receipt are present on it.
        if(!("retailer" in receiptInfo) || !("purchaseDate" in receiptInfo) || !("purchaseTime" in receiptInfo) || !("items" in receiptInfo) || !("total" in receiptInfo)){
            return res.status(400).send("The receipt is invalid.");
        }

        // Checking if retailer format is correct.
        const retailerFormat = new RegExp('^[\\w\\s\\-&]+$');
        if(!retailerFormat.test(receiptInfo.retailer)){
            console.log("Retailer failed");
            return res.status(400).send("The receipt is invalid.");
        }

        // Checking if date format is correct. 
        const dateFormat = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$');
        if(!dateFormat.test(receiptInfo.purchaseDate)){
            console.log("Date failed " + receiptInfo.purchaseDate);
            return res.status(400).send("The receipt is invalid.");
        }

        // Checking if time format is correct. 
        const timeFormat = new RegExp('^[0-9]{2}:[0-9]{2}$');
        if(!timeFormat.test(receiptInfo.purchaseTime) || (parseInt(receiptInfo.purchaseTime.toString().substring(0, 2)) > 23) ||
        (parseInt(receiptInfo.purchaseTime.toString().substring(3)) > 59)){
            console.log("Time failed " + receiptInfo.purchaseTime);
            return res.status(400).send("The receipt is invalid.");
        }

        // Checking if there is at least one item in the items list.
        if(receiptInfo.items.length < 1){
            return res.status(400).send("The receipt is invalid.");
        }

        // Checking if the total format is correct.
        const totalFormat = new RegExp('^\\d+\\.\\d{2}$');
        if(!totalFormat.test(receiptInfo.total)){
            console.log("Time failed " + receiptInfo.purchaseTime);
            return res.status(400).send("The receipt is invalid.");
        }

        // Checking if the items within the items list are formatted correctly.
        const itemArr = receiptInfo.items;
        const descriptionFormat = new RegExp('^[\\w\\s\\-]+$');
        const priceFormat = new RegExp('^\\d+\\.\\d{2}$');
        for(let i = 0; i < itemArr.length; i++){
            if(!("shortDescription" in itemArr[i]) || !("price" in itemArr[i])){
                return res.status(400).send("The receipt is invalid.");
            }

            if(!descriptionFormat.test(itemArr[i].shortDescription) || !priceFormat.test(itemArr[i].price)){
                return res.status(400).send("The receipt is invalid.");
            }
            
        }

        // Getting random Id.
        const receiptID =  v6();
     
        // Storing it for retrieval to verify.
        map.set(receiptID, receiptInfo);
        
        // Id object
        let obj = {id: receiptID};
        
        return res.status(200).send(obj);
    }
    catch{
        return res.status(400).send("The receipt is invalid.");
    }
};
  
module.exports = {handleProcess, map};





