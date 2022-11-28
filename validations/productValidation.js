const joi = require("joi");

exports.isValid = (title, quantity) =>{
    const productsSchema = joi.object({
        title: joi.string().min(3).max(50).required(),
        quantity: joi.number().min(1).required()
    })

    const productsValidationResult = productsSchema.validate({title,quantity});

    console.log(productsValidationResult);

    if(productsValidationResult.error){
        return false;
    }
    return true;
    
}