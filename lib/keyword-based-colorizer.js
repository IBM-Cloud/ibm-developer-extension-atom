'use babel';

export default class KeywordBasedColorizer {

  rules = []

  constructor() {
    this.rules = [
      { regex: new RegExp(/"(.*?)"/g), style: 'syntax--storage' },
      { regex: new RegExp(/'(.*?)'/g), style: 'syntax--storage' },
      { regex: new RegExp(/\b\d+\.?\d*?\b/), style: 'syntax--storage' },
      { regex: new RegExp(/\b([a-z]|[0-9])+\:((\/\/)|((\/\/)?(\S)))+\b/), style: 'syntax--storage' },
      { regex: new RegExp(/\b(Down|Error|Err|Failure|Failed|Fail|Fatal|false)/ig), style: 'syntax--variable' },
      { regex: new RegExp(/\b(hint|info|information|true|log|warning|warn|test|debug|null|undefined|NaN)/ig), style: 'syntax--storage' },
    ];
  }

  colorize(message) {

    //double quotes
    for (var i=0; i<this.rules.length; i++) {
      let rule = this.rules[i];
      message = message.replace(rule.regex, function (match) {
        return `<span class="${rule.style}">${match}</span>`;
      });
    }
    return message;
  }
}
