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