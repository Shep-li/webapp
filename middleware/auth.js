const bcrypt = require("bcrypt");
const { getUser } = require("../user/controller");

async function basicAuth(req, res, next) {
    
	// make Craete User  path public
    if ((req.path === '/user' || req.path === '/') && req.method.toLowerCase() === 'post') {
        return next();
    }
	//console.log(req.path);
	
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    
	getUser(email, async  function(err, response) {
        if(err){
			res.status(500);
			return res.json({status: 500, message: err});
		}
        if(response == null || response.length == 0){
				return res.status(401).json({ message: 'Invalid Authentication Credentials' });	
		}
		
		user = response[0];
		
		const validPassword = await bcrypt.compare(password, user.password);
		if (validPassword) {
			res.status(401).json({ message: "Invalid Password" });
		} else {
		
			// attach user to request object
			req.user = user
			next();		
		}
    
	});
	
}


module.exports = basicAuth;