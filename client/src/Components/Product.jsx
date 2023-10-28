import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';
import { getProductbyId } from '../api/products';

const Product = () => {
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchSelectedProduct = async () => {
      try {
        const response = await getProductbyId(productId);
        setSelectedProduct(response);
        setSelectedSize(response.products[0]);
      } catch (error) {
        setSelectedProduct(null);
      }
    };

    fetchSelectedProduct();
  }, [productId]);

  if (!selectedProduct) {
    return <h2 className="text-2xl font-bold mt-40">Loading</h2>;
  }

  const productSizes = selectedProduct.products;

  const handleSizeChange = (sizeProduct) => {
    setSelectedSize(sizeProduct);
  };

  console.log('selectedProduct: ', selectedProduct)

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h3 className="text-lg font-semibold mb-2">Category: {selectedProduct.name}</h3>
      <div className="flex flex-col md:flex-row items-center p-8 w-full max-w-6xl">
        <ProductImage src={selectedSize.image_url} alt={selectedProduct.name} />
        <ProductDetails
          id={selectedSize.id}
          name={selectedProduct.name}
          size={selectedSize.size}
          price={selectedSize.carrying_stores[0].price}
          quantity={selectedSize.carrying_stores[0].stock}
          selectedSize={selectedSize}
          productSizes={productSizes}
          onSizeChange={handleSizeChange}
        />
      </div>
    </div>
  );
};

export default Product;
