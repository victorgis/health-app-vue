const getHospitals = (req, res) => {
  res.json({ success: true, msg: "page loaded successfully" });
};

const createHospitals = (req, res) => {
  const { name } = req.body;
  //   res.json({ success: true, data: facility });
  console.log(req.body);
  if (name) {
    return res.status(200).json({ success: true, data: req.body });
  }

  res.status(401).send("Provide name");
  //   console.log(facility);
};

const updateHospitals = (req, res) => {
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
};

const deleteHospitals = (req, res) => {
  const { id } = req.params;
  const hospital = hospitals.find((hospital) => hospital.id === id);
  if (!hospital) {
    return res.status(404).json({ success: false, msg: "An error occured" });
  }
  const newHospital = hospitals.filter((hospital) => hospital.id !== id);
  return res.status(200).json({ success: true, data: newHospital });
};

module.exports = {
  getHospitals,
  createHospitals,
  updateHospitals,
  deleteHospitals,
};
