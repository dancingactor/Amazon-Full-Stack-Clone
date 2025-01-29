const backendUrl = "http://localhost:5000";

export const fetchBasket = async (token) => {
    try {
      const response = await fetch(`${backendUrl}/basket`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.ok) {
        const basket = await response.json();
        return basket.items;
      } else {
        console.error("Failed to fetch basket")
        return [];
      }
    } catch (error) {
      console.error("Error fetching basket", error);
      return [];
    }
  }

// add one product to basket
export const addToBasket = async (token, productId) => {
    try {
        const response = await fetch(`${backendUrl}/basket`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ productId })
        })
    
        const data = response.json();
        if (response.ok) {
            return data;
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
    
}