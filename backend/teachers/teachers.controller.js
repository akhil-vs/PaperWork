const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const teacherService = require('./teachers.service');

router.get('/', listTeachers);
router.post('/class', createClass);
router.put('/class/:classId', updateClass);
router.delete('/class/:classId/', deleteClass);

function listTeachers(req, res, next) {
  console.log("TeachersController-listTeachers")
  teacherService.listTeachers()
  .then((result) => {
    if(result === 'false') {
      res.status(403).send({ detail: "You do not have the permission to perform this action" })
    } else {
      res.send(result);
    }
  })
}

function createClass(req, res, next) {
  console.log("TeacherController-createClass");
  teacherService.createClass(req.body)
  .then((result) => {
    if(!result) {
      res.status(403).send({ detail: "You do not have the permission to perform this action" });
    } else {
      console.log(result);
      res.status(201).send({ detail: "Class created successfully" })
    }
  })
  .catch(next)
}

async function updateClass(req, res, next) {
  console.log("TeacherController-updateClass");
  if(!req.params.classId) {
    res.status(400).send({ detail: "Class Id is required" });
  } else {
    teacherService.updateClass(req)
    .then((result) => {
      if(!result) {
        res.status(403).send({ detail: "You do not have the permission to perform this action" });
      } else if(result == 'updated') {
        console.log(result);
        res.status(202).send({ detail: "Class updated successfully" })
      }
    })
  }
}

async function deleteClass(req, res, next) {
  console.log("TeacverController-deleteclass");
  if(!req.params.classId) {
    res.status(400).send({ detail: "Class Id is required" });
  } else {
    teacherService.deleteClass(req)
    .then((result) => {
      if(!result) {
        res.status(403).send({ detail: "You do not have the permission to perform this action" });
      } else if(result == 'updated') {
        console.log(result);
        res.status(204).send({ detail: "Class deleted successfully" })
      }
    })
  }
}

module.exports = router;