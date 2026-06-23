import React, { useEffect, useState } from 'react';

interface QuoteType {
  id: number;
  quote: string;
  author: string;
}

interface QuotesProps {
  quotes: QuoteType[];
}

const Quotes = ({ quotes }: QuotesProps) => {
  const [visibleQuotes, setVisibleQuotes] = useState<QuoteType[]>([]);

  useEffect(() => {
    if (quotes && quotes.length > 0) {
      setVisibleQuotes(quotes);
      return ;
    }
  }, [quotes]);

  if (visibleQuotes.length === 0) return null;

  return (
    <div className="toast toast-end toast-bottom z-[50] max-w-sm space-y-2">
      {visibleQuotes.map((q) => (
        <div key={q.id} className="alert alert-info shadow-lg border border-info/20 text-xs sm:text-sm p-4 rounded-xl animate-bounce-short">
          <div className="flex flex-col gap-1 items-start">
            <span className="font-medium italic text-base-content">"{q.quote}"</span>
            <span className="text-[10px] opacity-60 self-end">— {q.author}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quotes;