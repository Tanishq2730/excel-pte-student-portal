import parseHtmlString from "./parseHtmlString";

export default function spanHtml(htmlString) {
    const regex = /(<p[^>]*>)|(<\/p>)/g; // Regex to match <p> and </p> tags
    const result = htmlString.replace(regex, '<br/>'); // Removing <p> and </p> tags

    const result1 = parseHtmlString(result);

    // Further replacements for other tags and words
    const replacedResult = result1.replace(/(<[^>]*>)|\b(\w+)\b|(<select>.*?<\/select>)/g, function (match, tag, word, selectTag) {
        if (tag) {
            return tag; // Preserve HTML tags
        } else if (word) {
            return "<span class='dw'>" + word + "</span>"; // Wrap words in a span
        } else if (selectTag) {
            return selectTag; // Preserve select tags
        }
    });

    return replacedResult;
}
