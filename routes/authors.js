const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 * GET authors listing.
 */
router.get('/', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Create a new Author
 */
router.post('/', async (req, res) => {
  try {
    let author = new Author(req.body);
    author = await author.save({ new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/menos20colombia/', async (req, res) => {
  try {
    // let filters = { $and:[ pais: "Colombia", publicaciones: {$lte: 20}]};
    let filters = {  $and: [ { pais: "Colombia" }, { publicados: { $lte: 20 } } ]  };
    let projection = "nombre apellido";
    const authors = await Author.find(filters, projection);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/conapellido/', async (req, res) => {
  try {
    // let filters = { $and:[ pais: "Colombia", publicaciones: {$lte: 20}]};
    let filters = {    apellido: { $exists: true }    };
    let projection = "nombre";
    const authors = await Author.find(filters, projection);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/mas20oargentina/', async (req, res) => {
  try {
    // let filters = { $and:[ pais: "Colombia", publicaciones: {$lte: 20}]};
    let filters = {  $or: [ { pais: "Argentina" }, { publicados: { $gte: 20 } } ]  };
    let projection = "apellido";
    const authors = await Author.find(filters, projection);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
