const {map} = require("./process");

exports.handlePoints = async (req, res) => {
    try{
        
        const id = req.params.id;
        
        // Checking if the id is contained within the stored ids
        if(map.has(id)){
            
            const receiptObj = map.get(id);
            let points = 0;

            // Checking retailer against alphanumeric regex
            // to find how many points should be added.
            const retailer = receiptObj.retailer;
            const alphanumericRegex = /[a-zA-Z0-9]/g;
            const size = retailer.match(alphanumericRegex);
            points += size.length;

            const total = receiptObj.total;

            // Checking if total is a round dollar amount with no cents.
            if(total == Math.floor(total)){
                points += 50;
            }
            // Checking if total is a multiple of 0.25
            if(total % .25 == 0){
                points += 25;
            }
            
            let itemArr = receiptObj.items;
            
            // Adding 5 points for every 2 items.
            points += Math.floor((itemArr.length / 2)) * 5;

            // Iterating through items to find which ones have a trimmed
            // length that's a multiple of 3.
            for(let i = 0; i < itemArr.length; i++){
                if(itemArr[i].shortDescription.trim().length % 3 == 0){
                    points += Math.ceil(0.2 * itemArr[i].price);
                }
            }


            const date = receiptObj.purchaseDate;

            // Checking if the purchase date is odd.
            if(parseInt(date.substring(date.length - 2)) % 2 != 0){
                points += 6;
            }

            const time = receiptObj.purchaseTime;

            // Checking if the time is between 2pm and 4pm. 
            if(parseInt(time.substring(0, 2)) >= 14 && parseInt(time.substring(0, 2)) <= 16){
                if((parseInt(time.substring(0,2)) == 16 && parseInt(time.substring(3)) == 0) ||
                parseInt(time.substring(0,2)) != 16){
                    points += 10;
                }
                
            }

            const obj = {points: points};
           
            return res.status(200).send(obj);
        }
        else{
            return res.status(404).send("No receipt found for that ID.")
        }
        
    }
    catch{
        return res.sendStatus(404)
    }
    
};

