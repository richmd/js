export const startSlide = (layout: string, mode: string, theme: string, count: number) =>
  `<section id="slide-${count+1}" class="slide slide-${mode} slide-layout-${layout} ${theme}-theme">\n`

export const endSlide = () => "</section>\n";
