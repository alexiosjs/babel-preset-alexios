# babel-preset-alexios

### Install

```bash
## Intall locally (globally is not recommmended)
> npm install babel-preset-alexios --save-dev
```

### Usage

Using the `babel-preset-alexios`, you must set the `process.env.NODE_ENV` or preset's options.env to `development` or `production`,

Like this:

```javascript
// your js code
process.env.NODE_ENV = "development"; // or "production";
```

```json
// .babelrc
presets: ["alexios"]
```

or

```json
presets: [
    ["alexios", { "env": "development" }]
]
```

### Features

We have collected most of the `plugins` and `preset` you need for development, provide the same `zero configuration` experience as `create-react-app`

presets:

- @babel/preset-env
- @babel/preset-react

plugins:

- @babel/plugin-proposal-class-properties
- @babel/plugin-proposal-decorators
- @babel/plugin-proposal-nullish-coalescing-operator
- @babel/plugin-proposal-numeric-separator
- @babel/plugin-proposal-optional-chaining
- @babel/plugin-transform-runtime
- @babel/runtime
- babel-plugin-macros
- babel-plugin-transform-react-remove-prop-types

extra:

- Automatically identify whether to import style files in the way of `cssModule`, if so, the `import statements` will be automatically added with `?css_modules` suffix, you can use this in your `webpack config`. Support: `css`, `less`, `scss`, `sass`, `stylus`, `style`. For example:

```js
rules: [
  {
    oneOf: [
      {
        test: /\.css$/,
        resourceQuery: /css_modules/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      {
        test: /\.css$/,
        resourceQuery: /css_modules/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
];
```

### TypeScript

We do not provide the ability to compile `.ts` files, if you want, you can first convert it to `js` code in any way you like, then use `babel-preset-alexios`, here's an example in `webpack`:

```javascript
rules: [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules|bower_components/,
    loader: [
      "babel-loader", // make sure you have config the babel-preset-alexios
      "ts-loader", // any way you like
    ],
  },
];
```

### Compatibility

By default, we do not provide compatible processing for browsers with lower versions, such as IE 9, if you want, you can import `polyfill` in the top of your entry file, and then we'll recognize it automatically.
