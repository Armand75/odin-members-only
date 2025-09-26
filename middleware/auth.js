function isAuthenticated(req, res, next){
    if(req.isAuthenticated){
        return next();
    }
    res.redirect('/login');
}

function isAdmin(req, res, next){
    if(req.user && req.user.is_admin){
        return next();
    }
    res.status(403).send('Forbidden: You do not have permission to perform this action.')
}

module.exports = {isAdmin, isAuthenticated}