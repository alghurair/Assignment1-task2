var express = require('express');
var multer = require('multer');
var path = require("path");
var proModel=require('../modules/products')
var router = express.Router();

var product=proModel.find({});

router.use(express.static(__dirname+"./public/"));

var Storage= multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({
  storage:Storage
}).single('file');



/* GET home page. */
router.post('/upload', upload, function(req, res, next) {
var success =req.file.filename+ "uploaded";
  res.render('upload-file', { title: 'Ebay', success:success});

});




router.get('/upload', function(req, res, next) {

    res.render('upload-file', { title: 'Ebay', success:""});

});



router.get('/', function(req, res, next) {
  product.exec(function(err,data){
    if(err) throw err;
    res.render('index', { title: 'Ebay', records:data});
  });
});


router.get('/product', function(req, res, next) {
  product.exec(function(err,data){
    if(err) throw err;
    res.render('product', { title: 'Ebay', success:""});

  });
});

router.post("/product", upload, function(req, res, next){
  var proDetails = new proModel({
    description: req.body.des,
    product_image: req.file.filename,
    product_name: req.body.pname,
    status:"in-progress",
    user_name:"",
    amount:""
  }); 

  var success =req.file.filename+ "uploaded";
  proDetails.save(function(err, res1){
    product.exec(function(err,data){
      if(err) throw err;
      res.redirect('/')

    });


  });

});


router.get('/:id', function (req, res, next) {
  var id=req.params.id;
  var bid=proModel.findById(id);
  bid.exec(function(err,data){
    if(err) throw err;
    res.render('/', { title: 'Ebay', records:data});
  });
});


router.post('/', function (req, res, next) {
  var update=proModel.findByIdAndUpdate(req.body.id,{
    status:"completed",
  });
  update.exec(function(err,data){
    if(err) throw err;
    res.redirect("/");
  });
});










router.get('/bid/:id', function (req, res, next) {
  var id=req.params.id;
  var bid=proModel.findById(id);
  bid.exec(function(err,data){
    if(err) throw err;
    res.render('bid', { title: 'Ebay', records:data});
  });
});


router.post('/bid/', function (req, res, next) {
  var update=proModel.findByIdAndUpdate(req.body.id,{
    user_name:req.body.uname,
    amount:req.body.amt,
    status:"auctioned",

  });
  update.exec(function(err,data){
    if(err) throw err;
    res.redirect("/");
  });
});

module.exports = router;
