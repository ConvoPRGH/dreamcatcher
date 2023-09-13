export default class TemplateManager {
  templates;

  constructor() {
    let rawTemplates = [...document.querySelectorAll('script[type="text/x-handlebars"]')];
    this.templates = {};
    rawTemplates.forEach(template => {
      this.templates[template.id] = Handlebars.compile(template.innerHTML);
      if (template.dataset['type'] === 'partial') {
        Handlebars.registerPartial(template.id, this.templates[template.id]);
      }
    });
  }
};