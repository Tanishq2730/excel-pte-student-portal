import PropTypes from "prop-types";
import { fetchSpellCheck2,fetchExceptions } from "../../../../api/practiceAPI";
// Define types
interface ScoringData {
    answerText: string;
    wordCount: number;
}

interface HighlightedWord {
    word: string;
    startIndex: number;
    endIndex: number;
    markup: JSX.Element;
}

interface MistakeCheckResult {
    totalSpellingMistakes: number;
    totalGrammarMistakes: number;
}

interface Exception {
    text: string;
}



const SummarizeSpokenTextScoring = async (scoringData: any, questionData: any, selectedLanguage: string) => {
    if (!scoringData) {
        console.error("scoringData is undefined");
        return; // or handle the error appropriately
    }

    const { answerText, wordCount } = scoringData;

    let highlightedText: string = answerText;
    
    let highlightedWords: HighlightedWord[] = [];
    const user_answer: string = answerText;
    const totalscore = 7; // Set totalscore 7 for Summarize Written Text

    const setHighlightedText = (newText: string) => {
        highlightedText = newText;
    };

    const setHighlightedWords = (newWord: HighlightedWord) => {
        highlightedWords.push(newWord);
    };

    const isWordHighlighted = (word: string): boolean => {
        if (!highlightedText) return false;

        const parser = new DOMParser();
        const doc = parser.parseFromString(highlightedText, "text/html");
        const spanElements = doc.querySelectorAll("span");

        return Array.from(spanElements).some(
            (span) =>
                span.classList.contains("highlight") &&
                span.textContent === word
        );
    };

    const updateHighlightedText = (highlightedWords: HighlightedWord[], highlightedText: string): string => {
        let currentIndex = 0;
        const elements: string[] = [];

        const highlights = [...highlightedWords];
        highlights.sort((a, b) => a.startIndex - b.startIndex);

        highlights.forEach((highlight) => {
            const { startIndex, endIndex, markup } = highlight;

            const textBefore = highlightedText.substring(currentIndex, startIndex);
            elements.push(textBefore);

            let highlightedWordHtml = `<${markup.type} ${Object.keys(markup.props)
                .map((key) => `${key}="${markup.props[key]}"`)
                .join(" ")}>${markup.props.children}</${markup.type}>`;

            highlightedWordHtml = highlightedWordHtml.replace(/className/g, "class");

            elements.push(highlightedWordHtml);
            currentIndex = endIndex;
        });

        const textAfter = highlightedText.substring(currentIndex);
        elements.push(textAfter);

        return elements.join("");
    };

    const highlight = (word: string, length: number, offset: number, tooltipContent: string, mark: string) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = highlightedText;
        const textContent = tempElement.textContent || '';

        const startIndexHtml = textContent.indexOf(word, offset);
        const endIndexHtml = startIndexHtml + length;

        if (startIndexHtml !== -1 && endIndexHtml !== -1) {
            const highlightedWord = (
                <span
                    className={`text-danger highlight ${mark} tooltip-custom`}
                    data-placement="top"
                    data-toggle="tooltip"
                    data-html="true"
                    data-title={tooltipContent}
                    key={offset}
                >
                    {textContent.substring(startIndexHtml, endIndexHtml)}
                </span>
            );

            setHighlightedWords({
                word: word,
                startIndex: startIndexHtml,
                endIndex: endIndexHtml,
                markup: highlightedWord,
            });
        }
    };

    const CheckWritingText = async (
        content: string,
        answer: string,
        nlpscore: number,
        setAllow: boolean,
        WriteEssay: boolean,
        SummarizewrittenText: boolean,
        highlightText: string[],
        transcription:string,
    ): Promise<MistakeCheckResult | string> => {
        try {
        if (typeof content === "string" && !content.trim()) {
            return `Answer cannot be empty`;
        }

        const originalAnswer2 = answer.trim();
        const data2 = content.trim();
        const answerWords2 = originalAnswer2.split(" ");
        const answerWords3 = originalAnswer2.toLowerCase().replace(/[.;]/g, "").split(" ");
        const givenAnswerWords = data2.toLowerCase().replace(/[.;]/g, "").split(" ");

        let totalSpellingMistakes = 0;
        let totalGrammarMistakes = 0;

        let checkwords: string[] = [];
        let transcriptionwords3: string[] = [];

        if (transcription) {
            let checktranscription = transcription.replace(/[.;]/g, "").trim();
            checkwords = checktranscription.toLowerCase().split(" ");
        }

        const mergedArray3 = answerWords2.concat(transcriptionwords3);
        const checkwordsFL = answerWords3.concat(checkwords);
        const transcriptionwords = JSON.stringify(mergedArray3);

        const GrammarMistakesArray: string[] = [];
        const SpellingMistakesArray: string[] = [];

        const exceptions = await fetchExceptions();
        const exceptionWords = exceptions.map((exception:any) => exception.text);

        const normalizeWord = (word: string): string => word.toLowerCase().replace(/[.;]/g, "");

        // Spell check
        const spellingErrors = await fetchSpellCheck2(data2, "spelling", transcriptionwords, selectedLanguage);

        spellingErrors.forEach((error:any) => {
            if (
                error.type === "spelling" &&
                !exceptionWords.includes(normalizeWord(error.bad)) &&
                !isWordHighlighted(error.bad)
            ) {
                if (error.bad !== error.better[0]) {
                    const desc = error.description?.en || "spelling mistake";
                    const badword = normalizeWord(error.bad);

                    let goodword: string | null = null;

                    for (const better of error.better) {
                        const better2 = normalizeWord(better);
                        if (checkwordsFL.includes(better2)) {
                            goodword = better;
                            break;
                        }
                    }

                    if (!goodword) {
                        goodword = error.better[0];
                    }

                    if (goodword && goodword !== error.bad && givenAnswerWords.includes(badword)) {
                        totalSpellingMistakes++;
                        SpellingMistakesArray.push(error.bad);

                        if (setAllow) {
                            highlight(
                                badword,
                                error.length,
                                error.offset,
                                `<small class='spellingmark'>Correct your spelling:</small><del style='color:red;'>${badword}</del> <font style='color:green'>${goodword}</font><small style='color:#888'>${desc}</small>`,
                                "spellingmark"
                            );
                        }
                    }
                }
            }
        });

        // Grammar check
        const grammarErrors = await fetchSpellCheck2(content, "grammar", transcriptionwords, selectedLanguage);

        grammarErrors.forEach((error:any) => {
            const badword = normalizeWord(error.bad);
            let goodword =
                error.better.find((better:any) => checkwordsFL.includes(normalizeWord(better))) || error.better[0];

            goodword = goodword ? normalizeWord(goodword) : "-";

            if (goodword && givenAnswerWords.includes(badword)) {
                const desc = error.description?.en || "grammar mistake";

                if (
                    error.type === "grammar" &&
                    SummarizewrittenText &&
                    !exceptionWords.includes(error.bad) &&
                    goodword &&
                    error.bad !== "topic"
                ) {
                    totalGrammarMistakes++;
                    GrammarMistakesArray.push(error.bad);

                    if (setAllow) {
                        highlight(
                            error.bad,
                            error.length,
                            error.offset,
                            `<small class='grammermark'>Correct your grammar:</small><del style='color:red;'>${error.bad}</del> <font style='color:green'>${error.better[0]}</font><small style='color:#888'>${desc}</small>`,
                            "grammermark"
                        );
                    }
                }
            }
        });

        return {
            totalSpellingMistakes,
            totalGrammarMistakes,
        };
    } catch (error: any) {
        console.error(`Error in CheckWritingText: ${error.message}`);
        return `Error in CheckWritingText: ${error.message}`;
    }
    };

    const calculateNlpScore = async (answer: string, givenAnswer: string): Promise<number> => {
        const maxScore = 100;
        const setA = new Set(answer.toLowerCase().split(" "));
        const setB = new Set(givenAnswer.toLowerCase().split(" "));

        const intersection = new Set([...setA].filter((word) => setB.has(word)));
        const union = new Set([...setA, ...setB]);

        const similarity = intersection.size / union.size;

        return Math.round(similarity * maxScore);
    };

    const checkSpecialCharacters = (content: string): boolean => {
        const regex = /[.?!](?!\w|$)(?=.*[.?!])/g;
        const match = content.match(regex);
        return match === null;
    };

    function stringifySafe(obj: any): string {
        const seen = new WeakSet();
        return JSON.stringify(obj, (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////// Summarize Written Text Scoring /////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        const questionalt = questionData.question;
        let answer = questionData.answer ? questionData.answer : questionalt;

        // Extract plain text from the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(answer, "text/html");
        answer = doc.body.textContent || "";
        answer = answer.trim();
        let transcription = questionData.transcription ? questionData.transcription : "";

        if (transcription) {
            transcription = transcription.replaceAll("&nbsp;", " ");
            transcription = transcription.replaceAll(",", " ");
            transcription = transcription.replaceAll(".", " ");
            transcription = transcription.trim();
        }
        // Extract user answer
        let content = answerText;
        let nospeacialcharin = checkSpecialCharacters(content);
        let nlpscore = await calculateNlpScore(answer, content);

        const minExpectedNlp = 5;
        if (nlpscore > minExpectedNlp && nospeacialcharin) {
            let setAllow = true;
            let WriteEssay = false;
            let SummarizewrittenText = true;
            let highlightText = highlightedText;

            try {
                const result = await CheckWritingText(
                    content,
                    answer,
                    nlpscore,
                    setAllow,
                    WriteEssay,
                    SummarizewrittenText,
                    highlightText.split(" "),
                    transcription
                );

                if (result && typeof result !== "string") {
                    let spelling = result.totalSpellingMistakes;
                    let grammer = result.totalGrammarMistakes;
                    let vocab = 0.5 * grammer;
                    let svc = 0.5 * spelling;
                    let rspell1;
                    let sumhighlightedText =
                        highlightedWords.length > 0
                            ? updateHighlightedText(highlightedWords, highlightedText)
                            : highlightedText;

                    // Initialize scoring variables
                    let rcontent = 0, rform = 0, rgrammer = 0, rvocabulary = 0;

                    if (spelling > 2) {
                        rspell1 = 0;
                        // setRSpelling(0);
                    } else {
                        rspell1 = 2 - spelling;
                        // setRSpelling(2 - spelling);
                    }
                    if (vocab > 2) {
                        rvocabulary = 0;
                    } else {
                        rvocabulary = 2 - vocab - svc;
                    }

                    if (grammer > 2) {
                        rgrammer = 0;
                    } else {
                        rgrammer = 2 - grammer;
                    }

                    if (rvocabulary < 0) {
                        rvocabulary = 0;
                    }

                    if (wordCount <= 70 && wordCount >= 75) {
                        rcontent = 2;
                        rform = 2;
                    } else if (
                        (wordCount <= 75 && wordCount > 70) ||
                        (wordCount < 50 && wordCount >= 45)
                    ) {
                        rcontent = 1.5;
                        rform = 1;
                    } else if (wordCount < 40 || wordCount > 100) {
                        rcontent = 1;
                        rform = 0;
                        rgrammer = 0;
                        rspell1 = 0;
                        rvocabulary = 0;
                    }

                    let score = rcontent + rform + rgrammer + rvocabulary + rspell1;

                    let score_data = {
                        content: rcontent,
                        form: rform,
                        grammer: rgrammer,
                        spelling: rspell1,
                        vocabulary: rvocabulary,
                        highlightedText: sumhighlightedText,
                        nlpscore: nlpscore,
                        nospeacialcharin: nospeacialcharin,
                        grammarMistakes: grammer,
                        spellingMistakes: spelling,
                        wordCount: wordCount,
                    };

                   // score_data = JSON.stringify(score_data);

                    return { score, totalscore, user_answer, score_data };
                }
            } catch (error) {
                console.error("Error in SummarizeWrittenTextScoring:", error);
            }
        }
    } catch (error) {
        console.error("Error in trying to store the SummarizeWrittenTextScoring data: ", error);
    }

    // Handle cases where criteria aren't met
    let rcontent = 0, rform = 0, rgrammer = 0, rvocabulary = 0;
    let score = rcontent + rform + rgrammer + rvocabulary;

    let score_data = {
        content: rcontent,
        form: rform,
        grammer: rgrammer,
        vocabulary: rvocabulary,
        wordCount: wordCount,
    };

   // score_data = JSON.stringify(score_data);

    return { score, totalscore, user_answer, score_data };

};

export default SummarizeSpokenTextScoring;
