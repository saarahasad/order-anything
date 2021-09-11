const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const Order = require("../models/order");
const Item = require("../models/item");
const Catalogue = require("../models/catalogue");

// add a user/admin/delivery agent to database
router.post("/users", function (req, res, next) {
  Users.create(req.body)
    .then(function (users) {
      res.send(users);
    })
    .catch(next);
});

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// create order
router.post("/order", function (req, res, next) {
  var orderId = req.body.id;
  var items = req.body.items;
  let json_info = req;
 // console.log(items);
  var updated_req_body = req.body;
  updated_req_body["addresses"] = [];
  var itemsProcessed = 0;
  items.forEach((item) => {
    console.log(item.id);
    Item.find({ id: item.id }, function (err, data) {
      if (err) {
       console.log(err);
      } else {
       // console.log("First function call : ", data[0].category);
        Catalogue.find(
          { category_id: data[0].category },
          function (err, results) {
            if (err) {
              console.log(err);
            } else {
              var count = results.length;
             /* console.log(
                "Second function call : ",
                data[0].category,
                results[0].addresses[randomInteger(0, count)].address
              );*/
              updated_req_body["addresses"].push(
                results[0].addresses[randomInteger(0, count)].address
              );
              itemsProcessed++;
              if (itemsProcessed === items.length) {
                req["address"] = updated_req_body["address"];
                Order.create(req.body)
                  .then(function (orders) {
                    res.send(orders);
                  })
                  .catch(next);
              }
            }
          }
        );
      }
    });
  });
});

//get orders
router.get("/vieworder", function (req, res, next) {
  Order.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//get delivery agents
router.get("/viewdeliveryagents", function (req, res, next) {
  Users.find({ type: 3 }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/updatedeliveryagent", function (req, res, next) {
    Order.findOneAndUpdate({id:req.body.id}, {$set: {delivery_person_id: req.body.delivery_person_id }}, function (err, result) {
      if (err) {
        res1.send(err);
      } else {
        Order.create(result)
          .then(function (orders) {
           // console.log(orders,req.body.delivery_person_id);
            orders.delivery_person_id = req.body.delivery_person_id;
            res.send(orders);
          })
          .catch(next);
      }
    });
});

router.post("/updatestatus", function (req, res, next) {
  Order.findOneAndUpdate({id:req.body.id}, {$set: {status: req.body.status }}, function (err, result) {
    if (err) {
      res1.send(err);
    } else {
      Order.create(result)
        .then(function (orders) {
          //console.log(orders,req.body.status);
          orders.status = req.body.status;
          res.send(orders);
        })
        .catch(next);
    }
  });
});


module.exports = router;
