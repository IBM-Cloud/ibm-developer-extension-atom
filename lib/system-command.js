'use babel';

import IbmDeveloperExtensionAtomView from './ibm-developer-extension-atom-view';
import CommandValidator from './command-validator';

const spawn = require('child_process').spawn;
const psTree = require('ps-tree');

export default class SystemCommand {

  arguments:[]
  outputView: IbmDeveloperExtensionAtomView = undefined
  validator: undefined

  constructor(args, outputView) {
    this.validator = new CommandValidator();

    this.args = args;
    this.outputView = outputView;
    this.output("\n> <b>" + this.args.join(" ") + "</b>\n", true)
    return this;
  }


  output(content, newline) {
    //console.log(arguments[0]);
    this.outputView.append(content, newline);
    //this.outputView.insertText(content)
  }

  execute() {
    if (!this.validator.validate(this.args)) return;


    // only check if we're in a folder if not running a unit test
                // (output channel will not be defined in unit test)
                /*if (workspace.rootPath === undefined && this.outputChannel !== undefined) {
                    const message = 'Please select your project\'s working directory.';
                    this.output(`\nERROR: ${message}`);
                    window.showErrorMessage(message);
                    return;
                }*/

              //  this.output(`\n\n> ${this.command} ${this.args.join(' ')}\n`);


      //todo: atom can have multiple project roots.  this should get the root of the active project

      this.stdout = '';
      this.stderr = '';

      const opt = {
          cwd: atom.project.getDirectories()[0].path,
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

      });

      this.invocation.on('error', (error) => {
          // do something with the error?
          // for now, ignore and let the 'close' event
          // take care of things with negative status code
          this.output(`${error.toString()}`);
      });





  }

}
