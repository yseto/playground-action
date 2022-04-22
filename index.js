const core = require('@actions/core');

async function run() {
  try {
    core.saveState("startEpoch", Math.round(Date.now() / 1000));
  } catch (error) {
     core.setFailed(error.message);
  }
}

run();
