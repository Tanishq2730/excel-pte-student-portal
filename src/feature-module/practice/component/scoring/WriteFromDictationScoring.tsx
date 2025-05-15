import { fetchWfdCheck } from "../../../../api/practiceAPI";

const WriteFromDictationScoring = async (scoringData: any, questionData: any, selectedLanguage: string,question?:any) => {
    if (!scoringData) {
        console.error("scoringData is undefined");
        return; // or handle the error appropriately
    }

    const { answerText, wordCount } = scoringData;

    const QueData = await questionData || question;

    let answer = "";
    if (selectedLanguage === "American") {
        answer = QueData.question.answer;
    } else {
        if (QueData.question.answer_british == null || QueData.question.answer_british === "") {
            answer = QueData.question.answer;
            console.log(answer);
        } else {
            answer = QueData.question.answer_british;
        }
    }

    // Extract plain text from the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(answer, "text/html");
    answer = doc.body.textContent || "";
    answer = answer.trim(); // Correct Answer

    let answerData = answerText;
    const parser2 = new DOMParser();
    const doc2 = parser2.parseFromString(answerData, "text/html");
    answerData = doc2.body.textContent || "";
    answerData = answerData.trim(); // User Answer

    // Prepare correct and user answers for comparison
    let CorrectText = answer.trim();
    let UserText = answerData.trim();

    let CorrectTextArr = CorrectText.match(/\b[\w.]+\b/g);
    const maxscoreLength = CorrectTextArr ? CorrectTextArr.length : 0;

    console.log(CorrectText, 'CorrectText');
    console.log(UserText, 'UserText');

    // Fetching API data for scoring
    try {
        const apiData = await fetchWfdCheck(CorrectText, UserText, selectedLanguage);

        const scored_text = apiData.html;
        const wrong_words_count = apiData.wrong_words_count;

        // Calculate the score based on word comparison
        const your_score = Math.max(maxscoreLength - wrong_words_count, 0);

        // Prepare final result
        const score = your_score;
        const totalScore = maxscoreLength;
        const userAnswerText = answerData;

        const scoredText = JSON.stringify({
            score: score,
            answer: answer,
            userAnswerText: userAnswerText,
            scored_text: scored_text,
        });

        const response = { score, totalScore, userAnswerText, scoredText };

        return response;
    } catch (error) {
        console.error("Error in WriteFromDictationScoring:", error);
        return null; // Or handle the error appropriately
    }
};

export default WriteFromDictationScoring;
