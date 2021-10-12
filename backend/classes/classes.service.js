const db = require('_helpers/db');
const accountService = require('../accounts/account.service');

module.exports = {
  currentUser,
  createClass,
  listClasses,
  updateClass,
  deleteClass,
}

async function currentUser() {
  console.log("TeacherService#15");
  const detail = accountService.currentUser();
  console.log(detail);
  return detail;
}

async function listClasses() {
  const detail = accountService.currentUser();
  if(detail.role == 'Student') {
    return false;
  } else {
    console.log("listClasses()");
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
    const existing = await db.Class.findOne({ grade: params.grade, division: params.division })
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