import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  /**
   * useRouteError()
   *
   * Inside of an errorElement, this hooks returns anything
   * thrown during an action, loader, or rendering.
   */
  const error = useRouteError();

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
