const express = require("express");
const router = express.Router();
const {
  getHospitals,
  createHospitals,
  getSingleHospitals,
  updateHospitals,
  deleteHospitals,
} = require("../controllers/Hospitals");

// router.get("/", getHospitals);
// router.post("/", createHospitals);
// router.get("/:id", getSingleHospitals)
// router.put("/:id", updateHospitals);
// router.delete("/:id", deleteHospitals);

router.route("/").get(getHospitals).post(createHospitals);
router
  .route("/:id")
  .get(getSingleHospitals)
  .patch(updateHospitals)
  .delete(deleteHospitals);

module.exports = router;
