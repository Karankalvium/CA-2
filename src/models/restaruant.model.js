const { mongo, default: mongoose } = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    items:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Items'}],
});

module.exports = mongoose.model('Restaruant', restaurantSchema)