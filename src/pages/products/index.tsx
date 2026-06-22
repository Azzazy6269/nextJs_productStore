import React, { useEffect, useState } from 'react'
import Link from "next/link";

interface review{
  rating:number,
  comment:string,
  date:string,
  reviewerName:string
} 

interface product{
  id:number,
  title:string,
  description:string,
  category:string,
  price:number,
  discountPercentage:number,
  rating:number,
  stock:number,
  tags:string[],
  brand:string,
  sku:string,
  weight:number,
  warrantyInformation:string,
  shippingInformation:string,
  availabilityStatus:string,
  reviews:review[],
  returnPolicy:string,
  images:string[],
  createdAt:string
}

interface ProductsAPI{
  products:product[]
}

interface IndexProps {
  initialProducts: product[];
  fetchError: string;
}

const index = ({ initialProducts, fetchError }: IndexProps) => {

  const [allProducts,setAllProducts]=useState<product[]>(initialProducts);
  const [products,setProducts]=useState<product[]>(initialProducts);
  const [category,setCategory]=useState('all');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(fetchError || '');
  const [sortBy, setSortBy] = useState<string>('');

  const search =(e:any)=>{
    const searchWord:string = e.target.value.toLowerCase();
    if(searchWord==''){
      setProducts(allProducts);
    }else{
      const filterd = allProducts.filter(p=>p.title.toLowerCase().includes(searchWord));
      setProducts(filterd);
    }
  }


  useEffect(()=>{
    let filtered = [...allProducts];

    if(category !== 'all'){
      filtered = allProducts.filter((p)=>{
        return p.category==category;
      })
    }

    if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price); 
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); 
    }

    setProducts(filtered);
  },[category,allProducts,sortBy]) 

  return (
    <div>
      
        {loading && (
          <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p>Loading products...</p>
          </div>
          </div>
        )}
      
    {error}
    <div>

      <label className="input">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" onChange={(e)=>search(e)} required placeholder="Search" />
      </label>
    </div>
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn m-1">order {sortBy ? `: ${sortBy}` : ''}</div>
      <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li><a onClick={() => setSortBy('price')}>price</a></li>
        <li><a onClick={() => setSortBy('newest')}>newest</a></li>
      </ul>
    </div>
    <div>
      <div className="filter">
        <input className="btn filter-reset" type="radio" name="all" value="all" aria-label="All"
          checked={category === 'all'} onChange={(e) => setCategory(e.target.value)}/>
        <input className="btn" type="radio" name="beauty" value="beauty" aria-label="beauty"
          checked={category === 'beauty'} onChange={(e) => setCategory(e.target.value)}/>
        <input className="btn" type="radio" name="fragrances" value="fragrances" aria-label="fragrances"
          checked={category === 'fragrances'} onChange={(e) => setCategory(e.target.value)}/>
        <input className="btn" type="radio" name="furniture" value="furniture" aria-label="furniture"
          checked={category === 'furniture'} onChange={(e) => setCategory(e.target.value)}/>
        <input className="btn" type="radio" name="groceries" value="groceries" aria-label="groceries"
          checked={category === 'groceries'} onChange={(e) => setCategory(e.target.value)}/>
      </div>
    </div>
    <div className='grid grid-cols-3'>
      {products.map((p) => (
          <div key={p.id} className="card bg-base-100 w-96 shadow-sm my-3">
            <figure>
              <img
                src={p.images[0]}
                alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{p.title}</h2>
              <p>{p.description}</p>
              <div className="card-actions justify-end">
                <Link href={`/products/${p.id}`} className="btn btn-primary">
                  Details
                </Link>
              </div>
            </div>
          </div>
      ))}
    </div>
  </div>
  )
}

export const getStaticProps = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    
    return {
      props: {
        initialProducts: data.products || [],
        fetchError: ''
      }
    }
  } catch (err: any) {
    return {
      props: {
        initialProducts: [],
        fetchError: err.message || 'Failed to fetch products'
      }
    }
  }
}

export default index