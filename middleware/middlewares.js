const jwt = require('jsonwebtoken');

exports.checkAuth = (request, response, next) => {
    // const token = request.body.token;
    const token = request.headers.authorization.split(' ')[1];
    console.log(token);
    if(token){
        jwt.verify(token, 'mostafa1234', {}, (err, decodedToken) => {
            if (err) {
                console.log(err);
                return response.status(401).json("authentication error");
            }
            console.log("Decoded token ::" ,decodedToken);
    
            response.decodedToken = decodedToken;
    
            next();
        })
    }else{
        return response.status(403).json("No token provided");
    }
   
}