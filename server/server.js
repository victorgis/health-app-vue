// const path = require('path');
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT;

// connectDB();

const app = express();

//important for seeing req.body
app.use(express.static("../health-app-vue/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// app.use("/api/facilities", require("./routes/facilityRoutes"));
// app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../health-app/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'health-app', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

app.post("/api/data", (req, res) => {
  const { name } = req.body;
  //   res.json({ success: true, data: facility });
  console.log(req.body);
  if (name) {
    return res.status(200).json({ success: true, data: req.body });
  }

  res.status(401).send("Provide name");
  //   console.log(facility);
});

app.put("/api/data/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  // res.json({})
  console.log(id, name);
  const hospital = hospitals.find((hospital) => hospital.id === id);
  const newHospital = hospital.map((hospital) => {
    if (hospital) {
      hospital.name = name;
      return hospital;
    }
  });
  res.status(200).json({ success: true, data: newHospital });
});

app.delete("/api/data/:id", (req, res) => {
  const { id } = req.params;
  const hospital = hospitals.find((hospital) => hospital.id === id);
  if (!hospital) {
    return res.status(404).json({ success: false, msg: "An error occured" });
  }
  const newHospital = hospitals.filter((hospital) => hospital.id !== id);
  return res.status(200).json({ success: true, data: newHospital });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
