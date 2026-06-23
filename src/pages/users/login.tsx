import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

async function getProductsPreview() {
  const res = await fetch("https://dummyjson.com/products/1");
  const data = await res.json();
  return data|| [];
}

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: products, isLoading: productsLoading } = useSWR("productsPreview", getProductsPreview);

  useEffect(() => {
    if (session) {
      router.push("/products");
    }
  }, [session, router]);

  if (status === "loading" || productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (session) return null;


  return (
    <main className="max-w-4xl mx-auto p-6" style={{ fontFamily: "sans-serif" }}>
      
      <div className="flex justify-between items-center bg-base-200 p-4 rounded-xl mb-6 shadow-sm">
        <span className="text-sm font-medium">Please sign in to view full products & manage operations:</span>
        <div className="flex gap-2">
          <button onClick={() => signIn("google")} className="btn btn-sm btn-outline btn-primary capitalize">Google</button>
          <button onClick={() => signIn("facebook")} className="btn btn-sm btn-outline btn-info capitalize">Facebook</button>
          <button onClick={() => signIn("github")} className="btn btn-sm btn-outline capitalize">GitHub</button>
        </div>
      </div>

      <div className="space-y-6">
        

        <div className="bg-base-100 p-6 border rounded-xl shadow-xs">
          <h2 className="text-lg font-bold mb-3 text-error">Products Preview (No Session - 1 Product Only):</h2>
          {products ? (
            <div className="card card-side bg-base-200 shadow-sm border max-w-md">
              <figure className="w-1/3 bg-white p-2">
                <img src={products.images[0]} alt={products.title} className="object-contain h-full w-full" />
              </figure>
              <div className="card-body p-4 w-2/3">
                <h2 className="card-title text-sm font-bold">{products.title}</h2>
                <p className="text-xs text-base-content/70 line-clamp-2">{products.description}</p>
                <div className="card-actions justify-between items-center mt-2">
                  <span className="text-sm font-bold text-primary">${products.price}</span>
                  <span className="badge badge-outline text-[10px]">Preview Mode</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-base-content/50">No products found.</p>
          )}
        </div>
      </div>

    </main>
  );
};

export default Login;