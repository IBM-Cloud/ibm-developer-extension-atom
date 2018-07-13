'use babel';

import IbmDeveloperExtensionAtomView from './ibm-developer-extension-atom-view';
import SystemCommand from './system-command';
import { CompositeDisposable, TextEditorView } from 'atom';

export default {

  ibmDeveloperExtensionAtomView: null,
  //modalPanel: null,
  subscriptions: null,
  bluemixPanel: null,
  viewItem: null,

  activate(state) {
    this.ibmDeveloperExtensionAtomView = new IbmDeveloperExtensionAtomView(state.ibmDeveloperExtensionAtomViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    /*
      'ibm-cloud-developer:login': () => this.login(false),
      'ibm-cloud-developer:login-SSO': () => this.login(true),
      */

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ibm-cloud-developer:show': () => this.show(),
      'ibm-cloud-developer:clear': () => this.clear(),
      'ibm-cloud-developer:list': () => this.list(),
      'ibm-cloud-developer:build-for-debug': () => this.build(),
      'ibm-cloud-developer:build-for-release': () => this.buildForRelease(),
      'ibm-cloud-developer:debug': () => this.debug(),
      'ibm-cloud-developer:deploy': () => this.deploy(),
      'ibm-cloud-developer:run': () => this.run(),
      'ibm-cloud-developer:status': () => this.status(),
      'ibm-cloud-developer:stop': () => this.stop(),
      'ibm-cloud-developer:test': () => this.test(),
      'ibm-cloud-developer:view': () => this.view(),
      'ibm-cloud-developer:console': () => this.console()
    }));
  },

  deactivate() {
    //this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ibmDeveloperExtensionAtomView.destroy();
  },

  serialize() {
    return {
      ibmDeveloperExtensionAtomViewState: this.ibmDeveloperExtensionAtomView.serialize()
    };
  },

  showUI() {
    let allItems = atom.workspace.getPaneItems();
    if (!this.viewItem) {
      this.viewItem = {
        element: this.ibmDeveloperExtensionAtomView.getElement(),
        getTitle: () => 'IBM Developer Tools',
        getURI: () => 'atom://ibm-developer-extension-atom/view',
        getDefaultLocation: () => 'bottom'
      };
      atom.workspace.open(this.viewItem);
    } else {
      let self = this;
      let found = allItems.find(function(item) {
        return item.element == self.viewItem.element
      })

      if (found) {
        let targetPane = atom.workspace.paneForItem(this.viewItem)
        for (var x=0; x<targetPane.items.length; x++) {
          if (targetPane.items[x].element == self.viewItem.element) {
            targetPane.activate();
            targetPane.activateItemAtIndex(x);
            return;
          }
        }

      } else {
        atom.workspace.open(this.viewItem);
      }
    }
  },

  login(useSSO) {
    child = exec(`osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "ibmcloud login" using command down'`, function(error, stdout, stderr) {
      /*if (error) {

      }*/
      console.log(error, stdout, stderr)
    });
  },

  hide() {
    atom.workspace.hide(this.viewItem)
  },

  list() {
    this.showUI();
    new SystemCommand(["ibmcloud", "dev", "list"], this.ibmDeveloperExtensionAtomView).execute();
    return true;
  },

  build() {
    this.showUI();
    new SystemCommand(["ibmcloud", "dev", "build", "--debug"], this.ibmDeveloperExtensionAtomView).execute();
    return true;
  },

  buildForRelease() {
    this.showUI();
    new SystemCommand(["ibmcloud", "dev", "build"], this.ibmDeveloperExtensionAtomView).execute();
    return true;
  },

  debug() {
    this.showUI();
    new SystemCommand(["ibmcloud", "dev", "debug"], this.ibmDeveloperExtensionAtomView).execute();
    return true;
  },

  deploy() {
    this.showUI();
    new SystemCommand(["ibmcloud", "dev", "deploy", "--trace"], this.ibmDeveloperExtensionAtomView).execute();
    return true;
  },

  run() {
    this.showUI();
    new SystemCommand(["ibmcloud", "dev", "run"], this.ibmDeveloperExtensionAtomView).execute();
    return true;
  },

  status() {
    this.showUI();
    new SystemCommand(["ibmcloud", "dev", "status"], this.ibmDeveloperExtensionAtomView).execute();
    return true;
  },

  stop() {
    this.showUI();
    new SystemCommand(["ibmcloud", "dev", "stop"], this.ibmDeveloperExtensionAtomView).execute();
    return true;
  },

  console() {
    this.showUI();
    new SystemCommand(["ibmcloud", "dev", "console"], this.ibmDeveloperExtensionAtomView).execute();
    return true;
  },

  view() {
    this.showUI();
    new SystemCommand(["ibmcloud", "dev", "view"], this.ibmDeveloperExtensionAtomView).execute();
    return true;
  },

  show() {
    this.showUI();
    return true;
  },

  clear() {
    this.ibmDeveloperExtensionAtomView.clearContent();
    return true;
  }

};
