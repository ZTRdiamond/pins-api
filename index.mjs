import express from 'express';
import * as pinterest from '@myno_21/pinterest-scraper';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  const { keyword } = req.query;
  try { 
    res.setHeader("Content-Type", "application/json");
    const pins = await pinterest.searchPins(keyword);
    const result = JSON.stringify({
       author: "ZTRdiamond",
       status: 200,
       error: "none",
       totalData: pins.length,
       result: pins
    }, null, 2);
    res.send(result);
  } catch (error) {
    let result = JSON.stringify({
       author: "ZTRdiamond",
       status: 500,
       error: `Data '${keyword}' tidak dapat ditemukan!`
    }, null, 2);
    res.status(500).send(result);
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
