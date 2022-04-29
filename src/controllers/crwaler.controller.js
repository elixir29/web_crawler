const { fetchReviewData } = require("../services/crawler.service");

const getReviewData = async (req, res) => {
  // Trycatch for error handling
  try {
    const productURL = req.query.productURL;

    // return in case of no productURL is provided
    if (!productURL) {
      return res.status(401).json({ message: "Please enter Product URL" });
    }

    const reviewsData = await fetchReviewData(productURL);

    //if there are no reviews available for selected product
    if (reviewsData.length === 0)
      return res.status(422).json({ message: "No review exists" });

    return res.status(200).json(reviewsData);
  } catch (error) {
    //if the page url is wrong or there is no review
    if (JSON.stringify(error).length == 2) {
      return res
        .status(422)
        .json({ message: "No review data available on this page" });
    }

    //unknown reason error
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getReviewData };
