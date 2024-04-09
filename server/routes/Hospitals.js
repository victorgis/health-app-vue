const express = require("express");
const router = express.Router();
const {
  getHospitals,
  createHospitals,
  updateHospitals,
  deleteHospitals,
} = require("../controllers/Hospitals");

// const {
//   getPeople,
//   createPerson,
//   createPersonPostman,
//   updatePerson,
//   deletePerson,
// } = require("../controllers/people");

// // router.get('/', getPeople)
// // router.post('/', createPerson)
// // router.post('/postman', createPersonPostman)
// // router.put('/:id', updatePerson)
// // router.delete('/:id', deletePerson)

// router.route("/").get(getPeople).post(createPerson);
// router.route("/postman").post(createPersonPostman);
// router.route("/:id").put(updatePerson).delete(deletePerson);

router.get("/", getHospitals);

router.post("/", createHospitals);

router.put("/:id", updateHospitals);

router.delete("/:id", deleteHospitals);

module.exports = router;
