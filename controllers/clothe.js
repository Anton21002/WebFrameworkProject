const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');

const Clothe = require('../models/Clothe');

const dbURI = 'mongodb+srv://'+ process.env.DBUSER +':'+ process.env.DBPASSWD +''+ process.env.CLUSTER +'.mongodb.net/'+ process.env.DB +'?retryWrites=true&w=majority'
mongoose.connect(dbURI)

router.get('/', (req,res) => {
    res.render("clothe/addOrEdit", {
        viewTitle : "Insert New Clothes"
    });
});

router.post('/', (req, res) => {
  if (req.body._id == '') {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

router.get('/list', (req, res) => {
    Clothe.find()
      .then(docs => {
        // console.log(docs);
        res.render('clothe/list', {
          list: docs
        });
      })
      .catch(err => {
        console.log('Error while retrieving data: ' + err);
      });
});

async function insertRecord(req, res) {
    try {
      const clothe = new Clothe({
        cloName: req.body.cloName,
        cloImgLink: req.body.cloImgLink,
        cloType: req.body.cloType,
        cloStyle: req.body.cloStyle,
        cloSizes: req.body.cloSizes,
        cloBrand: req.body.cloBrand,
        cloMat: req.body.cloMat,
        cloColorPrim: req.body.cloColorPrim,
        priceEuro: req.body.priceEuro,
        onDiscount: req.body.onDiscount,
      });
      await clothe.save();
      res.redirect('clothe/list');
    } catch (err) {
      console.log('Error during record insertion: ' + err);
    }
};


async function updateRecord(req, res) {
  try {
    await Clothe.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
    res.redirect('clothe/list');
  } catch (err) {
    console.log('Error during update: ' + err);
  }
}

// async function updateRecord(req, res) {
//   try {
//     const doc = await Clothe.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
//     // console.log('Updated doc:', doc);
//     res.redirect('clothe/list');
//   } catch (err) {
//     console.log('Error during update: ' + err);
//   }
// }


// router.get('/:id', async (req, res) => {
//   try {
//     const doc = await Clothe.findById(req.params.id);
//     res.render("clothe/addOrEdit", {
//       viewTitle: "Update Clothe Details",
//       clothe: doc
//     });
//   } catch (err) {
//     console.log('Error while retrieving data: ' + err);
//   }
// });

// update record
router.get('/:id', async (req, res) => {
  try {
    const clothe = await Clothe.findById(req.params.id);
    res.render('clothe/addOrEdit', {
      viewTitle: 'Update Clothe Details',
      clothe: clothe,
    });
  } catch (err) {
    console.log('Error while retrieving data: ' + err);
  }
});

//delete a cloth
// router.get('/delete/:id', (req, res) => {
//   Clothe.findByIdAndDelete(req.params.id, (err, doc) => {
//     if (!err) {
//       res.redirect('/clothe/list')
//     }
//     else {
//       console.log('Error in deleting item:' + err);
//     }
//   });
// });

router.get('/delete/:id', async (req, res) => {
  try {
    await Clothe.findByIdAndDelete(req.params.id);
    res.redirect('/clothe/list');
  } catch (err) {
    console.log('Error in deleting item: ' + err);
  }
});

module.exports = router;