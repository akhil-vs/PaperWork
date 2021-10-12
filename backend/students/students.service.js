const db = require('_helpers/db');
const accountService = require('../accounts/account.service');

module.exports = {
  currentUser,
  createStudents,
  listStudents,
  updateStudents,
  deleteStudents,
}

async function currentUser() {
  console.log("TeacherService#15");
  const detail = accountService.currentUser();
  console.log(detail);
  return detail;
}

async function listStudents(req) {
  const detail = accountService.currentUser();
  if(detail.role == 'Student') {
    return false;
  } else {
    console.log("listStudents()");
    if(!req.params) {
      const listOfStudents = db.Student.find();
      return listOfStudents;
    } else {
      const listOfStudents = db.Student.find({ classGrade: req.grade, division: req.division });
      return listOfStudents;
    }
  };
}

async function createStudents(params) {
  const detail = accountService.currentUser();
  if(detail.role != 'Teacher') {
    return false;
  } else {
    console.log("createStudents()");
    console.log("Params: "+params);
    const existing = await db.Student.findOne({ email: params.email })
    console.log("Existing: "+existing);
    if(existing) throw "Student email already exists !"
    const newStudent = db.Student(params);
    const theClass = await db.Class.findOne({ grade: params.classGrade, division: params.division })
    console.log(theClass);
    if(!theClass) throw "Class does not exists !"
    let newId;
    await newStudent.save()
    .then(savedStudent => {
      newId = savedStudent._id;
    })
    theClass.students.push({ id: newId, name: params.name, email: params.email });
    await theClass.save();
    return true;
  };
}

async function updateStudents(req) {
  const detail = accountService.currentUser();
  if(detail.role == 'Student') {
    return false;
  } else {
    console.log("updateStudents()");
    console.log("Params: "+req.params);
    db.Student.updateOne(
      { _id: req.params.studentId },
      { $set: { name: req.body.name } }
    )
    .then((res) => {
      console.log(res);
    })
    return 'updated';
  }
}

async function deleteStudents(req) {
  const detail = accountService.currentUser();
  if(detail.role == 'Student') {
    return false;
  } else {
    console.log("deleteStudents()");
    console.log("Params: "+req.params);
    db.Class.deleteOne(
      { _id: req.params.studentId }
    )
    .then((res) => {
      console.log(res);
    })
    return 'updated';
  }
}