> After several months of development, the data APIs from `Remix` have arrived for React Router in v6.4.
> 
> ~ Ryan Florence 

React Router 6.4 embraces reality with new conventions, APIs, and automatic behaviors for:
* Loading data into components
* Updating data in components
* Automatic data revalidation after updates
* Managing race conditions and interruptions for navigations, mutations, and revalidation
* Managing errors and rendering something useful to the user
* Pending UI
* Skeleton UI with <React.Suspense>
* and more...

# v6.4.x

Whoa this is a big one! `6.4.0 `brings all the data loading and mutation APIs over from Remix. Here's a quick high level overview, but it's recommended you go check out the [docs](https://reactrouter.com/), especially the [feature overview] (https://reactrouter.com/en/6.4.0/start/overview) and the [tutorial](https://reactrouter.com/en/6.4.0/start/tutorial).

## New APIs
* Create your router with `createMemoryRouter`
* Render your router with `<RouterProvider>`
* Load data with a Route `loader` and mutate with a Route `action`
* Handle errors with Route `errorElement`
* Defer non-critical data with `defer` and `Await`

### react-router-dom APIs
* Create your router with `createBrowserRouter`/`createHashRouter`
* Submit data with the new `<Form> `component
* Perform in-page data loads and mutations with `useFetcher()`
* Defer non-critical data with `defer` and `Await`
* Manage scroll position with `<ScrollRestoration>`
* Perform path-relative navigations with `<Link relative="path">`

## Picking a Router
While your app will only use a single router, several routers are available depending on the environment your app is running in. This document should help you figure out which one to use.

### Using v6.4 Data APIs
In v6.4, new routers were introduced that support the new data APIs:

* `createBrowserRouter`
* `createMemoryRouter`
* `createHashRouter`

The following routers do not support the data APIs:

* `<BrowserRouter>`
* `<MemoryRouter>`
* `<HashRouter>`
* `<NativeRouter>`
* `<StaticRouter>`

## Setup

<docs-info>If you're not going to follow along in your own app, you can skip this section</docs-info>

We'll be using [Vite][vite] for our bundler and dev server for this tutorial. You'll need [Node.js][node] installed for the `npm` command line tool.

👉️ **Open up your terminal and bootstrap a new React app with Vite:**

```sh
npm create vite@latest name-of-your-project -- --template react
# follow prompts
cd <your new project directory>
npm install react-router-dom localforage match-sorter sort-by
npm run dev
```

You should be able to visit the URL printed in the terminal:

```
 VITE v3.0.7  ready in 175 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
```