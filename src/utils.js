import {escape as escapeHtml} from 'he';

class SafeHtml extends String {}

/**
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @return {SafeHtml}
 */
function html(strings, ...values) {
  const result = strings.reduce((before, after, index) => {
    const value = values[index - 1];

    if (Array.isArray(value) && value.every((it) => it instanceof SafeHtml)) {
      return before + value.join('') + after;
    }

    if (!(value instanceof SafeHtml)) {
      return before + escapeHtml(String(value)) + after;
    }

    return before + value + after;
  });

  return new SafeHtml(result);
}

export {SafeHtml, html};
