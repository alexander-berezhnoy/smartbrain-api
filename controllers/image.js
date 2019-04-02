const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "cd450a8676914f3c83ed45768d112276"
});
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Unable to work with API"));
};
// this.state.input);

const handleImage = db => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall
};