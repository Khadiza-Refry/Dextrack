module.exports = function(handlebars) {
    return function(arr) {
        if (arr[0] == "glucose"){
            return ({link: "/Glucose_Level.png", unit: "mmol/L" , data: arr[1], comment: arr[3]})
        }

        else if (arr[0] == "insulin"){
            return ({link:"/Insulin.png", unit: "doses", data: arr[1], comment: arr[3]})
        }

        else if (arr[0] == "weight"){
            return ({link:"/Weight.png", unit: "kg", data: arr[1], comment: arr[3]})
        }
        
        else {
            return ({link:"/Exercise.png", unit: "steps",  data: arr[1], comment: arr[3]})
        }
    };
}