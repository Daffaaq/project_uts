import "./App.css";
import React, { useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Produk A",
      imageUrl: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2022/7/23/84c64253-f5b0-43e4-9073-377e45cee1e2.png",
      isStarred: false,
    },
    {
      id: 2,
      name: "Produk B",
      imageUrl: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2022/7/23/a2481a12-53b8-49fa-9c53-a3aec9d687f8.png",
      isStarred: false,
    },
    {
      id: 3,
      name: "Produk C",
      imageUrl: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2022/7/16/31710271-041e-4d6c-90db-a99389ca445a.png",
      isStarred: false,
    },
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleStarClick = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, isStarred: !product.isStarred };
      }
      return product;
    });

    setProducts(updatedProducts);

    const selectedProductIndex = selectedProducts.findIndex(
      (product) => product.id === productId
    );

    if (selectedProductIndex !== -1) {
      const newSelectedProducts = [...selectedProducts];
      newSelectedProducts.splice(selectedProductIndex, 1);
      setSelectedProducts(newSelectedProducts);
    } else {
      const newSelectedProduct = products.find(
        (product) => product.id === productId
      );
      setSelectedProducts([...selectedProducts, newSelectedProduct]);
    }
  };

  return (
    <div className="product-list">
      <div style={{display: 'flex'}} >
        <div className="product-grid">
          {products
            .filter((product) => !product.isStarred)
            .map((product) => (
              <div
                className={`card ${
                  selectedProducts.some((p) => p.id === product.id)
                    ? "card--selected"
                    : ""
                }`}
                key={product.id}
              >
                <img src={product.imageUrl} alt={product.name} />
                <div className="desc">
                  <h3>{product.name}</h3>
                  <span
                    className={`star ${
                      product.isStarred ? "star--yellow" : "star--gray"
                    }`}
                    onClick={() => handleStarClick(product.id)}
                  >
                    &#9734;
                  </span>
                </div>
              </div>
            ))}
        </div>
        {selectedProducts.length > 0 && (
          <div className="selected-products">
            {selectedProducts.map((product) => (
              <div className="card" key={product.id}>
                <img src={product.imageUrl} alt={product.name} />
                <div className="desc">
                  <h3>{product.name}</h3>
                  <span
                    className={`star ${
                      product.isStarred ? "star--gray" : "star--yellow"
                    }`}
                    onClick={() => handleStarClick(product.id)}
                  >
                    &#9734;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;