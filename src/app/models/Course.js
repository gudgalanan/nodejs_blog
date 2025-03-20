const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const Course = new Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imgage: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name", unique: true },
}, {
    _id: false,
    timestamps: true,
});


//Custom query helpers
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        //validate to prevent hacker =))))
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        })
    }
    return this;

}

//Add plugin
mongoose.plugin(slug);
Course.plugin(AutoIncrement)
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);