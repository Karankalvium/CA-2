const express = require('express')
const Restaruant = require('../models/restaruant.model.js')
const Item = require('../models/items.model.js')
const router = express.Router();

router.get('/:id', async(req, res)=>{
    try{
    const restaruant = await Restaruant.findById(req.params.id).populate('items');
    if(!restaruant) return res.status(404).send("Restaruant not found");
    res.json(restaruant);
    }

    catch(err)
    {
        res.status(500).send(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
      const restaurant = new Restaruant(req.body);
      await restaurant.save();
      res.status(201).json(restaurant);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

router.patch('/:id',async(req, res)=>{
    try{
    const restaruant = await Restaruant.findByIdAndUpdate(req.params.id , req.body, {new: true})
    if(!restaruant) return res.status(404).send("Restaruant not found");
    res.json(restaruant);
    }

    catch(err)
    {
        res.status(500).send(err.message);
    }
});

router.delete('/:id' ,async(req,res)=>{
    try
    {
        const restaruant = await Restaruant.findByIdAndDelete(req.params.id);
        if(!restaruant) return res.status(404).send("Restaruant not found");
        res.send('Restaurant deleted');
    }

    catch(err)
    {
        res.status(500).send(err.message);
    }
});

module.exports = router;