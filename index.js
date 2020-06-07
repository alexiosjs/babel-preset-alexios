function gen(api, opts, nodeEnv) {
  if (!opts) {
    opts = {};
  }

  opts = Object.assign(
    {
      helpers: false,
    },
    opts
  );
  var IS_DEV = !!("development" === nodeEnv);
  var IS_PROD = !!("production" === nodeEnv);
  return {
    presets: [
      [
        require.resolve("@babel/preset-env"),
        {
          /**
           * 保证入口文件出引入的polyfill能被正确处理
           * polyfill不做强制引用，抽成公共包，如果需要兼容ie>=9可以按需引入
           */
          useBuiltIns: "entry",
          corejs: 3,
          modules: false,
          exclude: ["transform-typeof-symbol"],
        },
      ],
      [
        require.resolve("@babel/preset-react"),
        {
          development: IS_DEV,
          useBuiltIns: true,
        },
      ],
    ].filter(Boolean),
    plugins: [
      require("babel-plugin-macros"),
      [require.resolve("@babel/plugin-proposal-decorators"), false],
      // class-properties的优先级必须排在decorators的后面
      [
        require.resolve("@babel/plugin-proposal-class-properties"),
        {
          loose: true,
        },
      ],
      require.resolve("@babel/plugin-proposal-numeric-separator"),
      [
        require.resolve("@babel/plugin-transform-runtime"),
        {
          corejs: false,
          helpers: false,
          regenerator: true,
          version: require("@babel/runtime/package.json").version,
        },
      ],
      IS_PROD && [
        require.resolve("babel-plugin-transform-react-remove-prop-types"),
        {
          removeImport: true,
        },
      ],
      require.resolve("@babel/plugin-proposal-optional-chaining"),
      require.resolve("@babel/plugin-proposal-nullish-coalescing-operator"),
      require.resolve("./plugins/auto-switch-css-module.js"),
    ].filter(Boolean),
  };
}

module.exports = function (api, opts) {
  var nodeEnv = process.env.NODE_ENV;

  if (!opts) {
    opts = {};
  }

  if (nodeEnv === "development" || opts.env === "development") {
    return gen(api, opts, "development");
  } else if (nodeEnv === "production" || opts.env === "production") {
    return gen(api, opts, "production");
  } else {
    throw new Error(
      '\n\nUsing "babel-preset-alexios", you must set process.env.NODE_ENV or preset\'s options.env to "development" or "production".\n\n '
    );
  }
};
