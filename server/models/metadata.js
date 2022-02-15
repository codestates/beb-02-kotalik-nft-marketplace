import mongoose from 'mongoose';

const metadataSchema = new mongoose.schema({
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
    description:{
        type: String,
        required: true
    },
    attributes:{
        trait_type: String,
        value: String
    },
    date:{
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Metadata', metadataSchemas);