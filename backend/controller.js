const scrapeProduct = require("./scrapers");

const controller = {
  getInfoFromUrl: async (req, res) => {
    try {
      const { Url } = req.body;
      const JSONResult = await scrapeProduct(Url);
      res.json(JSONResult);
    } catch (err) {
      res.status(500).json({ err: "An error occurred" });
    }
  },
};

module.exports = controller;
