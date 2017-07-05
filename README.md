# Usage

## declare route

> in pages/page.jsx
```js
import React from 'react'

const Page = () => (<div>My page</div>)

export default defineRoute('my-page', '/path/to/my/page')(Page)
```

> in pages/page-bis.jsx
```js
import React from 'react'

const PageBis = () => (<div>My page</div>)

export default defineRoute('my-page-bis', '/path/to/my/page/bis')(PageBis)
```


## Build your react-router (v3)

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

const MyLink = () => (<Link to={routeFor('my-page')}>My page</Link>)

export default MyLink
```