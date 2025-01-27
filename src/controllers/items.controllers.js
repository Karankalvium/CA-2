const express = require('express');
const Restaurant = require('../models/restaruant.model.js');
const Item = require('../models/items.model.js');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, price, restaurantId } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).send('Restaurant not found');

    const item = new Item({ name, price });
    await item.save();

    restaurant.items.push(item._id);
    await restaurant.save();

    res.status(201).json(item);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).send('Item not found');

    await Restaurant.updateMany({ items: item._id }, { $pull: { items: item._id } });

    res.send('Item deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;



