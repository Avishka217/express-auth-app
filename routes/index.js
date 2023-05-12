const express = require('express');
const router = express.Router();
const registerRouter = require('./register')
const authRouter = require("./auth");


router.use('/',registerRouter);
router.use("/", authRouter);

var session;

router.get('/newurl',(req,res)=>{
	session = req.session;
	res.render('newurl',{username:session.userid});
	
})



module.exports = router;


