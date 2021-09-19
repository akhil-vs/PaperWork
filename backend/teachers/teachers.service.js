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
  createClass
}

async function currentUser() {
  console.log("TeacherService#15");
  const detail = accountService.currentUser();
  console.log(detail);
  return detail;
}

async function createClass(params) {
  const detail = accountService.currentUser();
  if(detail.role != 'Teacher') {
    return false;
  } else {
    console.log("TeacherService#27");
    console.log(params);
    const newClass = db.Class(params);
    newClass.teachers.push(detail.id);
    await newClass.save();
    return true;
  };
}