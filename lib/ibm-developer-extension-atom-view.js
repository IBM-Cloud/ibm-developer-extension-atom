'use babel';

export default class IbmDeveloperExtensionAtomView {

  bodyContent = undefined
  bodyContentWrapper = undefined
  closeButton = undefined
  clearButton = undefined
  titleContent = undefined

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('ibm-developer-extension-atom');

    this.titleContent = document.createElement('div');
    this.titleContent.classList.add('ibm-title');
    this.titleContent.innerText = "IBM Cloud Developer Tools";
    this.element.appendChild(this.titleContent);

    this.clearButton = document.createElement('div');
    this.clearButton.classList.add('ibm-clear-button');
    this.clearButton.alt = "Clear Output"
    this.clearButton.innerHTML = "\u2717";
    this.element.appendChild(this.clearButton);

    this.bodyContentWrapper = document.createElement('div');
    this.bodyContentWrapper.classList.add('ibm-body-content-wrapper');

    this.bodyContent = document.createElement('div');
    this.bodyContent.classList.add('output');
    this.bodyContentWrapper.appendChild(this.bodyContent);
    this.element.appendChild(this.bodyContentWrapper);

    let self = this;
    this.clearButton.addEventListener('click', function(event){
      self.clearContent();
    })
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  clearContent() {
    this.bodyContent.innerHTML = "";
  }

  append(msg, newline) {
    let placeholder = "\u200C";
    if (newline && this.bodyContent.innerHTML.length > 0) {
      msg = "\n" + msg;
    }
    let innerHTML = this.bodyContent.innerHTML.replace(/\u200C/g, '') + msg;
    let scrollHeight = this.element.scrollHeight;


    while (innerHTML.indexOf("\b") != -1)
    {
        innerHTML = innerHTML.replace(/.\x08/, "");
    }

    this.bodyContent.innerHTML = innerHTML.replace(/\n/g, "<br/>") + placeholder;
    if (scrollHeight < this.bodyContentWrapper.scrollHeight) {
      this.bodyContentWrapper.scrollTop = this.bodyContentWrapper.scrollHeight;
    }
  }

}
