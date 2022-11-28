const joi = require("joi");

exports.isValid = (name, email, password) =>{
    const adminSchema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().email().min(5).max(50).required(),
        password: joi.string().min(8).max(100).required()
    })

    const adminValidationResult = adminSchema.validate({name, email,password});

    console.log(adminValidationResult);

    if(adminValidationResult.error){
        return false;
    }
    return true;
    
}

exports.loginValidation = (email, password)=>{
    const loginSchema = joi.object({
        email: joi.string().email().min(3).max(50).required(),
        password: joi.string().min(8).max(100).required()
    });

    const loginResult = loginSchema.validate({email,password});

    console.log(loginResult);

    if(loginResult.error){
        return false;
    }
    return true;
}