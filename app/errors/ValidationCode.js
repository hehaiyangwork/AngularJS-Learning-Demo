

var validationCode = {
    user : {
        usernameWrong : 1001,
        passwordWrong : 1002,
        emailWrong : 1003,
        mobileWrong : 1004,

        usernameExist : 1011,
        passwordExist : 1012,
        emailExist : 1013,
        mobileExist : 1014,

        usernameNotFound : 1101,
        passwordNotMatch : 1102


    },

    token : {
        tokenNotFound : 1001,
        tokenDecodeWrong : 1005,
        tokenExpired : 1007
    }
};






module.exports = validationCode;