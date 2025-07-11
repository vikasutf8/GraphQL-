


const isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth =false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if(!token || token === ''){
        req.isAuth =false;
        return next();
    }
let decodeToken;
    try {
        decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {
        req.isAuth =false;
        return next();
    }

    if(!decodeToken){
        req.isAuth =false;
        return next();
    }

    req.isAuth =true;
    req.userId = decodeToken.userId;
    req.email = decodeToken.email;

    return next();

}

export default isAuth;