export const checkValidationRUles = function(request,response,rules){
    var v  = require("Validator").make(request,rules);
    if(v.fails()){
        var val_err = v.getErrors();
       for(var key in val_err){
        err = val_err[key][0];
        break;
       }
       res_data = {
        code: "0",
        message: err
       }
        response.send(res_data)       
    }else{
        return true
    }
}