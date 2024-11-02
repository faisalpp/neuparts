const mongoose = require('mongoose')

const CronsSchema = new mongoose.Schema(
  {
    msg: { type: String ,required:true},
    body: { type: String ,required:true},
    status: { type: Boolean,required:true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Crons || mongoose.model('Crons', CronsSchema, 'crons');
