import { convertMdText } from "./convertMdTree";
import "./type";
import "../styles/richmd.css";
import HtmlParse from "node-html-parser"

export const richmd = (text: string) => {
  const convertHtml = convertMdText(text);
  return HtmlParse(`<div class="richmd">${convertHtml}</div>`);
}
