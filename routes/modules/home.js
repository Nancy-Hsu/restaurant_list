const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurantModel')
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {

  const sort = {name: -1}
  Restaurant.find()
    .lean()
    .sort(sort)
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => {
      return res.render('error', { err })
    })
})


// body('keyword', '輸入錯誤').exists(),
//  const errors = validationResult(req);
// if (!errors.isEmpty()) {
//   // const error = errors.array()
//   // )
//   return res.status(400).json({ errors: errors.array() })
// }


///search routes
router.get('/search',(req, res) => {
  const keyword = req.query.keyword.trim()
  if (!keyword.length) {
    
}

  return Restaurant.find({
    '$or': [{ 'name': { '$regex': keyword, '$options': 'i' } }, { 'category': { '$regex': keyword, '$options': 'i' } }
    ]
  }).lean()
    .then(restaurants => {
      if (!restaurants.length) {
        
        return Restaurant.find().lean().then(restaurants => res.render('index', { restaurants, keyword, alert:true }))
      }
      res.render('index', { restaurants, keyword })
    }).catch(err => {
      return res.render('error', {  err})
    })
})



module.exports = router