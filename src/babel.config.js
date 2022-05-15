module.exports =
    {
      // "presets": [
      //   ['@vue/app', {
      //     useBuiltIns: 'entry'
      //   }]
      // ],
      "presets": [["es2015", { "modules": false }]],
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    }