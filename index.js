const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require("@actions/github");
const fs = require("fs");

async function run() {
  try {
    const chdir = core.getInput("debug_chdir");
    if (chdir) {
      process.chdir(chdir);
    }

    const token = core.getInput('token');
    const mode = core.getInput('mode');

    if (mode === 'start') {
      core.info("start");
      start();
    } else if (mode === 'finish') {
      core.info("finish");
      finish(token);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function start() {
    const seconds = Math.floor(Date.now() / 1000);
    const branchName = `branch-${seconds}`;
    await exec.exec('git', ['checkout', '-b', branchName]);

    core.setOutput("seconds", seconds);
    core.setOutput("branchName", branchName);
}

async function finish(token) {
    const octokit = github.getOctokit(token);
    const debugContext = core.getInput("debug_context");
    const [tmp_owner, tmp_repo] = debugContext ? debugContext.split("/") : [null, null];

    const owner = tmp_owner ? tmp_owner : github.context.repo.owner;
    const repo =  tmp_repo  ? tmp_repo  : github.context.repo.repo;

    const seconds = core.getInput("seconds");

    const branchName = core.getInput("branchName");

    await fs.promises.writeFile("seconds.txt", `seconds: ${seconds}`, {encoding: "utf8"});

    await exec.exec("git", ["add", "."]);
    const message = `version: ${seconds}`;
    await exec.exec('git', ['commit', '-m', message]);
    await exec.exec('git', ['push', 'origin', branchName]);

    await octokit.pulls.create({
      owner,
      repo,
      head: `${owner}:${branchName}`,
      base: 'main',
      body: message,
      title: "testing create PR",
    });
 
}

run();
