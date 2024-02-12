import React, { ReactElement, useRef, useState } from "react";
import Sidebar from "components/UI/Sidebar";
import Layout from "components/UI/Layout";
import Navbar from "components/UI/Navbar";
import FooterSmall from "components/UI/FooterSmall";
import Button from "components/UI/Button";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { fetcher } from "@/lib/fetch";

const CreateProduct: React.FunctionComponent = (props): ReactElement => {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", nameRef.current?.value!);
      formData.append("description", descriptionRef.current?.value!);
      formData.append("price", priceRef.current?.value!);
      formData.append("createdAt", new Date().toJSON());
      formData.append("updatedAt", new Date().toJSON());
      if (!photoRef.current?.files) return;
      formData.append("photo", photoRef.current.files[0]);

      const response = await fetcher("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/products");
        }, 2000);
      } else {
        toast.error(response.error.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Create Product">
      <Toaster />
      <Sidebar />
      <div className="flex flex-col h-screen justify-between relative md:ml-64 bg-blueGray-100">
        <Navbar title="Create Product" />
        <div className="relative bg-primary md:pt-32 pb-20 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              <div className="w-full px-4 ">
                <div className="relative min-w-0 break-words bg-white w-full shadow-lg rounded max-h-full ">
                  {/*Create Form */}
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="py-2 ">
                      <div className="my-5 mx-5 ">
                        <div className="grid grid-cols-1 gap-1 ">
                          <label className="block text-xs font-bold mb-2 uppercase">
                            <span className="text-gray-700">Name</span>
                            <input
                              type="text"
                              ref={nameRef}
                              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder=""
                            />
                          </label>
                          <label className="block text-xs font-bold mb-2 uppercase">
                            <span className="text-gray-700">Description</span>
                            <textarea
                              ref={descriptionRef}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                          </label>
                          <label className="block text-xs font-bold mb-2 uppercase">
                            <span className="text-gray-700">Price</span>
                            <input
                              type="text"
                              ref={priceRef}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              placeholder=""
                            />
                          </label>
                          <label className="block text-xs font-bold mb-2 uppercase">
                            <span className="text-gray-700">Photo</span>
                            <input
                              type="file"
                              ref={photoRef}
                              accept="image/*"
                              className="mt-1 block w-full"
                            />
                          </label>
                          <hr className="my-5"></hr>
                          <div className="text-center">
                            <Button loading={isLoading}>Create</Button>
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

export default CreateProduct;
