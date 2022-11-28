const productModel = require('../models/clientModel');
const clientModel = require('../models/clientModel');
const procuctsValidation = require("../validations/productValidation");
const clientValidation = require("../validations/clientValidation");
const bcrypt = require("bcrypt");

exports.select = async (request, response) => {
    const clientSelect = await clientModel.select();
    return response.status(200).json(clientSelect);
}

exports.insert = async (request, response) =>{
    const {name, email,password,phone} = request.body;

    const isValid = clientValidation.isValid(name,email,password,phone);
    if(!isValid){
        return response.status(400).json("Invalid data");
    }

    const clientSelection = await clientModel.selectOne(email);
    if(clientSelection[0] != null){
        return response.status(400).json("Duplicated data");
    }

    const salt = bcrypt.genSaltSync(10);


    const hashedPassword = bcrypt.hashSync(password, salt);

    const insertAdmin = await clientModel.insert(name, email, hashedPassword,phone);

    return response.status(200).json("created");
}

exports.login = async(request, response)=>{
    const {email, password} = request.body;
    
    const loginDataValidation = clientValidation.loginValidation(email, password);

    if(!loginDataValidation ){
        return response.status(400).json("Invalid data");
    }

    const client = await clientModel.selectOne(email);

    if(client[0] != null){
       const isPassowrdMatches = await bcrypt.compareSync(password,client[0].password);
       if(isPassowrdMatches){
        return response.status(200).json("Login success");
       }else{
        return response.status(401).json("Invlaid password");
       }
    }else{
        return response.status(401).json("Invalid email");
    }
}

exports.ViewPoroducts= async(request, response) =>{
    const selectProducts = await productModel.select();
    return response.status(200).json(selectProducts);
}

exports.delete = async (request, response) => {
    const id = request.params.id;

    const clinets = await clientModel.selectOneById(id, '0');

    if(clinets[0] != null){
        const deletePorudct = await clientModel.delete(id);
        return response.status(200).json('deleted');
    }else{
        return response.status(400).json('invalid id');
    }
}

exports.restore = async (request, response) =>{
    const id = request.params.id;

    const clientRestorSelection = await clientModel.selectOneById(id,'1');

    if(clientRestorSelection[0] != null){
        const restorePorudct = await clientModel.restore(id);
        return response.status(200).json("Restored");
    }else{
        return response.status(400).json('invalid id');
    }
}

exports.update = async (request, response) => {
    // const id = request.params.id;
    const {name, email,password,phone} = request.body;

    const isValid = clientValidation.isValid(name, email,password,phone);
    if(!isValid){
        return response.status(400).json("Invalid data");
    }

    const clientSelection = await clientModel.selectOne(email,'0');
    if(clientSelection[0] != null){
    
        const isPassowrdMatches = await bcrypt.compareSync(password,clientSelection[0].password);
        
        if(isPassowrdMatches){
            // const salt = bcrypt.genSaltSync(10);

            // const hashedPassword = bcrypt.hashSync(clientSelection[0].password, salt);
            const clientUpdated = await clientModel.update(name,email,clientSelection[0].password,phone);
        return response.status(200).json("Updated");
        }else{
        return response.status(400).json('invalid Email');
    }
}
}