// const path = require('path');
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT;
const hospi = require("./routes/Hospitals");
const auth = require("./routes/auth");
const notFound = require("./middleware/not-found");

const app = express();

//important for seeing req.body
app.use(express.static("../health-app-vue/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/login", auth);
app.use("/api/data", hospi);
app.use("/editHospital", hospi);

app.use(notFound);
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

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {}
};
start();
