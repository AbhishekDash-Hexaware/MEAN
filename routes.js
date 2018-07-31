
const router = require("express").Router();

router.get('/test',(req,res)=>{
    res.send("hello server is running smooth");
});


module.exports =router;