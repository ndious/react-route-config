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

module.exports.defineRoute = function (name, route) {

  return function (component) {
    component.pathname = route;
    config[name] = route;
    component.getPath = getSubPathnameFunc.bind(component);

    return component;
  }
}
