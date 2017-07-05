'use strict';

const Lab =  require('lab');
const route = require('./index');
const { expect } = require('code');
const { describe, it } = exports.lab = Lab.script();

describe('Test path configuration', () => {
  it ('should add the getPath function', done => {
    const Page = {};
    const PageDefined = route.defineRoute('test', '/test')(Page);

    expect(PageDefined.getPath).to.be.a.function();
    expect(PageDefined.getPath()).to.equal('/test');
    expect(PageDefined.getPath('/')).to.equal('test');
    done();
  });

  it ('getPath should accept an other component', done => {
    const Page = {};
    const PageDefined = route.defineRoute('test', '/test')(Page);
    const PageBis = {};
    const PageBisDefined = route.defineRoute('test-bis', '/test/bis')(PageBis);

    expect(PageBisDefined.getPath('/')).to.equal('test/bis');
    expect(PageBisDefined.getPath(PageDefined)).to.equal('/bis');
    done();
  });

  it ('routeFor should return the correct url',  done => {
    const Page = {};
    const PageDefined = route.defineRoute('test', '/test')(Page);
    const PageBis = {};
    const PageBisDefined = route.defineRoute('test-bis', '/test/bis')(PageBis);

    expect(route('test')).to.equal('/test');
    expect(route('test-bis')).to.equal('/test/bis');
    expect(route('non-existant-route')).to.equal(null);
    done();
  });
});