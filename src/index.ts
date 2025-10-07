import { parseTree } from "@richmd/core";
import { convertMdTree } from "./convertMdTree";
import "./type";
import "../styles/richmd.css";

export const richmd = (text: string, useSlide: boolean = true) => convertMdTree(parseTree(text, useSlide));

// @ts-ignore-next-line
export const convertTree = (data: any) => convertMdTree(data);
