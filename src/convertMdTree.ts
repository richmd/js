import { convert } from "./convert/index";
import "./type";
import "../styles/richmd.css";

export const convertMdTree = (tree: Tree) => {
  const mdTree: object[] & Convert[] = tree.ast;
  const pageMode = mdTree.shift() as Convert;
  let htmlValue = "";
  let prev;
  let bqValue: Convert[][] = [];
  let slideValue: string[] = [];
  let listValue: List[] = [];
  let orderListValue: List[] = [];
  let checkListValue: List[] = [];
  for (const line in mdTree) {
    switch (mdTree[line].name) {
      case "heading":
        if (mdTree[line].values.length !== 0) {
          htmlValue += convert.heading(mdTree[line].level, mdTree[line].values);
        }
        prev = mdTree[line];
        break;
      case "paragraph":
        if (prev && prev.name === "blockquote") {
          bqValue.push(mdTree[line].values);
          if (mdTree[line] === mdTree[mdTree.length - 1]) {
            htmlValue += convert.blockquote(bqValue);
          }
        } else {
          htmlValue += convert.paragraph(mdTree[line].values);
          prev = mdTree[line];
        }
        break;
      case "blockquote":
        bqValue.push(mdTree[line].values);
        if (mdTree[line] === mdTree[mdTree.length - 1]) {
          htmlValue += convert.blockquote(bqValue);
        }
        prev = mdTree[line];
        break;
      case "list":
        listValue.push({ level: mdTree[line].level, values: mdTree[line].values });
        if (mdTree[line] === mdTree[mdTree.length - 1]) {
          htmlValue += convert.ulist(listValue);
        }
        prev = mdTree[line];
        break;
      case "checklist":
        checkListValue.push({
          level: mdTree[line].level,
          values: mdTree[line].values,
          checked: mdTree[line].checked,
        });
        if (mdTree[line] === mdTree[mdTree.length - 1]) {
          htmlValue += convert.checklist(checkListValue);
        }
        prev = mdTree[line];
        break;
      case "orderedlist":
        orderListValue.push({ level: mdTree[line].level, values: mdTree[line].values });
        if (mdTree[line] === mdTree[mdTree.length - 1]) {
          htmlValue += convert.olist(orderListValue);
        }
        prev = mdTree[line];
        break;
      case "code":
        htmlValue += convert.code(mdTree[line]);
        break;
      case "horizontal":
        htmlValue += convert.horizontal();
        break;
      case "table":
        htmlValue += convert.table(mdTree[line]);
        break;
      case "katex":
        htmlValue += convert.katex(mdTree[line]);
        break;
      case "color":
        htmlValue += convert.colorBlock(mdTree[line]);
        break;
      case "startDetails":
        htmlValue += convert.startDetails(mdTree[line].summary);
        break;
      case "endDetails":
        htmlValue += convert.endDetails();
        break;
      case "startSlide":
        htmlValue += convert.startSlide(mdTree[line].layout, mdTree[line].mode, mdTree[line].theme, slideValue.length);
        break;
      case "endSlide":
        if (listValue.length !== 0) {
          htmlValue += convert.ulist(listValue);
          listValue = [];
        } else if (orderListValue.length !== 0) {
          htmlValue += convert.olist(orderListValue);
          orderListValue = [];
        } else if (checkListValue.length !== 0) {
          htmlValue += convert.checklist(checkListValue);
          checkListValue = [];
        } else if (bqValue.length !== 0) {
          htmlValue += convert.blockquote(bqValue);
          bqValue = [];
        }
        htmlValue += convert.endSlide();
        slideValue.push(htmlValue);
        prev = mdTree[line];
        htmlValue = "";
        break;
      case "startTag":
        htmlValue += convert.startTag(mdTree[line]);
        break;
      case "endTag":
        if (listValue.length !== 0) {
          htmlValue += convert.ulist(listValue);
          listValue = [];
        } else if (orderListValue.length !== 0) {
          htmlValue += convert.olist(orderListValue);
          orderListValue = [];
        } else if (checkListValue.length !== 0) {
          htmlValue += convert.checklist(checkListValue);
          checkListValue = [];
        } else if (bqValue.length !== 0) {
          htmlValue += convert.blockquote(bqValue);
          bqValue = [];
        }
        htmlValue += convert.endTag(mdTree[line]);
        prev = mdTree[line];
        break;
      case "br":
        if (bqValue.length !== 0) {
          htmlValue += convert.blockquote(bqValue);
          bqValue = [];
          prev = mdTree[line];
        } else if (prev && prev.name === "list") {
          htmlValue += convert.ulist(listValue);
          listValue = [];
          prev = mdTree[line];
        } else if (prev && prev.name === "orderedlist") {
          htmlValue += convert.olist(orderListValue);
          orderListValue = [];
          prev = mdTree[line];
        } else if (prev && prev.name === "checklist") {
          htmlValue += convert.checklist(checkListValue);
          checkListValue = [];
          prev = mdTree[line];
        } else if (prev && prev.name === "br") {
          htmlValue += convert.br();
          prev = mdTree[line];
        } else if (prev && prev.name === "paragraph") {
          htmlValue += convert.br();
          prev = mdTree[line];
        } else {
          htmlValue += convert.br();
          prev = mdTree[line];
        }
        break;
      default:
        break;
    }
  }

  if (pageMode.mode === "slide") {
    const value = slideValue.map((slide) => slide).join("\n");
    return {
      html: `<div class="richmd-slide">\n${value}\n</div>`,
      slide: slideValue,
      mode: "slide",
    };
  }

  return {
    html: `<div class="richmd">\n${htmlValue}\n</div>`,
    slide: [],
    mode: "page",
  };
};
