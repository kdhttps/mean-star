const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
