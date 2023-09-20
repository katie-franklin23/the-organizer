import express from 'express';
import knex from '../db/connection'; 

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, start, end } = req.body;
    if (!title || !start || !end) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const [eventId] = await knex('events').insert({
      title,
      start,
      end,
    });

    res.status(201).json({ id: eventId, title, start, end });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await knex('events').select('*');
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
