// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0

const enableLogs = true;

module.exports.log = (message) => {
    if (enableLogs) {
        console.log(message);
    }
}