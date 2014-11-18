/**

* @author ouissam.gouni@4d.com

*/

function mySolutionLogin(userName, password){
 if (userName == "accepted-by-ls-1" && password == "password") {
        return {
            ID: "F4588AA9C176A54F87BDA781C59524F6",
            name: userName,
            fullName: "",
            belongsTo: ["Default"]
        };
    }
    else if (userName == "rejected-by-ls-1" && password == "whatever") {
        return {
            error: 1024,
            errorMessage: "invalid login"
        };
    }else if (userName == "check-storage") {
        return {
            ID: "AE0C207836088845B764C5A6BB3286A2",
            name: userName,
            fullName: "",
            belongsTo: ["Default"],
             storage:{
                    prop1: "value1",
                    prop2: "value2"
                        //in the user session, sessionStorage.prop1
                        //will contain "value1"
                }
        };
    }
    else {
        return false;
    }
}
