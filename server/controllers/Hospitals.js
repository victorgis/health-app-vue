const hospitals = require("../models/hospitals");
const asyncWrapper = require("../middleware/async");
const fs = require("fs");

//Get all hospitals /api/data
const getHospitals = asyncWrapper(async (req, res) => {
  // res.sendFile(path.resolve(__dirname, "../health-app-vue/dist/index.html"));
  const allHospitals = await hospitals.find({});
  const jsonData = allHospitals;

  // Convert JSON to GeoJSON
  const geoJsonData = {
    type: "FeatureCollection",
    features: jsonData.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.longitude, item.latitude],
      },
      properties: {
        id: item.id,
        name: item.name,
        phone: item.phone,
        email: item.email,
        longitude: item.longitude,
        latitude: item.latitude,
      },
    })),
  };

  // Write GeoJSON data to a file
  fs.writeFileSync("data.json", JSON.stringify(geoJsonData, null, 2));
  console.log("GeoJSON file created successfully!", geoJsonData);

  res.status(200).json({ success: true, data: geoJsonData });
});

//Create a new hospital /api/data/
// const createHospitals = async (req, res) => {
//   try {
//     const hospital = await hospitals.create(req.body);
//     res.status(201).json({ success: true, data: hospital });
//     console.log("hospital", hospital);
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };
const createHospitals = asyncWrapper(async (req, res) => {
  const hospital = await hospitals.create(req.body);
  res.status(201).json({ success: true, data: hospital });
});

//Get single hospital /api/data/id
const getSingleHospitals = asyncWrapper(async (req, res) => {
  const { id: hospitalID } = req.params;
  const singleHospital = await hospitals.findOne({ _id: hospitalID });
  if (!singleHospital) {
    return res
      .status(404)
      .json({ msg: `No hospital with the id of ${hospitalID}` });
  }
  res.status(200).json({ success: true, data: singleHospital });
});

//Update single hospital /api/data/id
const updateHospitals = asyncWrapper(async (req, res) => {
  const { id: hospitalID } = req.params;
  const updatedHospitals = await hospitals.findOneAndUpdate(
    { _id: hospitalID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedHospitals) {
    return res
      .status(404)
      .json({ msg: `No hospital with an id of ${hospitalID}` });
  }
  res.status(200).json(updatedHospitals);
});

//Delete single hospital /api/data/id
const deleteHospitals = asyncWrapper(async (req, res) => {
  try {
    const { id: hospitalID } = req.params;
    const deleteHospital = await hospitals.findOneAndDelete({
      _id: hospitalID,
    });
    if (!deleteHospital) {
      return res
        .status(404)
        .json({ msg: `No hospital with an id of ${hospitalID}` });
    }
    res.status(200).json({ success: true, data: deleteHospital });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

const editModal = (req, res)=>{
  // console.log("res",res)
}

module.exports = {
  getHospitals,
  createHospitals,
  getSingleHospitals,
  updateHospitals,
  deleteHospitals,
  editModal,
};
