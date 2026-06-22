import React from 'react'

interface product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface ProductDetailsProps {
  product: product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  if (!product) return <div className="text-center p-10">Loading Product...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-4xl border border-base-200">
        <figure className="lg:w-1/2 p-4">
          <img src={product.images[0]} alt={product.title} className="rounded-2xl object-cover w-full h-96" />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-3xl font-bold text-primary">{product.title}</h2>
          <p className="text-base-content/80 mt-4">{product.description}</p>
          <div className="card-actions justify-between items-center mt-6">
            <span className="text-2xl font-black text-secondary">${product.price}</span>
            <button className="btn btn-outline btn-secondary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  const paths = data.products.map((p: any) => ({
    params: { id: p.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: any) => {
  const id = params.id;
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await response.json();

  return {
    props: {
      product,
    },
  };
}

export default ProductDetails;