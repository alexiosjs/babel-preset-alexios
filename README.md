# babel-preset-alexios

### Install

```bash
## Intall locally (globally is not recommmended)
> npm install babel-preset-alexios --save-dev
```

### Usage

Edit you babel config:

```json
presets: ["alexios"]
```

### TypeScript

If you want to compile `.ts` or `.tsx` files, you can use anyway you like to compile the code into `esnext` or `ES2015`, then use the `ts-loader`, here's an example in `webpack`:

```javascript
{
    test: /\.(ts|tsx)$/,
    loader: [
        "babel-loader",
        "ts-loader"
    ]
}
```
