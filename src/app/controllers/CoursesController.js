const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose');


class CoursesController {
    //GET /courses/:slug
    async show(req, res, next) {
        try {
            // Use findOne to get the course by slug  
            const courseDetail = await Course.findOne({ slug: req.params.slug });
            if (!courseDetail) {
                return res.status(404).send('Course not found');
            }
            res.render('courses/show', { courseDetail: mongooseToObject(courseDetail) });
        } catch (err) {
            next(err);
        }
    }

    //[GET] //courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] //courses/store
    store(req, res, next) {
        const course = new Course(req.body);
        course.save()
            .then(() => {
                res.redirect('/courses/' + course.slug);
            }).catch(err => { next(err); });
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                res.render('courses/edit', {
                    course: mongooseToObject(course)
                })
            })
            .catch(err => { next(err); });
    }

    //[PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/me/stored/courses/');
            }).catch(err => { next(err); });
    }

    //[DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => {
                res.redirect('/me/stored/courses/');
            }).catch(err => { next(err); })
    }

    //[DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('/me/trash/courses/');
            }).catch(err => { next(err); })
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => {
                res.redirect('/me/stored/courses/');
            }).catch(err => { next(err); })
    }
}

module.exports = new CoursesController();
