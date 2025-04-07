const { default: mongoose } = require("mongoose");



const LoginModel = new mongoose.Schema({
    userId:String,
    mpin:String,
    totp:String,
    api_key:String,
      
});

export const LoginSchema = mongoose.models.user || mongoose.model("user",LoginModel)

