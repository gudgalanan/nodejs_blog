const Course = require('../models/Course')

const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {


        // if (req.query.hasOwnProperty('_sort')) {
        //     //validate to prevent hacker =))))
        //     const isValidType = ['asc', 'desc'].includes(req.query.type)
        //     courseQuery = courseQuery.sort({
        //         [req.query.column]: isValidType ? req.query.type : 'desc',
        //     })
        // }

        Promise.all([Course.find({}).sortable(req), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                });
            }).catch(err => { next(err); });
    }

    //[GET] /me/trash/courses
    async trashCourses(req, res, next) {
        try {
            const courses = await Course.findWithDeleted({ deleted: true });
            res.render('me/trash-courses', { courses: multipleMongooseToObject(courses) })
        } catch (err) {
            next(err);
        }
    }


}

module.exports = new MeController();
