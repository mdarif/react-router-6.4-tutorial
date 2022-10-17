import { redirect } from 'react-router-dom';
import { deleteContact } from '../contacts';

export async function action({ params }) {
  throw new Error('oh dang!');
  await deleteContact(params.contactId);
  return redirect('/');
}

/**
 * 😅 I'm still confused why this all works
 *
 * When the user clicks the submit button:
 * 1. <Form> prevents the default browser behavior of sending
 *  a new POST request to the server, but instead emulates
 *  the browser by creating a POST request with client side routing
 * 2. The <Form action="destroy"> matches the new route at
 *  "contacts/:contactId/destroy" and sends it the request
 * 3. After the action redirects, React Router calls all of
 *  the loaders for the data on the page to get the latest
 *  values (this is "revalidation"). useLoaderData returns
 *  new values and causes the components to update!
 *
 * Add a form, add an action, React Router does the rest.
 *
 */
