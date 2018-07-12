'use babel';
const fs = require('fs');
const yaml = require('js-yaml');

export default class CommandValidator {

  validate(arguments) {
    if (arguments.length > 2) {
      let executable = arguments[0];
      let plugin = arguments[1];
      let command = arguments[2];

      //validation cases
      if (executable === "ibmcloud" && plugin === "dev" && command === "deploy") {
        let paths = atom.project.getPaths();
        if (paths.length > 0) {

          const targetFile = paths[0] + '/cli-config.yml';
          if (!fs.existsSync(targetFile)) {
            return this.displayError('Unable to Deploy', 'Could not find file cli-config.yml in project root.  Aborting deployment.');
          }

          const yml = yaml.safeLoad(fs.readFileSync(targetFile, 'utf8'));

          // if deploy target is "container", validate the deploy-imate-target and ibm-cluster values
          const deployTarget = yml['deploy-target'];
          if (deployTarget === 'container') {
            const deployImageTarget = yml['deploy-image-target'];
            if (deployImageTarget === undefined || deployImageTarget === '') {
              return this.displayError('Unable to Deploy', 'Please specify \'deploy-image-target\' in cli-config.yml for Kubernetes deployment.');
            } else {
              const regex = new RegExp(/registry.*.bluemix.net/);
              if (regex.test(deployImageTarget)) {
                const cluster = yml['ibm-cluster'];
                if (cluster === undefined || cluster === '') {
                  return this.displayError('Unable to Deploy', 'Please specify \'ibm-cluster\' in cli-config.yml for Kubernetes deployment targeting IBM Cloud.');
                }
              }
            }
          }
          else if (deployTarget !== 'buildpack' && (deployTarget !== '' && deployTarget !== undefined)) {
            return this.displayError('Unable to Deploy', 'Invalid \'deploy-target\' value in cli-config.yml.');
          } else {
            const hostname = yml['hostname'];
            if (hostname === undefined || hostname === '') {
              return this.displayError('Unable to Deploy', 'Please specify \'hostname\' in cli-config.yml for Cloud Foundry deployment.');
            } else {
              const domain = yml['domain'];
              if (domain === undefined || domain === '') {
                  return this.displayError('Unable to Deploy', 'Please specify \'domain\' in cli-config.yml for Cloud Foundry deployment.');
              }
            }
          }
        }
      }
    }
    return true;
  }

  displayError(title, message) {
    atom.notifications.addError(title, {
      dismissable:true,
      detail: message
    });
    return false;
  }

}
