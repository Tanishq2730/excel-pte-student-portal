import PropTypes from "prop-types";
import { fetchSpellCheck,fetchExceptions } from "../../../../api/practiceAPI";
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

async function match_level_words(question:any, content:any) {
    // Function to split text into an array of words
    function splitIntoWords(text:any) {
        return text ? text.trim().split(/\s+/) : "";
    }

    // Split question and content into arrays of words
    const questionWords = splitIntoWords(question);
    const contentWords = splitIntoWords(content);

    // Convert arrays of words into sets
    const questionSet = new Set(questionWords);
    const contentSet = new Set(contentWords);

    // Find the intersection of sets
    const intersection = new Set([...questionSet].filter(word => contentSet.has(word)));

    // console.log("intersection: ", intersection);
    // Calculate the percentage of matching words
    const percentageMatching = (intersection.size / questionSet.size) * 100;

    // console.log("percentageMatching: ", percentageMatching);
    // Return true if the percentage of matching words is at least 60%, otherwise false
    return percentageMatching >= 20;
}

const WriteEssayScoring = async (scoringData: any, questionData: any, selectedLanguage: string) => {
    if (!scoringData) {
        console.error("scoringData is undefined");
        return; // or handle the error appropriately
    }

    const { answerText, wordCount } = scoringData;

    let highlightedText: string = answerText;
    // let score = 0;
    // let score_data: Record<string, any> = {};
    // let rcontent = 0;
    // let rform = 0;
    // let rgrammer = 0;
    // let rvocabulary = 0;
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
        highlightText: string[]
    ): Promise<MistakeCheckResult | string> => {
        try {
            if (typeof content === "string" && !content.trim()) {
                return `Answer cannot be empty`;
            }

            const dataTrimmed = content.trim();
            let totalSpellingMistakes = 0;
            let totalGrammarMistakes = 0;
            const GrammarMistakesArray: string[] = [];
            const SpellingMistakesArray: string[] = [];

            const exceptions = await fetchExceptions();
            const exceptionWords = exceptions.map((exception:any) => exception.text);

            const spellingErrors = await fetchSpellCheck(dataTrimmed, "spelling");
            spellingErrors.forEach((error:any) => {
                if (
                    error.type === "spelling" &&
                    !exceptionWords.includes(error.bad) &&
                    !isWordHighlighted(error.bad)
                ) {
                    totalSpellingMistakes++;
                    SpellingMistakesArray.push(error.bad);
                    const desc = error.description.en || "spelling mistake";

                    if (setAllow) {
                        highlight(
                            error.bad,
                            error.length,
                            error.offset,
                            `<small class='spellingmark'>Correct your spelling:</small><del style='color:red;'>${error.bad}</del> <font style='color:green'>${error.better[0]}</font><small style='color:#888'>${desc}</small>`,
                            "spellingmark"
                        );
                    }
                }
            });

            const grammarErrors = await fetchSpellCheck(content, "grammar");
            grammarErrors.forEach((error:any) => {
                if (
                    error.type === "grammar" &&
                    !exceptionWords.includes(error.bad) &&
                    SummarizewrittenText &&
                    error.better[0] &&
                    error.bad !== "topic"
                ) {
                    totalGrammarMistakes++;
                    GrammarMistakesArray.push(error.bad);
                    const desc = error.description.en || "grammar mistake";

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
    /////////////////////////////////////////// Write Essay Scoring /////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
        const answertopic = questionData.answertopic;
        let template = `
          In today's world, (topic) playing a vital role in making people's lives convenient. Some people believe that (topic) has many advantages, while some argue that people around the world have different opinions. This essay will discuss the significant aspects of topic and its objectives towards benefitting the people. There are a numerous arguments in favour of my stance. The most conspicuous one is that the topic has a pivotal impact in this globalised era. For example, according to scientific research, more than 85% of people worldwide are convinced with analytical facts of topic. Needless to say, thanks to all the upsides, topic stands in good stead in terms of improving and enhancing the factors in a pragmatic way. However, there are some pitfalls that can easily overwhelm the potential benefits topic. The primary concern stems from the fact that topic is controversial and has numerous disadvantages which have also impacted its growth. For instance, according to recent scientific study, the maximum number of large and diverse communities lacks a sustainable future to thrive. As a result, topic has many drawbacks. This essay has discussed the advantages and disadvantages of (topic). In my opinion, I strongly agree that ${questionData.question}
        `.trim();
    
        if (answertopic) {
          template = template.replace(/\(topic\)/g, answertopic);
        }
    
        let answer = template;
    
        // Extract plain text from HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(answer, 'text/html');
        answer = doc.body.textContent || '';
        answer = answer.trim();
        const content = answerText;
    
        const nlpscore = await calculateNlpScore(answer, content);
    
        if (nlpscore > 1 || (wordCount <= 380 && wordCount >= 120)) {
          const checkTopic = answertopic ? content.includes(answertopic) : true;
          const checkAnswerQuestionContent = await match_level_words(questionData.question_name, content) || false;
          const checkAuthenticAnswer = checkTopic && checkAnswerQuestionContent;
    
          if (!checkAuthenticAnswer) {
            const score_data = {
              content: 1,
              form: 0,
              grammar: 0,
              spelling: 0,
              vocabulary: 0,
              genlinra: 0,
              devstrcoh: 0,
              highlightedText,
              nlpscore,
              grammarMistakes: 0,
              spellingMistakes: 0,
              wordCount
            };
    
            const score = 1;
            const score_data_json = JSON.stringify(score_data);
    
            return { score, totalscore, user_answer, score_data: score_data_json };
          }
    
          let setAllow = true;
          let WriteEssay = false;
          let SummarizewrittenText = true;
          const highlightText = highlightedText;
    
          const result = await CheckWritingText(
            content,
            answer,
            nlpscore,
            setAllow,
            WriteEssay,
            SummarizewrittenText,
            highlightText.split(" ") 
          );
    
          if (result && typeof result !== "string") {
            let spelling = result.totalSpellingMistakes;
            let grammar = result.totalGrammarMistakes;
            const vocab = 0.5 * spelling;
    
            const calculateScore = (value: number, threshold: number): number => {
              return value > threshold ? 0 : 2 - value;
            };
    
            const adjustContentScore = (contentScore: number, wordCount: number, nlpscore: number): number => {
              if (wordCount >= 200 && wordCount <= 300) {
                contentScore = 3;
              } else if (wordCount > 300) {
                contentScore = 1;
              }
              if (nlpscore > 30 && nlpscore < 45) {
                contentScore -= 0.5;
              }
              return contentScore;
            };
    
            let rform = (wordCount <= 300 && wordCount >= 200) ? 2 : 0;
            const rspelling = calculateScore(spelling, 2);
            const rvocabulary = calculateScore(vocab, 2);
            const rgrammar = calculateScore(grammar, 2);
    
            let rcontent = 1;
            rcontent = adjustContentScore(rcontent, wordCount, nlpscore);
    
            let genlinra = 2;
            let devstrcoh = 2;
    
            const total_wrong_words = spelling + grammar;
    
            // function formatScore(score: number): number {
            //   return parseFloat(score.toFixed(2));
            // }
            const formatScore = (score: number): number => {
              return parseFloat(score.toFixed(2));
            };
    
            rcontent = Math.max(0, rcontent - total_wrong_words * 0.10);
            genlinra = Math.max(0, genlinra - total_wrong_words * 0.05);
            devstrcoh = 2;
    
            const sumofscores = rcontent + genlinra + rgrammar + rform + rspelling + rvocabulary + devstrcoh;
            const score = formatScore(sumofscores);
    
            const sumhighlightedText = highlightedWords.length > 0
              ? updateHighlightedText(highlightedWords, highlightedText)
              : highlightedText;
    
            const score_data = {
              content: formatScore(rcontent),
              form: rform,
              grammar: formatScore(rgrammar),
              spelling: formatScore(rspelling),
              vocabulary: formatScore(rvocabulary),
              genlinra: formatScore(genlinra),
              devstrcoh: devstrcoh,
              highlightedText: sumhighlightedText,
              nlpscore,
              grammarMistakes: grammar,
              spellingMistakes: spelling,
              wordCount
            };
    
            const score_data_json = JSON.stringify(score_data);
            return { score, totalscore, user_answer, score_data: score_data_json };
          }
        } else {
          let rcontent = 2;
          if (wordCount > 300 || wordCount < 200) {
            rcontent = 1;
          }
    
          const score = rcontent;
          const score_data = {
            content: rcontent,
            form: 0,
            grammar: 0,
            spelling: 0,
            vocabulary: 0,
            genlinra: 0,
            devstrcoh: 0,
            nlpscore,
            wordCount
          };
    
          const score_data_json = JSON.stringify(score_data);
          return { score, totalscore, user_answer, score_data: score_data_json };
        }
      } catch (error) {
        console.error("Error in trying to store the WriteEssayScoring data: ", error);
      }
    
      // Default fallback
      const score_data = {
        content: 0,
        form: 0,
        grammar: 0,
        spelling: 0,
        vocabulary: 0,
        genlinra: 0,
        devstrcoh: 0,
        nlpscore: 0,
        wordCount: 0
      };
    
      const score_data_json = JSON.stringify(score_data);
      return { score: 0, totalscore: 0, user_answer: '', score_data: score_data_json };

};

export default WriteEssayScoring;
