import { parseTree } from "@richmd/core";
import { convertMdTree } from "./convertMdTree";
import "./type";
import "../styles/richmd.css";

export const richmd = (text: string) => convertMdTree(parseTree(text));

// @ts-ignore-next-line
export const convertTree = (data: any) => convertMdTree(data);
