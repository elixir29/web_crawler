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

const checkTotalReviews = async (page) => {
  const totalReviesString = await page.evaluate(async () => {
    const total = await document.querySelector("#reviewtab a span");
    return total.innerText;
  });
  const step1 = totalReviesString.split("(")[1];
  const final = parseInt(step1.toString().split(")")[0]);
  return parseInt(final / 5);
};

const getNewPageLink = async (page) => {
  const newLink = await page.evaluate(async () => {
    const grabLink = await document
      .querySelector(`a[title="Next"]`)
      .getAttribute("href");
    return grabLink || "no link";
  });
  return newLink.trim();
};

const fetchReviewData = async (productURL) => {
  const mainURL = `https://www.tigerdirect.com`;
  var baseURL = productURL;
  const ans = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(baseURL);
  const totalReviewsPagination = await checkTotalReviews(page);
  for (var i = 0; i <= totalReviewsPagination; i++) {
    const page = await browser.newPage();
    await page.goto(baseURL);
    const data = await getData(page);
    ans.push(...data);
    if (i !== totalReviewsPagination) {
      const newPageLink = await getNewPageLink(page);
      baseURL = mainURL + newPageLink;
    }
  }
  await browser.close();
  return ans;
};

module.exports = { fetchReviewData };
