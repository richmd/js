export const startTag = (data: Convert) => {
  if (!data.tag) {
    if (!data.style) {
      return "<span>\n";
    }
    return `<span class="${data.style}">\n`;
  }
  if (!data.style) {
    return `<${data.tag}>\n`;
  }
  return `<${data.tag} class="${data.style}">\n`;
};

export const endTag = (data: Convert) => {
  if (!data.tag) {
    return "</span>\n";
  }
  return `</${data.tag}>\n`;
};
