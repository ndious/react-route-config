'use strict';

const Lab =  require('lab');
const rrc = require('./index');
const { expect } = require('code');
const { describe, it } = exports.lab = Lab.script();

const Sandwiches = { name: 'sandwiches' }

const routes = [
  { path: '/sandwiches',
    component: Sandwiches,
    routes: [
      { path: '/sandwiches/cart',
        component: {}
      }
    ]
  },
  { path: '/tacos',
    component: {},
    routes: [
      { path: '/tacos/bus',
        component: {},
        routes: [
          { path: '/tacos/bus/stop',
            component: {}
          }
        ]
      },
      { path: '/tacos/cart',
        component: {}
      }
    ]
  }
]

var Page = rrc.defineRoute('sandwiches', '/sandwiches')(Sandwiches);
rrc.defineRoute('stop', '/tacos/bus/stop')({});
rrc.defineRoute('bus', '/tacos/bus')({});
rrc.defineRoute('sandwiches-cart', '/sandwiches/cart')({});
rrc.defineRoute('tacos', '/tacos')({});
rrc.defineRoute('cart', '/tacos/cart')({});

describe('Test path configuration', () => {
  it ('should add the getPath function', done => {
    expect(Page.path).to.be.a.string();
    expect(Page.path).to.equal('/sandwiches');
    expect(Page.component).to.be.an.object();
    expect(Page.component).to.equal(Sandwiches);
    done();
  });

  it ('exportRoutes should return the correct structure', done => {
    var routes = rrc.exportRoutes()
    expect(routes).to.equal(routes);
    expect(rrc.exportRoutes()).to.equal(routes);
    done();
  });

  it ('routeFor should return the correct url',  done => {
    expect(rrc('tacos')).to.equal('/tacos');
    expect(rrc('bus')).to.equal('/tacos/bus');
    expect(rrc('non-existant-route')).to.equal(null);
    done();
  });
});