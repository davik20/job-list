

module.exports = (api) => {
    api.cache(true);
  
    const presets = [
      [
        'next/babel',
        {
          'preset-react': {
            runtime: 'automatic',
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
