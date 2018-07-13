'use babel';

import IbmDeveloperExtensionAtomView from './ibm-developer-extension-atom-view';
import CommandValidator from './command-validator';
import KeywordBasedColorizer from './keyword-based-colorizer';

const spawn = require('child_process').spawn;
const psTree = require('ps-tree');

export default class SystemCommand {

  arguments:[]
  outputView: IbmDeveloperExtensionAtomView = undefined
  validator: undefined
  colorizer: undefined

  constructor(args, outputView) {
    this.validator = new CommandValidator();
    this.colorizer = new KeywordBasedColorizer();

    this.args = args;
    this.outputView = outputView;
    this.output("\n> <b>" + this.args.join(" ") + "</b>\n", true)
    return this;
  }


  output(content, newline) {
    //console.log(arguments[0]);
    this.outputView.append(this.colorizer.colorize(content), newline);
    //this.outputView.insertText(content)
  }

  execute() {
    if (!this.validator.validate(this.args)) return;
    this.outputView.activate();

    this.stdout = '';
    this.stderr = '';

    process.env.FORCE_COLOR = true;
    const opt = {
        cwd: atom.project.getDirectories()[0].path,
        windowsHide: true,
        env: process.env
    };
    this.invocation = spawn(this.args[0], this.args.slice(1), opt);

    let buffer;

    this.invocation.stdout.on('data', (data) => {
      this.output(data.toString());
      this.stdout += data.toString();
    });

    this.invocation.stderr.on('data', (data) => {
      this.output(`${data}`);
      this.stderr += data.toString();
    });

    this.invocation.on('close', (code, signal) => {
      this.output(`\n`);
      this.outputView.suspend();
    });

    this.invocation.on('error', (error) => {
        // do something with the error?
        // for now, ignore and let the 'close' event
        // take care of things with negative status code
        this.output(`${error.toString()}`);
        this.outputView.suspend();
    });





  }

}
