const core = require('@actions/core');
const fetch = require('node-fetch');


async function run() {
  try {
    const title = core.getInput('title');
    const service = core.getInput('service');
    const apikey = core.getInput('apikey');

    const body = {
      title: title,
      from: parseInt(core.getState("startEpoch"), 10),
      to: Math.round(Date.now() / 1000),
      service: service,
    };

    fetch("https://api.mackerelio.com/api/v0/graph-annotations", {
        method: 'post',
        body:    JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': apikey,
        },
    })
    .then(res => res.json())
    .catch(err => console.log(err));
  } catch (error) {
     core.setFailed(error.message);
  }
}

run();
