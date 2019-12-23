// AddItemComponent.js
import Router from './src/router.js';

window.onload = function() {
 
  const router = new Router(document.getElementById("root"));

  window.addEventListener("changeRoute", event =>
    router.changeRoute(event.detail.route)
  );

  window.dispatchEvent(
    new CustomEvent("changeRoute", { detail: { route: "login" } })
  );
}


