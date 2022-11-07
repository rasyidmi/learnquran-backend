const submissionModel = require("../config/database/models").submission;
const moment = require("moment");

class SubmissionModel {
  static async get(submissionId) {
    const submission = await submissionModel.findOne({
      where: { id: submissionId },
    });

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

  static async giveScore(submissionId, userId, data) {
    const submission = await submissionModel.findOne({
      where: {
        id: submissionId,
        teacher_id: userId,
      },
    });
    if (!submission) return null;

    return await submission.update(data);
  }
}

module.exports = SubmissionModel;
