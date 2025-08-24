import React from 'react'
import Header from '../components/Layout/Header'
import ProductDetails from '../components/Products/ProductDetails'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data';
import { useState } from 'react';
import { useEffect } from 'react';
import Footer from '../components/Layout/Footer'
import SuggestedProduct from '../components/Products/SuggestedProduct'

const ProductDetailsPage = () => {
    const {name} = useParams();
    const [data,setData] = useState()
    const productName = name.replace(/-/g, " ");

    console.log(name)

    useEffect(() => {
        const normalize = str => str.toLowerCase().replace(/\s+/g, ' ').trim();
        const normalizedProductName = normalize(productName);
        const product = productData.find((i) => normalize(i.name) === normalizedProductName);
        setData(product);
    },[productName]);
    
  return (
    <div>
        <Header />
          <ProductDetails data={data} />
          {data && <SuggestedProduct data={data} />}
          <Footer />
    </div>
  )
}

export default ProductDetailsPage