const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const accountService = require('../accounts/account.service');

module.exports = {
  currentUser,
  createClass,
  listTeachers,
  updateClass,
  deleteClass,
}

async function currentUser() {
  console.log("TeacherService#15");
  const detail = accountService.currentUser();
  console.log(detail);
  return detail;
}

async function listTeachers() {
  const detail = accountService.currentUser();
  if(detail.role == 'Student') {
    return false;
  } else {
    console.log("listTeachers()");
    const listOfTeachers = db.Class.find();
    return listOfTeachers;
  };
}

async function createClass(params) {
  const detail = accountService.currentUser();
  if(detail.role != 'Teacher') {
    return false;
  } else {
    console.log("CreateClass()");
    console.log(params);
    const existing = await db.Class.findOne({ name: params.name })
    console.log(existing);
    if(existing) throw "Class already exists !"
    const newClass = db.Class(params);
    newClass.teachers.push({ id: detail.id, name: detail.firstName+' '+detail.lastName });
    await newClass.save();
    return true;
  };
}

async function updateClass(req) {
  const detail = accountService.currentUser();
  if(detail.role == 'Student') {
    return false;
  } else {
    console.log("updateClass()");
    console.log(req.params);
    db.Class.updateOne(
      { _id: req.params.classId },
      { $set: { name: req.body.name } }
    )
    .then((res) => {
      console.log(res);
    })
    return 'updated';
  }
}

async function deleteClass(req) {
  const detail = accountService.currentUser();
  if(detail.role == 'Student') {
    return false;
  } else {
    console.log("deleteClass()");
    console.log(req.params);
    db.Class.deleteOne(
      { _id: req.params.classId }
    )
    .then((res) => {
      console.log(res);
    })
    return 'updated';
  }
}