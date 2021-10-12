const UserModel = require("../models/userModel");


function createUser(userData, result) {
  
        // commit image file
        let userModel = new UserModel({
            ...userData
        });

        UserModel.createUser(userModel, function(err, response) {
            if(err)
				result(err, response);
			else
				result(null, response);
        });
}


function getUser(email, result) {
    UserModel.getUser(email, function(err, response) {
        if(err)
        	result(err, response);
		else
			result(null, response);
    });
}

function checkEmail(email, result) {
    UserModel.checkEmail(email, function(err, response) {
        if(err)
        	result(err, response);
		else
			result(null, response);
    });
}


function updateUser(email, user, result) {
    UserModel.updateUser(email, user, function(err, response) {
        if(err)
        	result(err, response);
		else
			result(null, response);
    });
}


module.exports = { createUser, getUser, checkEmail, updateUser};

