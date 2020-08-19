var mongoose =require("mongoose");
mongoose.connect('mongodb+srv://test:pass@cluster0.iz9hd.mongodb.net/Test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var conn=mongoose.connection;
var productSchema = new mongoose.Schema({
    product_name: String,
    description: String,
    product_image: String,
    user_name:String,
    amount:String,
    status:String
});
var proModel = mongoose.model('Products', productSchema);
module.exports=proModel;