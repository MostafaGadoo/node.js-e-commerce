const joi = require("joi");

exports.isValid = (name, email, password, phone) =>{
    const clientSchema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().email().min(5).max(50).required(),
        password: joi.string().min(8).max(100).required(),
        phone: joi.string().length(11).required(),
    })

    const clientValidationResult = clientSchema.validate({name, email,password,phone});

    console.log(clientValidationResult);

    if(clientValidationResult.error){
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