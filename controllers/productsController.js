const productsModel = require('../models/productsModel');
const productValidation = require("../validations/productValidation");
// const bcrypt = require("bcrypt");
 
exports.select = async (request, response) => {
    const selectProducts = await productsModel.select();
    return response.status(200).json(selectProducts);
}

exports.add = async (request, response) => {
    const {title, quantity} = request.body;

    // check if the data is valid
    const isValid = productValidation.isValid(title, quantity);
    
    if(!isValid){
        return response.status(400).json("Invalid data");
    }
    
    const products = await productsModel.selectOneByName(title, '0');
    console.log(`products:: ${products,title}`);

    if(products[0] != null){
        return response.status(400).json('Duplicated data');
    }

    const insertPoduct = await productsModel.insert(title, quantity);
        return response.status(200).json('Inserted');
}

exports.delete = async (request, response) => {
    const id = request.params.id;

    const products = await productsModel.selectOneById(id, '0');

    if(products[0] != null){
        const deletePorudct = await productsModel.delete(id);
        return response.status(200).json('deleted');
    }else{
        return response.status(400).json('invalid id');
    }
}

exports.restore = async (request, response) =>{
    const id = request.params.id;

    const productSelection = await productsModel.selectOneById(id,'1');

    if(productSelection[0] != null){
        const restorePorudct = await productsModel.restore(id);
        return response.status(200).json("Restored");
    }else{
        return response.status(400).json('invalid id');
    }
}

exports.update = async (request, response) => {
    const id = request.params.id;
    const {title, quantity} = request.body;

    const isValid = productValidation.isValid(title, quantity);
    if(!isValid){
        return response.status(400).json("Invalid data");
    }

    const productSelection = await productsModel.selectOneById(id,'0');
    if(productSelection[0] != null){
        const productUpdate = await productsModel.update(id,title,quantity);
        return response.status(200).json("Updated");
    }else{
        return response.status(400).json('invalid id');
    }
}
