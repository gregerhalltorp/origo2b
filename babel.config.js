console.log('this runs', process.env.NODE_ENV);
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false,
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};