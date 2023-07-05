import { createContext, useEffect, useState } from "react";

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

interface ProductContextProps {
  products: Product[];
}

export const ProductContext = createContext<ProductContextProps>({
  products: [],
});

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  // product state
  const [products, setProducts] = useState<Product[]>([]);

  //   fetch data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
