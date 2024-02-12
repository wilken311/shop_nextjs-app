import React, { ReactElement, useState,useRef } from "react";
import Sidebar from "components/UI/Sidebar";
import Layout from "components/UI/Layout";
import Navbar from "components/UI/Navbar";
import FooterSmall from "components/UI/FooterSmall";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Product } from "@/lib/product";
import Button from "components/UI/Button";
import { toast, Toaster } from 'react-hot-toast';
import { fetcher } from "@/lib/fetch";


interface IViewProductProps {
  product: Product;
 
}

const UpdateProduct: React.FunctionComponent<IViewProductProps> = ({
  product
}): ReactElement => {
 
 
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [productData,setProductData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    updatedAt: new Date().toJSON(),
    photo: product.photo,
  })

  const submitHandler = async (event: any) => {
    event.preventDefault();
    try {
      setIsLoading(true)
      const formData = new FormData();
      formData.append("name", nameRef.current?.value!);
      formData.append("description", descriptionRef.current?.value!);
      formData.append("price", priceRef.current?.value!);
      formData.append("updatedAt", productData.updatedAt);
      if (!photoRef.current?.files) return;
      formData.append("photo", productData.photo);

      const response = await fetcher(`/api/products/${product._id}`, {
        method: "PUT",
        body: formData,
      });
      
      if (response.success) {
        toast.success(response.message);
        setTimeout(()=>{
          router.push("/products");
        },2000)
      } else {
        toast.error(response.error.message);
      }
    } catch (err: any){
      toast.error(err.message);
    } finally {
      setIsLoading(false)
    }
  };

  const handleOnChange = (event: any) =>{
      event.preventDefault();
      let value= event.target.value;
      let name= event.target.name;
      setProductData({
       ...productData,
       [name]: value
      })
   }

  const handleUpload = (event: any) =>{    
    event.preventDefault();
    const name = event.target.name;
    const file = event.currentTarget.files[0];
    if(!file) return ;
    setProductData({
      ...productData,
      [name]: file
    })
  };
 

  return (
    <Layout title="Update Product">
      <Toaster />
      <Sidebar />
      <div className="flex flex-col h-screen justify-between relative md:ml-64 bg-blueGray-100">
        <Navbar title="Update Product" />
        <div className="relative bg-primary md:pt-32 pb-20 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              <div className="w-full px-4 ">
                <div className="relative min-w-0 break-words bg-white w-full shadow-lg rounded max-h-full ">
                  {/*Update Form */}
                  <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="py-2 ">
                      <div className="my-5 mx-5 ">
                        <div className="grid grid-cols-1 gap-1 ">
                          <label className="block text-xs font-bold mb-2 uppercase">
                            <span className="text-gray-700">Name</span>
                            <input
                              type="text"
                              ref={nameRef}
                              name="name"
                              value={productData.name}
                              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder=""
                              onChange={handleOnChange}
                            />
                          </label>
                          <label className="block text-xs font-bold mb-2 uppercase">
                            <span className="text-gray-700">Description</span>
                            <textarea
                              ref={descriptionRef}
                              name="description"
                              value={productData.description}
                              onChange={handleOnChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </label>
                          <label className="block text-xs font-bold mb-2 uppercase">
                            <span className="text-gray-700">Price</span>
                            <input
                              type="text"
                              ref={priceRef}
                              name="price"
                              value={productData.price}
                              onChange={handleOnChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder=""
                            />
                          </label>
                          <label className="block text-xs font-bold mb-2 uppercase">
                            <span className="text-gray-700">Photo</span>
                            <input 
                             type="file"
                             ref={photoRef}
                             name="photo"
                             accept="image/*"
                             onChange={handleUpload}
                             className="mt-1 block w-full" />
                          </label>
                          <hr className="my-5"></hr>
                          <div className="text-center">
                          <Button loading={isLoading}>
                              Update
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
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

export default UpdateProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
  //current environment
  let dev = process.env.NODE_ENV !== "production";
  const { DEV_URL, PROD_URL } = process.env;

  var { id } = context.query; //retrieve dynamic route query [id]

  const url = `${dev ? DEV_URL : PROD_URL}/api/products/${id}`;
  const response = await fetch(url); //returns response
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

