module.exports = {
    resolve: {
        extensions: [".ts", ".js"],
    },
    entry: "./electron/app.ts",
    module: {
        rules: require("./rules.webpack"),
    },
};
