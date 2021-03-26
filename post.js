const core = require('@actions/core');
const exec = require("@actions/exec");
const github = require("@actions/github");

const fs = require("fs");

async function run() {
  try {
    core.info("finish");

    const token = core.getState("token");
    const octokit = github.getOctokit(token);
    const { repo: { owner, repo } } = github.context;

    const seconds = core.getState("seconds");

    const branchName = core.getState("branchName");

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
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
