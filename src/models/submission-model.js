const { ApplicationError } = require("../helpers/error-template");
const submissionModel = require("../config/database/models").Submission;
const moment = require("moment");

class SubmissionModel {
  static async getById(submissionId) {
    const submission = await submissionModel.findOne({
      where: { id: submissionId },
    });
    if (!submission) throw new ApplicationError("Submission not found.", 404);
    return submission;
  }

  static async getByStudentAndTaskId(studentId, taskId) {
    const submission = await submissionModel.findOne({
      where: { student_id: studentId, task_id: taskId },
    });
    if (!submission) throw new ApplicationError("Submission not found.", 404);
    return submission;
  }

  static async getByTaskAndStudent(taskId, studentId) {
    const submission = await submissionModel.findOne({
      where: {
        task_id: taskId,
        student_id: studentId,
      },
    });
    if (!submission) throw new ApplicationError("Submission not found.", 404);
    return submission;
  }

  static async uploadAudio(submissionId, audioFileName) {
    const currentTime = moment();
    const submission = await submissionModel.findOne({
      where: {
        id: submissionId,
      },
    });

    await submission.update({
      audio_file: audioFileName,
      updated_date: currentTime,
    });
  }

  static async deleteAudio(submissionId) {
    const submission = await submissionModel.findOne({
      where: {
        id: submissionId,
      },
    });
    await submission.update({
      audio_file: null,
    });
  }

  static async giveScore(submissionId, userId, data) {
    const submission = await submissionModel.findOne({
      where: {
        id: submissionId,
        teacher_id: userId,
      },
    });
    if (!submission)
      throw new ApplicationError(
        "Submission not found or user is not the teacher.",
        404
      );
    return await submission.update(data);
  }

  static async checkStudentSubmission(studentId, submissionId) {
    const submission = await submissionModel.findOne({
      where: {
        id: submissionId,
        student_id: studentId,
      },
    });
    if (!submission)
      throw new ApplicationError("User is not the submission owner.");
    return submission;
  }
}

module.exports = SubmissionModel;
