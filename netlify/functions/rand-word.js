const wordsByDate = {
	"2024-02-18": ["hangman", "javascript", "nextjs", "react"],
	"2024-02-19": ["apple", "banana", "orange"],
	"2024-02-20": ["computer", "keyboard", "mouse"],
};

exports.handler = async (event, context) => {
	try {
		const dates = Object.keys(wordsByDate).sort((a, b) => new Date(b) - new Date(a));
		const latestDate = dates[0];
		const wordsForToday = wordsByDate[latestDate];

		if (!wordsForToday || wordsForToday.length === 0) {
			return {
				statusCode: 404,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Allow-Methods": "GET, POST, OPTION",
				},
				body: JSON.stringify({ success: false, message: "No words available for today" }),
			};
		}

		const randomIndex = Math.floor(Math.random() * wordsForToday.length);
		const selectedWord = wordsForToday[randomIndex];

		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "GET, POST, OPTION",
			},
			body: JSON.stringify({ success: true, data: selectedWord }),
		};
	} catch (error) {
		console.error("Error fetching words:", error);
		return {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "GET, POST, OPTION",
			},
			body: JSON.stringify({ success: false, message: "Failed to fetch words" }),
		};
	}
};
