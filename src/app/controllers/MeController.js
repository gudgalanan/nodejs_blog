const Course = require('../models/Course')

const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    async storedCourses(req, res, next) {
        try {
            const courses = await Course.find({});
            res.render('me/stored-courses', { courses: multipleMongooseToObject(courses) })
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new MeController();
