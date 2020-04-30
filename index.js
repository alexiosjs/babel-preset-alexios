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
        require("@babel/preset-env").default,
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
        require("@babel/preset-react").default,
        {
          development: IS_DEV,
          useBuiltIns: true,
        },
      ],
    ].filter(Boolean),
    plugins: [
      require("babel-plugin-macros"),
      require("@babel/plugin-proposal-decorators").default, // class-properties的优先级必须排在decorators的后面
      [
        require("@babel/plugin-proposal-class-properties").default,
        {
          loose: true,
        },
      ],
      require("@babel/plugin-proposal-numeric-separator").default,
      [
        require("@babel/plugin-transform-runtime").default,
        {
          corejs: false,
          helpers: false,
          regenerator: true,
          version: require("@babel/runtime/package.json").version,
        },
      ],
      IS_PROD && [
        require("babel-plugin-transform-react-remove-prop-types").default,
        {
          removeImport: true,
        },
      ],
      require("@babel/plugin-proposal-optional-chaining").default,
      require("@babel/plugin-proposal-nullish-coalescing-operator").default,
    ].filter(Boolean),
  };
}

module.exports = function (api, opts) {
  var nodeEnv = process.env.NODE_ENV;

  if (!opts) {
    opts = {};
  }

  if (nodeEnv === "development") {
    return gen(api, opts, "development");
  } else if (nodeEnv === "production") {
    return gen(api, opts, "production");
  } else {
    throw new Error(
      '\n\nUsing "babel-preset-alexios", you must set process.env.NODE_ENV to "development" or "production".\n\n '
    );
  }
};
