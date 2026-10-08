// utils.js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Accept signal as the second parameter
const triviaQuestions = async (retries = 3, signal = null) => {
    try {
        // Pass the abort signal directly into the fetch options configuration block
        const res = await fetch("https://opentdb.com/api.php?amount=5", { signal });
        
        if (res.status === 429 && retries > 0) {
            console.warn("Rate limited! Retrying in 1.5 seconds...");
            await delay(1000);
            return triviaQuestions(retries - 1, signal);
        }

        const data = await res.json();
        
        if (data.response_code === 5 && retries > 0) {
            console.warn("API response code 5. Retrying...");
            await delay(1000);
            return triviaQuestions(retries - 1, signal);
        }

        return data.results || [];
    } catch (error) {
        // Avoid error logs if it was an intentionally aborted network request
        if (error.name !== 'AbortError') {
            console.error("Failed to fetch trivia questions:", error);
        }
        throw error; // Let the component catch block handle it
    }
}

export default triviaQuestions;
