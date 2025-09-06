import React from 'react'
import Header from '../components/Layout/Header'
import ProductDetails from '../components/Products/ProductDetails'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import Footer from '../components/Layout/Footer'
import SuggestedProduct from '../components/Products/SuggestedProduct'
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
    const {products} = useSelector((state) => state.products);
    const {name} = useParams();
    const [data,setData] = useState()
    const productName = name.replace(/-/g, " ");

    console.log(name)

    useEffect(() => {
        const data = products && products.find((i) => i.name === productName);
        setData(data);
    },[]);
    
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