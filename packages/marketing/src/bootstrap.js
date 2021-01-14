// all micro front ends real entry file will more or less like that

import React from "react";
import ReactDOM from "react-dom";

// small package to abstract the navigation history. Because that app is used in hosted mode
// but also in isolation, a memoryHistory OR a browserHistory implementationcould be used
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

// this function actually mount the application dom where we want. You pass an element to append the dom to, and an options object
// which can differ from one app to another. This is however probably the minimum to pass in:
// - onNavigate: will be called each time you change of page in the app (to allow the container to sync, or do things)
// - defaultHistory: the history object you want to use. Will be a new empty browserHistory when used in standalone, or nothing,
//   so a new memoryHistory with an initialPath, when used inside the container
// - initialPath: used to initialize the memoryHistory correctly, set by the container
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  // create or use the passed in history;
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  // make the internal app history call onNavigate if a handler is passed in
  if (onNavigate) {
    history.listen(onNavigate);
  }

  // actually render the app at the right place (using React here, but could be anything)
  ReactDOM.render(<App history={history} />, el);

  return {
    // this handler is used by the container. If the container navigate somewhere, the internal app history is sync
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    // use browser history in isolation mode
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
