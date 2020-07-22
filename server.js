const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Employee = require("./models/Employee");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/sealed", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<html><title>Hello World!</title>Hello World!</html>");
});

app.post("/add_employees", async (req, res) => {
  let errMsg = "";
  let _match = false;

  const session = await Employee.startSession();
  session.startTransaction();
  try {
    const opts = { session };

    if (req.body.length > 0) {
      for (let i = 0; i < req.body.length; i++) {
        await Employee.findOne({ login: req.body[i].login }).then((res) => {
          if (res) {
            errMsg = `User ${req.body[i].login} is already exists.`;
            _match = true;
          }
        });
      }
    } else {
      await Employee.findOne({ login: req.body.login }).then((res) => {
        if (res) {
          errMsg = `Employee ${req.body.login} is already exists.`;
          _match = true;
        }
      });
    }

    if (_match === false) {
      await Employee.insertMany(req.body, opts).then((val) => {
        res.status(200).json(val);
      });
    } else {
      res.status(400).send(errMsg);
    }
    await session.commitTransaction();
    session.endSession();
    return;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

app.get("/view_employees/:offset/:limit/:sort", (req, res) => {
  const offset = Number(req.params.offset);
  const limit = Number(req.params.limit);
  const param = req.params.sort.substr(1, req.params.sort.length - 1);
  let sort = req.params.sort.match(/^./);
  if (sort === "+") {
    sort = 1;
  } else {
    sort = -1;
  }

  Employee.find()
    .skip(offset)
    .limit(limit)
    .sort({ [param]: sort })
    .then((val) => res.status(200).json(val));
});

app.post("/edit_employees", async (req, res) => {
  const session = await Employee.startSession();
  session.startTransaction();
  try {
    const opts = { session };

    await Employee.findOneAndUpdate(
      {
        $or: [
          { name: req.body.name },
          { login: req.body.login },
          { id: req.body.id },
        ],
      },
      {
        name: req.body.name,
        login: req.body.login,
        id: req.body.id,
      },
      { new: true, useFindAndModify: false, session: session }
    ).then((val) => {
      res.status(200).json(val);
    });
    await session.commitTransaction();
    session.endSession();
    return;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

app.listen(port, () => console.log(`Server is running in 127.0.0.1:${port}`));
