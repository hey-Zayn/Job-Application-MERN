const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log(`Database Connected Successfully ${mongoose.connection.host}`);
    }).catch(() => {
        console.log(`Database Error`);
    })
}


module.exports = connectDB;