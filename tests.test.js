// Valid receipt test 1.
test("Valid receipt! #1", async () => {
    const processResult = await fetch("http://localhost:3000/receipts/process", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
          {
            "retailer": "Target",
            "purchaseDate": "2022-01-01",
            "purchaseTime": "13:01",
            "items": [
              {
                "shortDescription": "Mountain Dew 12PK",
                "price": "6.49"
              },{
                "shortDescription": "Emils Cheese Pizza",
                "price": "12.25"
              },{
                "shortDescription": "Knorr Creamy Chicken",
                "price": "1.26"
              },{
                "shortDescription": "Doritos Nacho Cheese",
                "price": "3.35"
              },{
                "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
                "price": "12.00"
              }
            ],
          
            "total": "35.35"
          }
        )
    });


    expect(processResult.status).toBe(200);      
    
    // Getting ID and passing it to the Points route
    const obj = await processResult.json();
    const id = obj.id;
    const pointsResult = await fetch(`http://localhost:3000/receipts/${id}/points`);
    
    expect(pointsResult.status).toBe(200);

  // Checking if points are correct.
  const points = await pointsResult.json();
  expect(points.points).toBe(28)
    
});

// Valid receipt test 2.
test("Valid receipt! #2", async () => {
  const processResult = await fetch("http://localhost:3000/receipts/process", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(
        {
          "retailer": "M&M Corner Market",
          "purchaseDate": "2022-03-20",
          "purchaseTime": "14:33",
          "items": [
            {
              "shortDescription": "Gatorade",
              "price": "2.25"
            },{
              "shortDescription": "Gatorade",
              "price": "2.25"
            },{
              "shortDescription": "Gatorade",
              "price": "2.25"
            },{
              "shortDescription": "Gatorade",
              "price": "2.25"
            }
          ],
          "total": "9.00"
        }
      )
  });

  expect(processResult.status).toBe(200);    
  
  // Getting ID and passing it to the Points route
  const obj = await processResult.json();
  const id = obj.id;
  const pointsResult = await fetch(`http://localhost:3000/receipts/${id}/points`);
  
  expect(pointsResult.status).toBe(200);

  // Checking if points are correct.
  const points = await pointsResult.json();
  expect(points.points).toBe(109)
  
});

// Invalid Test 1
test("Has invalid receipt formatting! (No retailer!)", async () => {
  const processResult = await fetch("http://localhost:3000/receipts/process", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(
      {
        
        "purchaseDate": "2022-03-20",
        "purchaseTime": "14:33",
        "items": [
          {
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          }
        ],
        "total": "9.00"
      }
    )
});

expect(processResult.status).toBe(400);    
});

// Invalid Test 2
test("Has invalid receipt formatting! (Price is missing for an item!)", async () => {
  const processResult = await fetch("http://localhost:3000/receipts/process", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(
      {
        "retailer": "M&M Corner Market",
        "purchaseDate": "2022-03-20",
        "purchaseTime": "14:33",
        "items": [
          {
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",
            "price": "2.25"
          },{
            "shortDescription": "Gatorade",

          }
        ],
        "total": "9.00"
      }
    )
});

expect(processResult.status).toBe(400);    
});