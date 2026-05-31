import cookies from "react-cookies";

export default function MyCartReducer(current, action) {
    switch (action.type) {
        case "UPDATE":
            let cart = cookies.load("cart") || null;
            if(cart!== null) {
                let totalAmount = 0;
                let totalQuantity = 0;
                for (let c of Object.values(cart)) {
                    totalAmount += c.quantity * c.price;
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