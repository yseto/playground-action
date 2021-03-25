const core = require('@actions/core');

async function run() {
  try {
    const mode = core.getInput('mode');

    if (mode === "start") {
      const json = JSON.stringify([{ x : 1, y : 2}, { x : 2, y : 3}]);
      core.setOutput('data1', json);
      core.setOutput('data2', "hello");
    }
    if (mode === "finish") {
      core.info("finish");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
