import React, { ReactElement, useState, useEffect } from "react";
import Sidebar from "components/UI/Sidebar";
import Layout from "components/UI/Layout";
import Navbar from "components/UI/Navbar";
import FooterSmall from "components/UI/FooterSmall";
import Image from "next/image";
import { Product } from "lib/product";
import { GetServerSideProps } from 'next'


interface IViewProductProps {
  product: Product;
}

const ViewProduct: React.FunctionComponent<IViewProductProps> = ({
  product,
}): ReactElement => {

  return (
    <Layout title="View Product">
      <Sidebar />
      <div className="flex flex-col h-screen justify-between relative md:ml-64 bg-blueGray-100">
        <Navbar title="View Product" />
        <div className="relative bg-primary md:pt-32 pb-20 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              <div className="w-full px-4 ">
                <div className="relative min-w-0 break-words bg-white w-full shadow-lg rounded max-h-full ">
                  <div className="flex flex-col lg:flex-row">
                    <div className="m-5">
                      <Image
                        src={product.photo?product.photo:"https://via.placeholder.com/600x400"}
                        width="600"
                        height="400"
                        alt="Product"
                        className="shadow-lg max-w-full rounded"
                      />
                    </div>

                    <div className="flex-1 m-5">
                      <div className="">
                        <p className="text-xl font-bold">{product.name}</p>
                        <p className="text-sm">{product.description}</p>
                        <p className="text-lg">{product.price}</p>
                      </div>
                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterSmall />
      </div>
    </Layout>
  );
};

export default ViewProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
  //current environment
  let dev = process.env.NODE_ENV !== "production";
  const { DEV_URL, PROD_URL } = process.env;

  var { id } = context.query; //retrieve dynamic route query [id]

  const response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/products/${id}`); //returns response
  const data = await response.json(); //extract response
 
  //product id not exist
  if(!data.success) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product: data.message,
    },
  };
};
