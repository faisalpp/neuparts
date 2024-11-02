const mongoose = require('mongoose')

const NeulinkSchema = new mongoose.Schema(
  {
    token: { type: String , required:true },
    valid_until: { type: String, required: true },
    updated_after: {type: String}
  },
  { timestamps: true }
);

module.exports = mongoose.models.Neulink || mongoose.model('Neulink', NeulinkSchema);
