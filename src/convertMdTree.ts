import { convert } from "./convert/index";
import "./type";
import "../styles/richmd.css";
import { parseTree } from "@richmd/core";

export const convertMdTree = (tree: Tree) => {
  const mdTree: object[] & Convert[] = tree.ast;
  let htmlValue = "";
  let prev;
  let bqValue: Convert[][] = [];
  let listValue: List[] = [];
  let orderListValue: List[] = [];
  let checkListValue: List[] = [];
  for (const line of mdTree) {
    switch (line.name) {
      case "heading":
        if (line.values.length !== 0) {
          htmlValue += convert.heading(line.level, line.values);
        }
        prev = line;
        break;
      case "paragraph":
        if (prev && prev.name === "blockquote") {
          bqValue.push(line.values);
          if (line === mdTree[mdTree.length - 1]) {
            htmlValue += convert.blockquote(bqValue);
          }
        } else {
          htmlValue += convert.paragraph(line.values);
          prev = line;
        }
        break;
      case "blockquote":
        bqValue.push(line.values);
        if (line === mdTree[mdTree.length - 1]) {
          htmlValue += convert.blockquote(bqValue);
        }
        prev = line;
        break;
      case "list":
        listValue.push({ level: line.level, values: line.values });
        if (line === mdTree[mdTree.length - 1]) {
          htmlValue += convert.ulist(listValue);
        }
        prev = line;
        break;
      case "checklist":
        checkListValue.push({
          level: line.level,
          values: line.values,
          checked: line.checked,
        });
        if (line === mdTree[mdTree.length - 1]) {
          htmlValue += convert.checklist(checkListValue);
        }
        prev = line;
        break;
      case "orderedlist":
        orderListValue.push({ level: line.level, values: line.values });
        if (line === mdTree[mdTree.length - 1]) {
          htmlValue += convert.olist(orderListValue);
        }
        prev = line;
        break;
      case "code":
        htmlValue += convert.code(line);
        break;
      case "horizontal":
        htmlValue += convert.horizontal();
        break;
      case "table":
        htmlValue += convert.table(line);
        break;
      case "katex":
        htmlValue += convert.katex(line);
        break;
      case "color":
        htmlValue += convert.colorBlock(line);
        break;
      case "startDetails":
        htmlValue += convert.startDetails(line.summary);
        break;
      case "endDetails":
        htmlValue += convert.endDetails();
        break;
      case "startTag":
        htmlValue += convert.startTag(line);
        break;
      case "endTag":
        htmlValue += convert.endTag(line);
        prev = line;
        break;
      case "br": {
        if (bqValue.length !== 0) {
          htmlValue += convert.blockquote(bqValue);
          bqValue = [];
          prev = line;
        } else {
          if (prev) {
            switch (prev.name) {
              case "list":
                htmlValue += convert.ulist(listValue);
                listValue = [];
                prev = line;
                break;
              case "orderedlist":
                htmlValue += convert.olist(orderListValue);
                orderListValue = [];
                prev = line;
                break;
              case "checklist":
                htmlValue += convert.checklist(checkListValue);
                checkListValue = [];
                prev = line;
                break;
              default:
                htmlValue += convert.br();
                prev = line;
                break;
            }
          }
        }
        break;
      }
      default:
        break;
    }
  }
  return htmlValue;
};

export const convertMdText = (text: string) => {
  return convertMdTree(parseTree(text));
};
