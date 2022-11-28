const adminModel = require('../models/adminModel');
const productModel = require('../models/productsModel');
const adminValidation = require("../validations/adminValidation");
const productValidation = require("../validations/productValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 
exports.select = async (request, response) => {
    const selectedAdmins = await adminModel.select();
    return response.status(200).json(selectedAdmins);
}


exports.add = async (request, response) => {
    
    const {name, email,password} = request.body;

    // check if the data is valid
    const isValid = adminValidation.isValid(name,email,password);
    
    if(!isValid){
        return response.status(400).json("Invalid data");
    }

    // check the duplication
    const adminSelection = await adminModel.selectOne(email);
    if(adminSelection[0] != null){
        return response.status(400).json("Duplicated data");
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const insertAdmin = await adminModel.insert(name, email, hashedPassword);

    return response.status(200).json("created");
}

exports.login = async(request, response)=>{
    const {email, password} = request.body;
    
    const loginDataValidation = adminValidation.loginValidation(email, password);

    if(!loginDataValidation ){
        return response.status(400).json("Invalid data");
    }

    const admin = await adminModel.selectOne(email);

    if(admin[0] != null){
       const isPassowrdMatches = await bcrypt.compareSync(password,admin[0].password);
       if(isPassowrdMatches){
        jwt.sign({
            email: admin[0].email,
            name: admin[0].name,
            userType: 'admin'
        },'mostafa1234',{},(err, token) => {
            console.log(token);
            return response.status(200).json({
                msg: "Login Success",
                token
            });
        })
       }else{
        return response.status(401).json("Invlaid password");
       }
    }else{
        return response.status(401).json("Invalid email");
    }
}


exports.ProductInsert = async (request, response) =>{
    const {title, quantity} = request.body;
    const isValid = productValidation.isValid(title,quantity);
    if(!isValid){
        return response.status(400).json("Invalid data");
    }

    const productSelection = await productModel.selectOneByName(title, '0');
    if(productSelection[0] != null){
        return response.status(400).json("Duplicated data");
    }

    const productInsertion = await productModel.insert(title, quantity);

    return response.status(200).json("Product inserted");
}

exports.UpdateProduct = async (request, response) => {
    const id = request.params.id;
    const {title, quantity} = request.body;

    const isValid = productValidation.isValid(title, quantity);
    if(!isValid){
        return response.status(400).json("Invalid data");
    }

    const productSelection = await productModel.selectOneById(id,'0');
    if(productSelection[0] != null){
        const productUpdate = await productModel.update(id,title,quantity);
        return response.status(200).json("Updated");
    }else{
        return response.status(400).json('invalid id');
    }
}

exports.DeleteProduct =async (request, response) =>{
    const id = request.params.id;

    const productSelection = await productModel.selectOneById(id, '0');
    
    if (productSelection[0] != null) {
        const deleteProduct = await productModel.delete(id);
        return response.status(200).json('Deleted');
    }else{
        return response.status(400).json('Invalid Id');
    }
}

exports.RestoreProduct =async (request, response) =>{
    const id = request.params.id;

    const productSelection = await productModel.selectOneById(id, '1');
    
    if (productSelection[0] != null) {
        const restoreProduct = await productModel.restore(id);
        return response.status(200).json('Product restored');
    }else{
        return response.status(400).json('Invalid Id');
    }
}

exports.ProductView = async (request, response) => {
    const selectProducts = await productModel.select();
    return response.status(200).json(selectProducts);
}

exports.delete = async(request, response) =>{
    const id = request.params.id;

    const adminSelection = await adminModel.selectOneById(id, '0');
    
    if (adminSelection[0] != null) {
        const deleteAdmin = await adminModel.delete(id);
        return response.status(200).json('Deleted');
    }else{
        return response.status(400).json('Invalid Id');
    }
}

exports.restore = async(request, response) => {
    const id = request.params.id;

    const adminSelection = await adminModel.selectOneById(id, '1');
    
    if (adminSelection[0] != null) {
        const restoredAdmin = await adminModel.restore(id);
        return response.status(200).json('Admin restored');
    }else{
        return response.status(400).json('Invalid Id');
    }
}