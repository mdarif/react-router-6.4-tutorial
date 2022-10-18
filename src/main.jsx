import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import ErrorPage from './error-page';
import './index.css';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes/index';

/**
 * createBrowserRouter
 *
 * This is the recommended router for all React Router web projects.
 * It uses the DOM History API to update the URL and manage
 * the history stack.
 */

// create a Browser Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        {/* <Route index element={<Index />} /> */}
        <Route
          path='contacts/:contactId'
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path='contacts/:contactId/edit'
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route path='contacts/:contactId/destroy' action={destroyAction} />
      </Route>
    </Route>
  )
);

/* const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            element: <EditContact />,
            loader: contactLoader,
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]); */

/**
 * <RouterProvider>
 *
 * All router objects are passed to this component to render your
 * app and enable the rest of the APIs.
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
