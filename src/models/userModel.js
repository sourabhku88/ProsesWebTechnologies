const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require:true,
        unique: true,
    },
    phone: {
        type: String,
        require:true,
        unique: true,
    },
    userName: {
        type: String,
        require:true,
        unique: true,
    },
    address: {
        street: {
            type: String,
            require:true,
        },
        city: {
            type: String,
            require:true,
        },
        pincode: {
            type: String,
            require:true,
        },
        landmark: {
            type: String,
            require:true,
        }
    },
    profilePic: {
        type:String,
    }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);

