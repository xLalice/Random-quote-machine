import React from 'react';
import options from "./assets/categories.js"


export default function App() {
  const apiKey = "TyOwcUenvZiMWoapLn5eNw==kaHFXaIspzzCAafB"
  const [quotes, setQuotes] = React.useState([]);
  const [category, setCategory] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true);

  
  

  React.useEffect(() => {
    fetchQuotes();
  }, []);


  const fetchQuotes = async () => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes${category ? `?category=${category}` : ""}`, {
        headers: {
          'X-Api-Key': apiKey,
        },
      });
      const data = await response.json();
      setQuotes(data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  function tweetQuote() {
    const tweetText = encodeURIComponent(quotes[0].quote + " - " + quotes[0].author);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const categories = options.map(item => (
    <option value={item.value}>{item.label}</option>
  ))

  function handleChange(event){
    setCategory(event.target.value)
    console.log(category)
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  return (
    <div id="quote-box">
      
      {quotes.length > 0 && (
        <div>
          <p id="text">{quotes[0].quote}</p>
          <p id="author">- {quotes[0].author || 'Unknown'}</p>
        </div>
      )}
      <div id="controls">
        <button className="btn btn-primary" onClick={fetchQuotes} id="new-quote">New Quote</button>
        <button className="btn btn-primary"><a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quotes[0].quote + " - " + quotes[0].author)}`} target="_blank" onClick={tweetQuote}>
            Tweet Quote 
        </a></button>
        <select 
          id="category" 
          className="form-select form-select-lg mb-3"
          value={category}
          onChange={handleChange}
          name={category}
        >
          <option disabled value="">Category</option>
          {categories}
        </select>
      </div>
      
    </div>
  );
};
