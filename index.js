var getSubPathnameFunc = function (pathname) {
  pathname = pathname || '';
  var subPathname = (typeof pathname !== 'string' && pathname.pathname !== undefined)
    ? pathname.pathname
    : pathname;

  return this.pathname.replace(subPathname, '');
}

var config = {};

module.exports = function (key) {
  return config[key] || null;
}

module.exports.buildRouting = function (components) {
  var componentEmbeded = {};

  Object.keys(components).forEach(function (componentName) {
    var component = components[componentName];
    var embededKey = componentName + 'Page';

    if (component.pathname !== undefined) {
      var name = componentName.replace(
        /\.?([A-Z])/g,
        function (x, y) {
          return "-" + y.toLowerCase()
        }
      ).replace(/^-/, '');

      config[name] = component.pathname;
      component.getPath = getSubPathnameFunc.bind(component);
    }

    componentEmbeded[embededKey] = component;
  })

  return componentEmbeded;
}
