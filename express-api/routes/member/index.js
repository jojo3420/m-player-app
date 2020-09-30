const express = require('express');
const { Member } = require('../../models')
const router =  express.Router();


router.post('/', async (req, res, next) => {
  const { email, pw } = req.body;
  console.log({ email })
  try {
    const member = await Member.findOne({
      attributes: [
        'id', 'email', 'username', 'mobile', 'createdAt'
      ],
      where: {
        email, pw
      }
    });
    res.json({
      status: 200,
      member
    })

  } catch (err) {
    console.log({ err })
  }

});



module.exports = router;
