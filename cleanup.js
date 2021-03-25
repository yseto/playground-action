const core = require('@actions/core');

async function run() {
  try {
    core.info("finish");
    const state1 = core.getState("state1");
    const state2 = core.getState("state2");
    const json2 = JSON.parse(state2);
    core.info(state1);
    core.info(json2);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
