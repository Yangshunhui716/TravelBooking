import cookies from "react-cookies";

export default function MyCartReducer(current, action) {
    switch (action.type) {
        case "UPDATE":
            let cart = cookies.load("cart") || null;
            if(cart!== null) {
                let totalAmount = 0;
                let totalQuantity = 0;
                for (let c of Object.values(cart)) {
                    let days = (c.durationDays && c.durationDays > 0 && c.type!=="tour") ? c.durationDays : 1;
                    totalAmount += c.quantity * c.price* days;
                    totalQuantity += c.quantity;
                }
                return { 
                    "totalAmount": totalAmount,
                    "totalQuantity": totalQuantity
                };
            }
        case "PAID":
            cookies.remove("cart");
            return {
                "totalAmount": 0,
                "totalQuantity": 0
            };
    }


    
      
    return current;
}