// Fetch USDT pairs from Binance and Bybit APIs
const fetchData = async () => {
    try {
        // Fetch Binance data
        const binanceResponse = await fetch('https://api.binance.com/api/v3/exchangeInfo');
        const binanceData = await binanceResponse.json();
        const binanceUsdtPairs = binanceData.symbols.filter(symbol => symbol.quoteAsset === 'USDT' && symbol.status === 'TRADING');

        // Fetch Bybit data
        const bybitResponse = await fetch('https://api.bybit.com/v2/public/symbols');
        const bybitData = await bybitResponse.json();
        const bybitUsdtPairs = bybitData.result.filter(symbol => symbol.quote_currency === 'USDT' && symbol.status === 'Trading');

        // Combine both sources
        const allPairs = [
            ...binanceUsdtPairs.map(pair => ({ exchange: 'BINANCE', symbol: pair.symbol })),
            ...bybitUsdtPairs.map(pair => ({ exchange: 'BYBIT', symbol: pair.name }))
        ];

        // Render pairs on the page
        renderData(allPairs);
    } catch (error) {
        console.error('Error fetching USDT pairs:', error);
    }
};

// Function to render pairs on the page
const renderData = (pairs) => {
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // Clear the container

    pairs.forEach(pair => {
        const pairElement = document.createElement('div');
        pairElement.classList.add('pair');

        pairElement.innerHTML = `
            <div><span class="exchange">${pair.exchange}</span> - <span class="symbol">${pair.symbol}</span></div>
        `;

        container.appendChild(pairElement);
    });
};

// Fetch data when the page loads
window.onload = fetchData;
