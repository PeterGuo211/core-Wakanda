/**

* @author ouissam.gouni@4d.com

*/
function myLogin(userName, passwordOrKey, secondIsKey) {
    if (userName == "accepted-by-ls") {
        var expectedPwd = "password";
		var expectedPwdOrKey = secondIsKey ? directory.computeHA1(userName, expectedPwd) : expectedPwd;
        if (passwordOrKey == expectedPwdOrKey) {
            return {
                ID: "F4588AA9C176A54F87BDA781C59524F6",
                name: userName,
                fullName: "",
                belongsTo: ["Default"]
            };
        }
        else {
            return {
                error: 1024,
                errorMessage: "invalid password"
            };
        }
    }
    else if (userName == "rejected-by-ls") {
        var expectedPwd = "whatever";
        var expectedPwdOrKey = secondIsKey ? directory.computeHA1(userName, expectedPwd) : expectedPwd;
        if (passwordOrKey == expectedPwdOrKey) {
            return {
                error: 1024,
                errorMessage: "invalid login"
            };
        }
        else {
            return {
                ID: "18F78016FA1C38498755BD07951DEA9B",
                name: userName,
                fullName: "",
                belongsTo: ["Default"]
            };
        }
    }
    else {
        return false;
    }

}