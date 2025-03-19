const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/anan_edu_dev', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        console.log('Connected to MongoDB');
    } catch (e) {
        console.log('Fail to MongoDB');

    }
}

module.exports = { connect }