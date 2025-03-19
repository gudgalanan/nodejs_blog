const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // GET /home  
    async index(req, res, next) {
        try {
            const courses = await Course.find({});
            res.render('home', { courses: multipleMongooseToObject(courses) })
        } catch (err) {
            next(err);
        }
    }

    // GET /search  
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();  