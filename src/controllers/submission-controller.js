const submissionModel = require("../models/submission-model");
const firebaseStorage = require("../helpers/firebase-storage");
const Response = require("../dto/response");

class SubmissionController {
  static async uploadAudio(req, res, next) {
    const audioFile = req.file;
    const submissionId = req.params.id;

    try {
      const submissionInstance = await submissionModel.get(submissionId);
      if (submissionInstance.dataValues.audio_file != null) {
        // Delete current audio file
        await firebaseStorage.deleteFile(
          submissionInstance.dataValues.audio_file
        );
      }
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

  static async giveScore(req, res, next) {
    const userId = req.query.user_id;
    const submissionId = req.params.id;
    const data = req.body;

    try {
      const modelResponse = await submissionModel.giveScore(
        submissionId,
        userId,
        data
      );
      if (!modelResponse)
        return res
          .status(400)
          .json({ message: "User is not the teacher in the class." });

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
