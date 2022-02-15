import mongoose from 'mongoose';

const userInfoSchema = new mongoose.schema({
    id:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('UserInfo', userInfoSchema);