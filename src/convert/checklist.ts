import * as Katex from "katex";
import { changeHtml } from "./changeHtml";

export const checklist = (values: List[]) => {
  let prev: List | null = null;
  let clist = '<ul class="ul checklist">\n';
  for (const value of values) {
    if (prev && value.level > prev.level) {
      clist += '<ul class="ul">\n';
    } else if (prev && value.level < prev.level) {
      for (let i = 0; i < prev.level - value.level; i += 1) {
        clist += "</ul>\n";
      }
    }
    clist += '<li class="li checklist">';
    if (value.checked) {
      clist += '<input type="checkbox" checked="checked">';
    } else {
      clist += '<input type="checkbox">';
    }
    for (const data of value.values) {
      switch (data.name) {
        case "em":
          clist += `<strong>${data.value}</strong>`;
          break;
        case "strikethrough":
          clist += `<del>${data.value}</del>`;
          break;
        case "italic":
          clist += `<em>${data.value}</em>`;
          break;
        case "emitalic":
          clist += `<em><strong>${data.value}</strong></em>`;
          break;
        case "link": {
          const path = changeHtml(data.href);
          clist += `<a href="${path}" class="a">${data.title}</a>`;
          break;
        }
        case "image":
          clist += `<img src="${data.src}" alt="${data.alt}" class="img" />`;
          break;
        case "video":
          clist += `<video controls preload="none" class="video">\n<source src="${data.src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
          break;
        case "code":
          clist += `<code class="inline-code">${data.value}</code>`;
          break;
        case "katex": {
          const html = Katex.renderToString(
            String.raw`\displaystyle ${data.value}`,
            {
              throwOnError: false,
            },
          );
          clist += html;
          break;
        }
        default: {
          if (data.value === "\n") {
            clist += "<br>";
          } else {
            clist += data.value;
          }
          break;
        }
      }
    }
    clist += "</li>\n";
    prev = value;
  }
  clist += "</ul>\n";
  return clist;
};
