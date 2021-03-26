const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const token = core.getInput('token');
    core.info("start");

    const seconds = Math.floor(Date.now() / 1000);
    const branchName = `branch-${seconds}`;
    await exec.exec('git', ['checkout', '-b', branchName]);

    core.saveState("seconds", seconds);
    core.saveState("branchName", branchName);
    core.saveState("token", token);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
