import React from 'react';

export default function App() {
  const apiKey = "TyOwcUenvZiMWoapLn5eNw==kaHFXaIspzzCAafB"
  const [quotes, setQuotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchQuotes();
  }, []);


  const fetchQuotes = async () => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="quote-box">
      <button onClick={fetchQuotes} id="new-quote">New Quote</button>
      {quotes.length > 0 && (
        <div>
          <p id="text">{quotes[0].quote}</p>
          <p id="author">- {quotes[0].author || 'Unknown'}</p>
        </div>
      )}
    </div>
  );
};
