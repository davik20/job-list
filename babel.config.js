

module.exports = (api) => {
    api.cache(true);
  
    const presets = [
      [
        'next/babel',
        {
          'preset-react': {
            runtime: 'automatic',
            // importSource: '@emotion/react',
          },
        },
      ],
    ];


  const plugins = [];

  return {
    presets,
    plugins,
  };
};
