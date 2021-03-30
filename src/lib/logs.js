const enableLogs = true;

module.exports.log = (message) => {
    if (enableLogs) {
        console.log(message);
    }
}