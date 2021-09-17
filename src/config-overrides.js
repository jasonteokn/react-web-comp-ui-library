module.exports = {
  //Override default webconfig "node_modules\react-scipts\config\webpack.config.js"
  webpack: function override(config, env) {
    console.log('env', env)

    const svgRawLoader = {
      test: /\.svg$/i,
      loader: require.resolve('raw-loader'),
    }

    const oneOfRules = config.module.rules.find((rule) => {
      const keys = Object.keys(rule)
      return keys.includes('oneOf')
    })

    oneOfRules.oneOf.splice(0, 0, svgRawLoader)

    return config
  },
}
