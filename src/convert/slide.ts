export const startSlide = (layout: string, mode: string) =>
  `<section class="slide slide_${mode} slide_layout_${layout}">\n`

export const endSlide = () => "</section>\n";
