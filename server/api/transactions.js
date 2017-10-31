const router = require('express').Router()
const { Transactions } = require('../db/models');
module.exports = router

router.get('/', (req, res, next) => {
  Transactions.findAll({ include: [{ all: true }] })
    .then(transaction => res.status(200).json(transaction))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Transactions.findById(req.params.id)
    .then(transactions => res.status(200).json(transactions))
    .catch(next);
})

//Get All Transactions by a given Teachable
router.get('/:teachable/', (req, res, next) => {
  const teachable = req.params.teachable; //Assuming this is an id number? Also works if stored as string?
  Transactions.findAll({ include: [{ all: true }] })
    .then(transactions => {
      var filteredTransactions = Transactions.filter(transaction => 
        (transaction.getTeachables().indexOf(teachable) != -1) // teachables: [5, 3, 88], so indexOf(3) != -1 //TODO: check the table 
      );
      res.status(200).json(filteredTransactions);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
  const info = req.body;
  Transactions.create({
    
    //Make sure to send as array of objects in body
  },
    { include: [{ all: true}]
    }).then(transaction => res.status(200).json(transaction))
  .catch(next)
})