var express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");

var app = express();

app.use(cors());

const PORT = 5000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/Stoned_santa",
  { useNewUrlParser: true },
  function() {
    console.log("Connected to user database");
  }
);

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  eMail: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
var User = mongoose.model("User", UserSchema);

//   app.get('/',(req,res)=>{
//     res.sendFile(__dirname+"/add_task.html")
// })
/*
 *Sign Up
 */
app.post("/api/account/signup", (req, res, next) => {
  const { body } = req;
  const { firstName, lastName, password } = body;
  let { eMail } = body;
  if (!firstName) {
    //console.log('gadbad');
    return res.send({
      success: false,
      message: "Error: First Name cannot be blank"
    });
  }
  if (!lastName) {
    return res.send({
      success: false,
      message: "Error:Last Name cannot be blank"
    });
  }
  if (!eMail) {
    return res.send({
      success: false,
      message: "Error:Email cannot be blank"
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error:password cannot be blank"
    });
  }
  //console.log('error here')
  eMail = eMail.toLowerCase();

  //steps
  //1. verify email doesnt exist already
  //2. save
  User.find(
    {
      eMail: eMail
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error:server error"
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error:user already exist"
        });
      } else if (previousUsers.length == 0) {
        //save the new user
        const newUser = new User();

        newUser.eMail = eMail;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error:server error"
            });
          }
          return res.send({
            success: true,
            message: "Signed Up"
          });
        });
      }
    }
  );
});

// sign in user session

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
var UserSession = mongoose.model("UserSession", UserSessionSchema);

//api for sign in
app.post("/api/account/signin", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  var { eMail } = body;

  if (!eMail) {
    return res.send({
      success: false,
      message: "Error:Email cannot be blank"
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: password cannot b blank"
    });
  }
  eMail = eMail.toLowerCase();

  User.find(
    {
      eMail: eMail
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error"
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: invalid user"
        });
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: invalid password"
        });
      }

      //otherwise user session
      const newUserSession = new UserSession();
      newUserSession.userId = user._id;
      newUserSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        return res.send({
          success: true,
          message: "valid signin",
          token: doc._id
        });
      });
    }
  );
});

app.get("/api/account/verify", (req, res, next) => {
  //get the token
  const { query } = req;
  const { token } = query;
  // ?token=test

  //verify the token id one of a kind and not deleted
  UserSession.find(
    {
      _id: token,
      isDeleted: false
    },
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error:server error"
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid"
        });
      } else {
        return res.send({
          success: true,
          message: "good"
        });
      }
    }
  );
});

app.get("/api/account/logout", (req, res, next) => {
  //get the token
  const { query } = req;
  const { token } = query;
  // ?token=test

  //verify the token id one of a kind and not deleted
  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false
    },
    {
      $set: { isDeleted: true }
    },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error:server error"
        });
      }
      return res.send({
        success: true,
        message: "logged out"
      });
    }
  );
});
//   var mongooseDataBase= require('mongoose')
//   mongooseDataBase.Promise = global.Promise;
//   mongooseDataBase.connect("mongodb://localhost:27017/Main_database", { useNewUrlParser: true },()=>{
//       console.log('Connected to Main Database')
//   });

const DataBaseSchema = new mongoose.Schema({
  customerName: {
    type: String,
    default: ""
  },
  customerPhone: {
    type: String,
    default: ""
  },
  img: {
    type: String,
    default: ""
  },
  productType: {
    type: String,
    default: ""
  },
  sellingPrice: {
    type: String,
    default: false
  },
  costPrice: {
    type: String,
    default: ""
  },

  advancePaid: {
    type: String,
    default: ""
  },

  specification: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    default: ""
  },
  orderDate: {
    type: Date,
    default: Date.now()
  },
  deliverByDate: {
    type: Date,
    default: Date.now()
  }
});

var DataBase = mongoose.model("DataBase", DataBaseSchema);

app.post("/add/data", (req, res, next) => {
  const { body } = req;
  const {
    customerName,
    customerPhone,
    img,
    productType,
    sellingPrice,
    costPrice,
    advancePaid,
    specification,
    status,
    orderDate,
    deliverByDate
  } = body;
  if (!customerName) {
    console.log("gadbad");
    return res.send({
      success: false,
      message: "Error: Name cannot be blank"
    });
  }

  const newData = new DataBase();

  newData.customerName = customerName;
  newData.customerPhone = customerPhone;
  newData.img = img;
  newData.productType = productType;
  newData.costPrice = costPrice;
  newData.sellingPrice = sellingPrice;
  newData.advancePaid = advancePaid;
  newData.specification = specification;
  newData.status = status;
  newData.orderDate = orderDate;
  newData.deliverByDate = deliverByDate;
  newData.save((err, user) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: "Error:server error"
      });
    }
    return res.send({
      success: true,
      message: "Data Uploaded"
    });
  });
});

app.get("/receive/data/admin", (req, res, next) => {
  DataBase.find({}, (err, data) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error:server error",
        data: null
      });
    }
    if (data) {
      //console.log(data[0].customerName)
      return res.send({
        success: true,
        message: "Successfully data received",
        data
      });
    }
  });
});

app.delete("/delete", (req, res, next) => {
  var { id } = req.body;
  console.log(id);
  //console.log(query.id)
  DataBase.findOneAndDelete({ _id: id })
    .then((result, err) => {
      //console.log(result)
      if (!result) {
        return res.send({
          message: "not deleted 1"
        });
      } else {
        return res.send({
          deletedData: result
        });
      }
    })
    .catch(err => {
      console.log("ye error hai");
      //console.log(err)
    });
});

app.put("/update", (req, res) => {
  //console.log(req.body);
  var {
    id,
    customerName,
    customerPhone,
    productType,
    specification,
    status,
    sellingPrice,
    costPrice,
    advancePaid,
    orderDate
  } = req.body;

  DataBase.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: {
        customerName: customerName,
        customerPhone: customerPhone,
        productType: productType,
        specification: specification,
        status: status,
        orderDate: orderDate,
        sellingPrice: sellingPrice,
        costPrice: costPrice,
        advancePaid: advancePaid
      }
    },
    {
      returnOriginal: false
    }
  ).then(result => {
    return res.send(result);
  });
});

app.listen(PORT, () => {
  console.log("Magic happens on port 5000");
});
