const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    lastLoginTime: {
      type: Date,
      default: Date.now()
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
