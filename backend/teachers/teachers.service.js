const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const accountService = require('../accounts/account.service');

module.exports = {
  currentUser
}

async function currentUser() {
  console.log("TeacherService#15");
  accountService.currentUser()
  .then((res) => {
    console.log("TeacherService#18" + res)
    return res;
  })
}