
function check_logged(req, res) {

    if (req.session.logged == undefined || req.session.logged == false)
    {
        res.redirect("/login?returnurl=" + req.url);
        return false; // Indica que se hizo redirect
    }
    
    return true; // Indica que el usuario está logueado
}

module.exports = check_logged;