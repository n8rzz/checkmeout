const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const branches = require('@n8rzz/branches');

function _buildCheckboxList(branchList) {
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
            console.log(chalk.red(stderr));

            return;
        }
    });
}

(function () {
    const branchList = branches().then((branchList) => _buildCheckboxList(branchList));
})()
