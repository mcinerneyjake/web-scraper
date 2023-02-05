const PORT = 8500;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

const url = 'https://minnesotaplaylist.com/classified/auditions';

app.get('/classifieds', (req, res) => {
  axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    const auditionTitle = [];
    // const auditionDescription = [];
    // const auditionDatesAndLocations = [];

    $('.classified-title', html).each(function() {
      const title = $(this).text();
      const classifiedUrl = $(this).find('a').attr('href');
      auditionTitle.push({
        title,
        classifiedUrl,
      });
    });

    // $('.priceView-customer-price', html).each(function() {
    //   const description = $(this).text();
    //   auditionDescription.push({
    //     description,
    //   });
    // });

    // $('.priceView-customer-price', html).each(function() {
    //   const datesAndLocations = $(this).text();
    //   auditionDatesAndLocations.push({
    //     datesAndLocations,
    //   });
    // });
    res.json(auditionTitle);
  })
  .catch((error) => {
    console.log('Error in scraper axios request:', error);
  });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
