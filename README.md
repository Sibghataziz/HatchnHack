# Create a vendor : POST request
    url : http://localhost:8080/vendor
    body : {
    "name" : "Hermit",
    "component" : "TVs",
    "sellingPrice" : 29999
    }
    
# Create Order : POST request
    url : http://localhost:8080/order
    body : {
    "customerName" : "MSA",
    "address" : "85, Elliot Road Kolkata-700016",
    "deliveryDate" : "2022-06-12",
    "productList" : [{
          "component" : "Mobile",
          "quantity" : 1
      },
      {
          "component" : "TVs",
          "quantity" : 1
      }]}
      
# View Order : GET request
    url : http://localhost:8080/order/6398c0ff7966397dc265731c
    
# Finalize order : PATCH request
    url: http://localhost:8080/order/6398c0ff7966397dc265731c
    body : {
    "status" : true
    }

# Mark as Delivered : PATCH request
    url : http://localhost:8080/order/markDelivered/6398c0ff7966397dc265731c
    body : {
    "status" : true
    }
  
# Add Review : PATCH request
    url : http://localhost:8080/order/createReviews/6398c0ff7966397dc265731c
    body : {
    "ratingList" : [
        {
            "deliveryRating" : 5,
            "overallRating" : 5
        },{
            "deliveryRating" : 5,
            "overallRating" : 5
        }
    ]}
