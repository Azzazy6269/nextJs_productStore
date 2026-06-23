import Quotes from '../../components/Quotes';
import { getSession } from 'next-auth/react';
import React from 'react';

const index = ({ quotes }) => {
    return (
        <main className="min-h-screen p-8 bg-base-100">
            <h1 className="text-2xl font-bold mb-4">Welcome to Quotes Dashboard</h1>
            <p className="text-sm text-base-content/70">Look at the bottom right corner to see your SSR Toasts!</p>
            
            <Quotes quotes={quotes} />
        </main>
    );
};

export default index;

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const res = await fetch("https://dummyjson.com/quotes");
    const data = await res.json();
    const quotes = session ? data.quotes.slice(0, 5) : data.quotes.slice(0, 3); 
    return {
        props: {
            quotes,
            session
        }
    };
}