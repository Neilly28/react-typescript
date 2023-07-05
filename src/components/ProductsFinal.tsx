import React from "react";
import { useState, useEffect } from "react";

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductsFinal = () => {
  // products state
  const [products, setProducts] = useState<Product[]>([]);

  //   search state
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  //   handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  //   fetch search only
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Welcome to the Product Page</h1>
      <input
        type="text"
        placeholder="find your favorite"
        onChange={handleSearch}
      />
      {filteredProducts.map((product) => {
        const {
          id,
          image,
          title,
          description,
          rating: { rate },
        } = product;
        return (
          <div key={id}>
            <span>{rate}</span>
            <img style={{ height: "200px" }} src={image} alt="" />
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsFinal;
