 const mongoose = require("mongoose");

 const hospitalsSchema = mongoose.Schema(
   {
     // user: {
     //   type: mongoose.Schema.Types.ObjectId,
     //   required: true,
     //   ref: 'User',
     // },
     name: {
       type: String,
       trim: true,
       required: [true, "Please add a text value"],
     },
     email: {
       type: String,
       trim: true,
       required: [true, "Please add a text value"],
     },
     phone: {
       type: String,
       required: [true, "Please add a number value"],
     },
     longitude: {
       type: Number,
       required: [true, "Please add a number value"],
     },
     latitude: {
       type: Number,
       required: [true, "Please add a number value"],
     },
     //  operational: {
     //     type: Boolean,
     //     default: false,
     //     required: [true, "Please choose true or false"]
     //  }
   },
   {
     timestamps: true,
   }
 );

 module.exports = mongoose.model("Hospitals", hospitalsSchema);