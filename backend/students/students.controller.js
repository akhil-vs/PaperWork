const express = require('express');
const router = express.Router();
const studentService = require('./students.service');

router.get('/', listStudents);
router.post('/', createStudents);
router.put('/:studentId', updateStudents);
router.delete('/:studentId', deleteStudents);

function listStudents(req, res, next) {
  console.log("StudentsController-listStudents")
  studentService.listStudents(req)
  .then((result) => {
    if(result === 'false') {
      res.status(403).send({ detail: "You do not have the permission to perform this action" })
    } else {
      res.send(result);
    }
  })
}

function createStudents(req, res, next) {
  console.log("StudentsController-createStudents");
  console.log(req);
  studentService.createStudents(req.body)
  .then((result) => {
    if(!result) {
      res.status(403).send({ detail: "You do not have the permission to perform this action" });
    } else {
      console.log(result);
      res.status(201).send({ detail: "Student created successfully" })
    }
  })
  .catch(next)
}

async function updateStudents(req, res, next) {
  console.log("StudentsController-updateStudents");
  if(!req.params.studentId) {
    res.status(400).send({ detail: "Student Id is required" });
  } else {
    studentService.updateStudents(req)
    .then((result) => {
      if(!result) {
        res.status(403).send({ detail: "You do not have the permission to perform this action" });
      } else if(result == 'updated') {
        console.log(result);
        res.status(202).send({ detail: "Student updated successfully" })
      }
    })
  }
}

async function deleteStudents(req, res, next) {
  console.log("StudentsController-deleteStudents");
  if(!req.params.studentId) {
    res.status(400).send({ detail: "Student Id is required" });
  } else {
    studentService.deleteStudents(req)
    .then((result) => {
      if(!result) {
        res.status(403).send({ detail: "You do not have the permission to perform this action" });
      } else if(result == 'updated') {
        console.log(result);
        res.status(204).send({ detail: "Student deleted successfully" })
      }
    })
  }
}

module.exports = router;