module.exports = {
    multipleMongooseToObject: (mongooses) => {
        return mongooses.map(m => m.toObject())
    },
    mongooseToObject: (mongooses) => {
        return mongooses ? mongooses.toObject() : mongooses
    }
}