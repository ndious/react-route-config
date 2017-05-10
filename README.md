# Usage

## declare route

> in pages/pages.jsx
```js
import React from 'react'

const Page = () => (<div>My page</div>)

Page.pathname = '/path/to/my/page'

export default Thanks
```

## buildRouting

> in pages/index.js
```js
import { buildRouting } from 'react-route-config'

import Page from './page'
import PageBis from './page-bis'

export const { PagePage, PageBisPage } = buildRouting({Page, PageBis})
```

## Build your react-router (v3)

> in index.js
```js
import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRedirect, Route, hashHistory } from 'react-router'

import App from './app'
import { PagePage, PageBisPage } from './pages'

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to={PagePage.getPath()} />
      <Route path={PagePage.getPath('/')} component={PagePage}>
        <Route path={PageBisPage.getPath(PagePage)} component={PageBisPage} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
)
```

## Use into Link component

```js
import React from 'react'
import { Link } from 'react-router'
import routeFor from 'react-route-config'

const MyLink = () => (<Link to={routeFor('page')}>My page</Link>)

export default MyLink
```