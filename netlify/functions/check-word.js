export default function handler(req, res) {
	const validWords = ["hangman", "javascript", "nextjs", "react"];
	const { word } = req.body;
	const targetWord = validWords[Math.floor(Math.random() * validWords.length)];

	const maskedWord = targetWord
		.split("")
		.map((char, index) => (word.includes(char) ? char : "_"))
		.join("");

	const success = true;

	const data = {
		maskedWord,
		targetWord,
	};

	res.status(200).json({ success, data });
}
