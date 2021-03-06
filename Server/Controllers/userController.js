const moment = require('moment')

module.exports = {
  getClassList: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.query;

    const classes = await db.getClassesByUserID(id)
    res.status(200).send(classes);
  },

  getUpcomingAssignments: async (req, res) => {
    const db = req.app.get('db');
    const { id, classid } = req.query
    let time = new Date();
    time = moment(time).format('YYYY-MM-DD')

    const assignments = await db.getUpcomingAssignments(id, classid, time)
    res.status(200).send(assignments)

  },


  getClassAssignments: async (req, res) => {
    const db = req.app.get('db');
    const { id, classid } = req.query
    let time = new Date();
    time = moment(time).format('YYYY-MM-DD')

    const assignments = await db.getAssignmentsByStudentId(id, classid, time)
    res.status(200).send(assignments)
  },

  getForumPosts: async (req, res) => {
    const db = req.app.get('db');
    const { classid } = req.query

    const forums = await db.getForumByClassID(classid);
    res.status(200).send(forums);
  },
  addForumPost: async (req, res) => {
    const db = req.app.get('db');
    const { id, classid, post } = req.body;
    let time = new Date();
    time = moment(time).format('YYYY-MM-DD hh:mm:ss')

    await db.addForumPost(id, classid, post, time);
    const forums = await db.getForumByClassID(classid);
    res.status(200).send(forums);
  },
  getAnnouncements: async (req, res) => {
    const db = req.app.get('db');
    const { classid } = req.query;

    const announcements = await db.getAnnouncementsByClass(classid);
    res.status(200).send(announcements);

  },
  getGradesById: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const grades = await db.getGradesForClassByStudentID(id);
    res.status(200).send(grades);
  },
  getRecentlyGraded: async (req, res) => {
    const db = req.app.get('db');
    const { id, classid } = req.query;

    const assignments = await db.getRecentGradedAssignments(id, classid)
    res.status(200).send(assignments);
  },

  submitAssignment: async (req, res) => {
    const db = req.app.get('db');
    const { id, assignmentId } = req.query;
    const { file } = req.body
    const assignment = await db.submitAssignment([id, assignmentId, file])
    res.status(200).send(assignment)
    console.log(res.data)
  },
  getClassTitle: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.query;
    const classes = await db.getClassTitle(id)
    res.status(200).send(classes);
  },

  getClassCount: async (req, res) => {
    let { ids } = req.body;
    const db = req.app.get('db');

    let studentCount = [];
    for (let i in ids) {
      const students = await db.getStudentCountByClassID(+ids[i]);
      studentCount.push(students.length);
    }
    res.status(200).send(studentCount);
  }

}
