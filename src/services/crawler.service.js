const puppeteer = require("puppeteer");

const getData = async (page) => {
  const grabParagraph = await page.evaluate(async () => {
    const reviewClass = document.getElementById("customerReviews");
    const allUserReviews = reviewClass.querySelectorAll("#customerReviews");
    const userReviews = [];
    allUserReviews.forEach((userReview) => {
      const nameDate = userReview.querySelectorAll(".reviewer dd");
      const allRatingsCat = userReview.querySelectorAll(".itemReview dt");
      const allRatingsVal = userReview.querySelectorAll(".itemReview dd");
      const reviewHeading = userReview.querySelectorAll(
        ".rightCol blockquote h6"
      )[0].innerText;
      const reviewBody = userReview.querySelectorAll(
        ".rightCol blockquote p"
      )[0].innerText;
      const name = nameDate[0].innerText;
      const date = nameDate[1].innerText;
      const ratingObj = {};
      allRatingsCat.forEach((item, idx) => {
        const cat = item.innerText;
        const val = parseFloat(allRatingsVal[idx].innerText.trim());
        ratingObj[cat] = val;
      });

      userReviews.push({
        name: name,
        date: date,
        rating: ratingObj,
        reviewHeading: reviewHeading,
        reviewBody: reviewBody,
      });
    });

    return userReviews;
  });
  return grabParagraph;
};

const fetchReviewData = async (productURL) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(productURL);
  const data = await getData(page);

  await browser.close();
  return data;
};

module.exports = { fetchReviewData };
