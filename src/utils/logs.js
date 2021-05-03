// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0

module.exports.log = (message) => {
    if (process.env.DEBUG) {
        console.log(message);
    }
}