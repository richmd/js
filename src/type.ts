interface Convert {
  name: string;
  value: string;
  href: string;
  title: string;
  src: string;
  alt: string;
  level: number;
  checked: boolean;
  style: string;
  values: Convert[];
  tag: string;
  file: string;
  syntax: string;
  headings: string[];
  rows: Convert[][][];
  summary: string;
  mode: string;
  layout: string;
  theme: string;
}
interface List {
  level: number;
  checked?: boolean;
  values: Convert[];
}

interface OptionalConvert {
  file: string;
  syntax: string;
  values: { value: string }[];
}

interface Table {
  headings: string[];
  rows: { value: string }[][][];
}

interface MdTree {
  level: number;
  name: string;
  values: value[] | Convert[];
  checked?: boolean;
  summary: string;
}

interface value {
  value: string;
}

interface Tree {
  ast: object[] & Convert[];
}
