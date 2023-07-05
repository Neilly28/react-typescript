import { useState, useEffect } from "react";

interface Products {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

const Products = () => {
  // products state
  const [products, setProducts] = useState<Products[]>([]);

  //   fetch data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log({ data });
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <p>{product.id}</p>
            <img src={product.image} alt="" />
            <h2>{product.title}</h2>
            <h3>{product.price}</h3>
            <p>{product.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
