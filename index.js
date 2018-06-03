const { prompt } = require('inquirer');
const chalk = require('chalk');
const branch = require('@n8rzz/branches');

(function () {
    const branchList = branch(_buildCheckboxList);

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
                throw err;
            }
        });
    }
})()
