export default function parseHtmlString(htmlString) {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlString, 'text/html');

    // Extract text content but exclude <strong> tags from being parsed
    const textContent = Array.from(parsedHtml.body.childNodes)
        .map(node => {
            if (node.nodeName.toLowerCase() === 'strong' || node.nodeName.toLowerCase() === 'div') {
                return `<div class="listening-header"><strong>${node.textContent}</strong></div>`;
            } if (node.nodeName.toLowerCase() === 'p') {
                return `<div class="part-sec paragraph">${node.textContent}</div>`;
            }
             if (node.nodeName.toLowerCase() === 'br') {
                return `<div class="part-sec break">${node.textContent}</div>`;
                // return `<br/>`;
            }
             else {
                return node.textContent;
            }
        })
        .join('');

    return textContent;
}
