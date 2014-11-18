/**

* @author ouissam.gouni@4d.com

*/

function myProjectLogin(userName, password){
 if (userName == "accepted-by-ls-2" && password == "password") {
        return {
            ID: "F4588AA9C176A54F87BDA781C59524F6",
            name: userName,
            fullName: "",
            belongsTo: ["Default"]
        };
    }
    else if (userName == "rejected-by-ls-2" && password == "whatever") {
        return {
            error: 1024,
            errorMessage: "invalid login"
        };
    }
    else {
        return false;
    }
}