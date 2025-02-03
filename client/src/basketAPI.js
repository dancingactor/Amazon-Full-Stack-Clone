const backendUrl = "https://amazon-clone-cjffgkhdh9cxanaj.japanwest-01.azurewebsites.net"

export const fetchBasket = async (token) => {
    try {
      const response = await fetch(`${backendUrl}/basket`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.ok) {
        const basket = await response.json();
        
        let product_list = [];
        for (let item of basket.items) {
            for (let i = 0; i < item.quantity; i++) {
                product_list.push(item.product);
            }
        }
        console.log("Product_list: ", product_list);
        return product_list;
        

      } else {
        throw new Error(`Failed to fetch basket (HTTP ${response.status})`)
      }
    } catch (error) {
        console.error("Error in fetchBasket:", error.message);
        throw new Error(`Basket fetch failed: ${error.message}`);
    }
  }

// add one product to basket
export const addToBasket = async (token, productId) => {
    try {
        const response = await fetch(`${backendUrl}/basket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ productId })
        })
    
        const data = response.json();
        if (response.ok) {
            console.log('Successfully add one product')
        } else {
            throw new Error(data.error || "Failed to add an item to basket")
        } 
    } catch (error) {
        console.error("Error adding to basket:", error);
        throw error;
    }
}

// remove one product from basket
export const removeFromBasket = async (token, productId) => {
    try {
        const response = await fetch(`${backendUrl}/basket`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ productId })
        })

        if (response.ok) {
            console.log('Successfully remove one product')
        } else {
            throw new Error("Failed to remove an item from basket")
        }
    } catch (error) {
        console.error("Error removing from basket:", error);
        throw error;
    }   
}