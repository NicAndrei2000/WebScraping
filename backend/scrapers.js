const puppeteer = require("puppeteer");
const fs = require("fs");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

async function scrapeProduct(url) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const imageElement = await page.$("img");
    let imageUrl;

    if (imageElement) {
      const imageSrc = await imageElement.getProperty("src");
      imageUrl = await imageSrc.jsonValue();
    }

    // The function (contentArray) returns the main title and content of the site.

    // To extract the content I decided to use the "font-size" property. I noticed that all the items on the website given as an example have a uniform layout in terms of text size.
    // Paragraphs have a certain font-size, headings have a certain font-size.
    // All main headings have font-size:36px. So I searched for the title by checking with "font-size" and selected the next <div> that follows it.
    // In that <div> is the content I need to extract.

    // Standard sizes I have observed
    //Main heading - font-size: 36px
    //Heading - font-size: 24px
    //Paragraph - font-size: 16px

    const contentArray = await page.evaluate(() => {
      let result = [];

      const divWithFontSize36 = Array.from(
        document.querySelectorAll("div")
      ).filter((div) => {
        const style = window.getComputedStyle(div);
        return style && style.fontSize == "36px";
      });

      if (divWithFontSize36.length > 0) {
        const targetDiv = divWithFontSize36[0];

        const elements = Array.from(targetDiv.nextElementSibling.children);

        let currentHeading = "";
        let currentParagraph = "";

        elements.forEach((childDiv) => {
          const fontSize = window.getComputedStyle(childDiv).fontSize;

          if (fontSize == "24px") {
            if (currentHeading) {
              result.push({
                heading: currentHeading,
                paragraph: currentParagraph.trim(),
              });
            }
            currentHeading = childDiv.innerText.trim();
            currentParagraph = "";
          } else if (fontSize == "16px") {
            currentParagraph += childDiv.innerText.trim();
          }
        });
        if (currentHeading) {
          result.push({
            heading: currentHeading,
            paragraph: currentParagraph.trim(),
          });
        }
      }

      let content = {
        title: divWithFontSize36[0].innerText.trim(),
        text: result,
      };
      return content;
    });

    // In sentimentalText we have concatenated all the content in the paragraphs to enhance the sentimental analysis

    data = contentArray;
    let sentimentalText;
    data.text.forEach((object) => {
      sentimentalText = sentimentalText + object.paragraph;
    });
    const sentimentResult = await sentiment.analyze(sentimentalText);

    // Final object containing all necessary information
    
    let finalObject = {
      title: data.title,
      text: data.text,
      imageURL: imageUrl,
      sentimentCoefficient: sentimentResult.comparative,
    };
    browser.close();

    return finalObject;
  } catch (err) {
    console.error("Something went wrong" + err);
  }
}

module.exports = scrapeProduct;
