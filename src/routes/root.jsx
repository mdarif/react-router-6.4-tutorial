import { useEffect } from 'react';
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

/**
 * action()
 *
 * Route actions are the "writes" to route loader "reads".
 * They are called after the loader has resolved and the route element has rendered.
 */

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

// Create the root layout component
export default function Root() {
  /**
   * useLoaderData
   *
   * This hook provides the value returned from your route 'loader'.
   */

  const { contacts, q } = useLoaderData();

  /**
   * useNavigation
   *
   * This hook tells you everything you need to know about a page navigation to
   * build pending navigation indicators and optimistic UI on data mutations. Things like:
   *
   * 1. Global loading indicators
   * 2. Disabling forms while a mutation is happening
   * 3. Adding busy indicators to submit buttons
   * 4. Optimistically showing a new record while it's being created on the server
   * 5. Optimistically showing the new state of a record while it's being updated
   *
   * [IMP]: This feature only works if using a data router, like createBrowserRouter.
   */
  const navigation = useNavigation();

  /**
   * useSubmit
   *
   * The imperative version of <Form> that let's you, the programmer,
   * submit a form instead of the user.
   *
   * [IMP]: This feature only works if using a data router, like createBrowserRouter.
   */
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  // Synchronize input value with the URL Search Params
  useEffect(() => {
    document.getElementById('q').value = q;
  }, [q]);

  return (
    <>
      <div id='sidebar'>
        <h1>React Router Contacts</h1>
        <div>
          <Form id='search-form' role='search'>
            <input
              id='q'
              className={searching ? 'loading' : ''}
              aria-label='Search contacts'
              placeholder='Search'
              type='search'
              name='q'
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id='search-spinner' aria-hidden hidden={!searching} />
            <div className='sr-only' aria-live='polite'></div>
          </Form>
          <Form method='post'>
            <button type='submit'>New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      {/**
       * useNavigation returns the current navigation state: it can be one of "idle" | "submitting" | "loading".
       */}
      <div
        id='detail'
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
}

/**
 * <Outlet>
 *
 * An <Outlet> should be used in parent route elements to render their child
 * route elements. This allows nested UI to show up when child routes are rendered.
 * If the parent route matched exactly, it will render a child index route or
 * nothing if there is no index route.
 */

/**
 * loader
 *
 * Each route can define a "loader" function to provide data to the route element
 * before it renders.
 *
 * [IMP]: This feature only works if using a data router, like createBrowserRouter.
 */

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts, q };
}
