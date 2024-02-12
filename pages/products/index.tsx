import { GetServerSideProps } from 'next'
import React, { useState, ReactElement,useEffect } from "react";
import Sidebar from "components/UI/Sidebar";
import Layout from "components/UI/Layout";
import Navbar from "components/UI/Navbar";
import FooterSmall from "components/UI/FooterSmall";
import Tooltip from "components/UI/Tooltip";
import Link from "next/link";
import { Product } from "lib/product";
import { toast, Toaster } from "react-hot-toast";
import { fetcher } from "@/lib/fetch";
import Button from "components/UI/Button";
import { useRouter } from 'next/router';


interface ProductsProps {
  products: Product[];
}
const Products: React.FunctionComponent<ProductsProps> = ({
  products,
}): ReactElement => {
 
  const [showModal, setShowModal] = useState(false);
  const [productId,setProductId] = useState("");
  const [productName,setProductName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  
  const deleteHandler = async (productId: string) => {
    try {
      setIsLoading(true);
      const response = await fetcher(`/api/products/${productId}`, {
        method: "DELETE",
        body: productId,
      });
  
      if (response.success) {
        toast.success(response.message);
        router.replace(router.asPath);
        setShowModal(false)
      } else {
        toast.error(response.message);
      }
    } catch (err:any){
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  
   
};


  const Modal = (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{productName}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Are you sure you want to delete this product?
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
               <Button onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
              <Button onClick={() => deleteHandler(productId)}  loading={isLoading}>
                    Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );

  return (
    <Layout title="Products">
      <Toaster />
      <Sidebar />
      <div className="flex flex-col h-screen justify-between relative md:ml-64 bg-blueGray-100">
        <Navbar title="Products" />
        <div className="relative bg-primary md:pt-32 pb-20 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Table */}
              <div className="w-full px-4">
                <div className="relative min-w-0 break-words bg-white w-full shadow-lg rounded max-h-full">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">
                          List of Products
                        </h3>
                      </div>
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                        <Link href="/products/create">
                          <button
                            className="bg-gray-900 text-white active:bg-gray-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            ADD PRODUCT
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Name
                          </th>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Description
                          </th>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Price
                          </th>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id}>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4">
                              {product.name}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4">
                              {product.description}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4">
                              {product.price}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4">
                              <li className="flex items-center">
                                <Tooltip message="View">
                                  <Link href={`/products/${product._id}`}>
                                  <i className="px-2 fa-sharp fa-solid fa-eye text-sm text-gray-600" />
                                  </Link>
                                </Tooltip>
                                <Tooltip message="Edit">
                                  <Link href={`/products/${product._id}/update`}>
                                    <i className="px-2 fa-solid fa-pen-to-square text-sm text-gray-600" />
                                  </Link>
                                </Tooltip>
                                <Tooltip message="Delete">
                                  <i
                                    onClick={() => {
                                      setShowModal(true);
                                      setProductId(product._id);
                                      setProductName(product.name);
                                    }}
                                    className="px-2 fa-sharp fa-solid fa-trash text-sm text-gray-600"
                                  />
                                </Tooltip>
                              </li>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!showModal?null:Modal}
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

export default Products;

export const getServerSideProps: GetServerSideProps = async () => {
  //current environment
  let dev = process.env.NODE_ENV !== "production";
  const { DEV_URL, PROD_URL } = process.env;

  const response = await fetcher(`${dev?DEV_URL:PROD_URL}/api/products`); //returns response

  return {
    props: {
      products: response.products,
    },
  };
};


