import axios from 'axios';

export default async function handler(req : any, res: any) {
  const { fdate } = req.query;
  const API_URL = `https://nationalbank.kz/api/rss/get_rates.cfm?fdate=${fdate}`;

  try {
    const response = await axios.get(API_URL);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust to your needs
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error?.response.status).json({ error: error?.message });
  }
}
