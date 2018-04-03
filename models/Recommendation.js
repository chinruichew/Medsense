const mongoose = require('mongoose');

const { Schema } = mongoose;

const recommendationSchema = new Schema({
    case: { type: Schema.Types.ObjectId, ref: 'cases' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    recommendationClicks: [{type: Schema.Types.ObjectId, ref: 'recommendationClicks'}]
});

module.exports = mongoose.model('recommendations', recommendationSchema);