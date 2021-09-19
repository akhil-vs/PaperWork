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

function createClass(req, res) {
  console.log("TeacherController-createClass");
  console.log(req);
  teacherService.currentUser()
  .then((result) => {
    console.log("TeacherController#20" + result)
    res.json(result)
  })
  .catch(next);
}

module.exports = router;