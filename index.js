var config = {};
var routing = [];

var buildRoutingTree = function (route, component, routes) {
  if (routes === undefined) {
    return [
      {
        component,
        path: route,
      }
    ]
  }

  var parent = routes.findIndex(function (el) {
    return route.includes(el.path)
  })
  var child = routes.findIndex(function (el) {
    return el.path.includes(route)
  })
  
  if (parent !== -1) {
    routes[parent].routes = buildRoutingTree(route, component, routes[parent].routes)
    return routes
  } else if ( child !== -1) {
    var routeChild = routes[child]
    routes.splice(child, 1)

    return [
      ...routes,
      {
        component,
        path: route,
        routes: [routeChild]
      }
    ]
  }

  return [
    ...routes,
    {
      component,
      path: route,
    }
  ]
}

var buildRouting = function (route, component, routes) {
  var tree = routes.findIndex(function (el) {
    return route.includes(el.path) || el.path.includes(route)
  })
  if (tree !== -1) {
    return buildRoutingTree(route, component, routes)
  }
  return [
    ...routes,
    {
      component,
      path: route,
    }
  ]
}

module.exports = function (key) {
  return config[key] || null;
}

module.exports.defineRoute = function (name, route) {

  return function (component) {
    config[name] = route;

    routing = buildRouting(route, component, routing)

    return {
      path: route,
      component,
    }
  }
}

module.exports.exportRoutes = function () {
  return routing
}



