# Installation

`npm install react-router@3 react-route-config@1`

# Usage

react-route-config help you to declare route into react-router v3 and give you an helper to retrieve route pathname

[react-router v3 DOC](https://github.com/ReactTraining/react-router/tree/v3/docs)

## Declare route

> in pages/page.jsx
```js
import React from 'react'
import { defineRoute } from 'react-route-config'

const Page = () => (<div>My page</div>)

export default defineRoute('my-page', '/path/to/my/page')(Page)
```

> in pages/page-bis.jsx
```js
import React from 'react'
import { defineRoute } from 'react-route-config'

const PageBis = () => (<div>My page Bis</div>)

export default defineRoute('my-page-bis', '/path/to/my/page/bis')(PageBis)
```


## Build your react-router (v3)

[react-router route configuration](https://github.com/ReactTraining/react-router/blob/v3/docs/guides/RouteConfiguration.md)

> in index.js
```js
import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRedirect, Route, hashHistory } from 'react-router'

import App from './app'
import Page from './pages/page'
import PageBis from './pages/page-bis'

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to={Page.getPath()} />
      <Route path={Page.getPath('/')} component={Page}>
        <Route path={PageBis.getPath(Page)} component={PageBis} />
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

const MyLink = () => (
  <ul>
    <li><Link to={routeFor('my-page')}>My page</Link></li>
    <li><Link to={routeFor('my-page-bis')}>My page Bis</Link></li>
  </ul>
)

export default MyLink
```