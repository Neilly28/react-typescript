import { useState, useEffect } from "react";

interface Products {
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

const Products2 = () => {
  // product state
  const [products, setProducts] = useState<Products[]>([]);

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

  //   handlesearch
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  //   filter products
  const filteredProducts = products
    .sort((a, b) => (a.title < b.title ? -1 : 1))
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h1>react shop!</h1>
      <input
        type="text"
        placeholder="find your product..."
        onChange={handleSearch}
      />
      <h1>{searchTerm}</h1>
      {filteredProducts.map((product) => {
        return (
          <div>
            <h3>{product.rating.rate} out of 5 stars </h3>
            <p>{product.id}</p>
            <img style={{ maxHeight: "200px" }} src={product.image} alt="" />
            <p>{product.description}</p>
            <h2>{product.title}</h2>
            <p>${product.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Products2;
