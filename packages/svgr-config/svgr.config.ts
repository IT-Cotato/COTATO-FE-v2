const svgrConfig = {
  // @ts-expect-error type error
  webpack: (config) => {
    // @ts-expect-error type error
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule?.issuer || /\.[jt]sx?$/,
      resourceQuery: {
        not: [...fileLoaderRule.resourceQuery.not, /url/],
      }, // exclude if *.svg?url
      use: ['@svgr/webpack'],
    });
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default svgrConfig;
