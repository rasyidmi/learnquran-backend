const submissionModel = require("../models/submission-model");
const firebaseStorage = require("../helpers/firebase-storage");
const Response = require("../dto/response");

class SubmissionController {
  static async uploadAudio(req, res, next) {
    const audioFile = req.file;
    const submissionId = req.params.id;

    try {
      const submissionInstance = await submissionModel.getById(submissionId);
      if (submissionInstance.dataValues.audio_file)
        // Delete current audio file
        await firebaseStorage.deleteFile(
          submissionInstance.dataValues.audio_file
        );

      const audioFileName = firebaseStorage.uploadFile(audioFile);
      await submissionModel.uploadAudio(submissionId, audioFileName);
      const response = Response.postResponse(
        "The system successfully uploaded the audio to the submission."
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getSubmissionDetail(req, res, next) {
    const params = req.query;
    try {
      const submissionInstance = await submissionModel.getByTaskAndStudent(
        params.task_id,
        params.student_id
      );
      const response = Response.getResponse(
        "The system successfully uploaded the audio to the submission.",
        submissionInstance
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async giveScore(req, res, next) {
    const userId = req.query.user_id;
    const submissionId = req.params.id;
    const data = req.body;

    try {
      await submissionModel.giveScore(submissionId, userId, data);
      const response = Response.postResponse(
        "The system successfully updated the submission score."
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SubmissionController;
