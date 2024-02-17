// 단어 목록 변수 정의
const wordsByDate = {
	"2024-02-18": ["hangman", "javascript", "nextjs", "react"],
	"2024-02-19": ["apple", "banana", "orange"],
	"2024-02-20": ["computer", "keyboard", "mouse"],
	// 이어지는 날짜별 단어 목록
};

export default function handler(req, res) {
	try {
		// 날짜를 기준으로 내림차순으로 정렬하여 가장 최신 날짜를 찾음
		const dates = Object.keys(wordsByDate).sort((a, b) => new Date(b) - new Date(a));
		const latestDate = dates[0];
		const wordsForToday = wordsByDate[latestDate];

		if (!wordsForToday || wordsForToday.length === 0) {
			res.status(404).json({ success: false, message: "No words available for today" });
			return;
		}

		// 랜덤하게 단어 선택
		const randomIndex = Math.floor(Math.random() * wordsForToday.length);
		const selectedWord = wordsForToday[randomIndex];

		res.status(200).json({ success: true, data: selectedWord });
	} catch (error) {
		console.error("Error fetching words:", error);
		res.status(500).json({ success: false, message: "Failed to fetch words" });
	}
}
