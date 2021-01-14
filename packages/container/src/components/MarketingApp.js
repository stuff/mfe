// the marketting child app import a mount function from another package
// with somme magic from Webpack 5, that package is built by another build process than the container,
// so you can change and redeploy them separately, and host them in different place if needed (see webpack config)
import { mount } from "marketing/MarketingApp";

import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  // quite simple and not so usual, this component will call the mount function from the marketting app
  // and mount the whole app into the target element
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  // The component itself is just a target element for the mount function
  return <div ref={ref} />;
};
