const core = require('@actions/core');

async function run() {
  try {
    core.info("finish");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
