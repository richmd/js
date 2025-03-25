import * as Katex from "katex";
import { changeHtml } from "./changeHtml";

export const blockquote = (values: Convert[][]) => {
  let bq = '<blockquote class="blockquote">\n';
  for (const value of values) {
    let text = '<span class="span">';
    for (const data of value) {
      switch (data.name) {
        case "em":
          text += `<strong>${data.value}</strong>`;
          break;
        case "strikethrough":
          text += `<del>${data.value}</del>`;
          break;
        case "italic":
          text += `<em>${data.value}</em>`;
          break;
        case "emitalic":
          text += `<em><strong>${data.value}</strong></em>`;
          break;
        case "link": {
          const path = changeHtml(data.href);
          text += `<a href="${path}" class="a">${data.title}</a>`;
          break;
        }
        case "image":
          text += `<img src="${data.src}" alt="${data.alt}" />`;
          break;
        case "video":
          text += `<video controls preload="none" class="video">\n<source src="${data.src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
          break;
        case "code":
          text += `<code class="inline-code">${data.value}</code>`;
          break;
        case "katex": {
          const html = Katex.renderToString(String.raw`\displaystyle ${data.value}`, {
            throwOnError: false,
          });
          text += html;
          break;
        }
        default: {
          if (data.value.match(/\n/)) {
            text += data.value.replace(/\n/g, "<br>");
          } else {
            text += data.value + "<br>";
          }
          break;
        }
      }
    }
    text += "</span>\n";
    bq += text;
  }
  bq += "</blockquote>\n";
  return bq;
};
