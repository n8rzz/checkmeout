const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const extractBranchList = require('./extractBranchList');

exec('git branch', (err, stdout, stderr) => {
    if (err) {
        throw err;
    }

    extractBranchNames(stdout);
});

function extractBranchNames(stdout) {
    const branchList = extractBranchList(stdout);

    if (branchList.length === 0) {
        console.log(chalk.yellow('No additional branches were found to checkout.\n Exiting'));

        return;
    }

    createCheckboxListForBranchList(branchList);
}

function createCheckboxListForBranchList(branchList) {
    const questions = [
        {
            name: 'branchToCheckout',
            type: 'list',
            message: 'Select a branch to checkout',
            choices: branchList
        }
    ];

    prompt(questions)
        .then((answers) => {
            initiateBranchChange(answers.branchToCheckout);
        });
}

function initiateBranchChange(branchToCheckout) {
    try {
        _checkoutBranch(branchToCheckout);
    } catch (error) {
        throw error;
    }
}


function _checkoutBranch(branchName) {
    exec(`git checkout ${branchName}`, (err, stdout, stderr) => {
        if (err) {
            throw err;
        }
    });
}
