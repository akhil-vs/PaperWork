const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const teacherService = require('./teachers.service');

router.post('/class', createClass);

// function createSchema(req, res) {
//   console.log("TeacherController-createSchema"+req);
// }

function createClass(req, res, next) {
  console.log("TeacherController-createClass");
  teacherService.createClass(req.body)
  .then((result) => {
    if(!result) {
      res.status(403);
      res.send({ detail: "You do not have the permission to perform this action" });
    } else {
      console.log(result);
      res.send({ detail: "Class created successfully" })
    }
  })
}

module.exports = router;