[![Build
[![License](https://img.shields.io/badge/license-Apache%202.0-green.svg?style=flat)](https://raw.githubusercontent.com/IBM-Bluemix/ibm-developer-extension-vscode/master/LICENSE.txt)

# IBM Cloud Developer Tools for Atom

This extension provides capabilities for the IBM Cloud Developer CLI from directly within the Atom editor. Use the Packages menu or command palette to quickly access `ibmcloud dev` commands, without the need to leave the editor's context.

## Changelog
- *v0.0.1* - first public release

## Usage

Easily invoke commands from the IBM Bluemix Developer CLI from directly inside of the VS Code editor:

- Use the `ibmcloud login` command to log in to Bluemix

Steps to get started:
- Create a project using one of the two methods below:
    - `ibmcloud dev create` using the Bluemix Developer CLI (outside of VS Code)
    - [Bluemix Web console](https://console.ng.bluemix.net/developer/getting-started/)
- Open the *project’s folder* locally in the Atom editor
- Open the VS Code command pallette (`CMD-Shift-P`)
  - Use the `ibmcloud dev build` command to build the app into a Docker image
  - Use the `ibmcloud dev run` command to run the app in local Docker in release mode
  - Use the `ibmcloud dev console` command to open your project on Bluemix in a web browser



## Requirements/Dependencies

* [Bluemix CLI](https://plugins.ng.bluemix.net/ui/home.html)
* Bluemix `dev` cli plugin   
    After installing the Bluemix CLI, open up a terminal and run `ibmcloud plugin install dev -r Bluemix`
* [Docker](https://www.docker.com/) - required by `ibmcloud dev` containers



## Contributing

All improvements to the Bluemix Dev Extension for Atom are very welcome! Here's how to get started ...

Fork this repository.
$ git clone https://github.com/IBM-Bluemix/ibm-developer-extension-atom.git

Start making your changes, then send us a pull request.

You can find more info on contributing in our [contributing guidelines](./CONTRIBUTING.md).

You can find more info about the development environment and configuration in our [development guidelines](./DEVELOPMENT.md)

## ⚠️  Bugs / Issues / Defects

Find a bug?  [Let us know here](https://github.com/IBM-Bluemix/ibm-developer-extension-atom/issues)

For additional support, find us on Slack or Stack Overflow using the links below.

### ![Slack](assets/slack.png) Connect on Slack
[Sign up](https://ibm.biz/IBMCloudNativeSlack) for our slack team and join the [#bluemix-dev-services](https://ibm-cloud-tech.slack.com/messages/bluemix-dev-services) channel to ask questions and chat with fellow users.

### ![Stack Overflow](assets/stack_overflow.png) Check Stack Overflow
Search for the [bluemix-dev-services](http://stackoverflow.com/questions/tagged/bluemix-dev-services) tag on Stack Overflow for answers to common questions.
