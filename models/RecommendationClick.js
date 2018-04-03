const mongoose = require('mongoose');

const { Schema } = mongoose;

const recommendationClickSchema = new Schema({
    recommendation: { type: Schema.Types.ObjectId, ref: 'recommendations' },
    clickTime: {type: Date, default: null}
});

module.exports = mongoose.model('recommendationClicks', recommendationClickSchema);