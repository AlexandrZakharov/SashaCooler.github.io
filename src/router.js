import routerConfig from "./routerConfig.js";

export default class Router {
  constructor(anchor) {
    this.anchor = anchor;
    this.conf;
    this.component;

    window.addEventListener('popstate', event => {
      this.changeRoute(event.state.route)
    })
  }

  changeRoute(route) {
    this.conf = routerConfig[route]; // 

    if(!this.conf) return;

    if(this.component) {
      this.component.onDestroy();
    }

    window.history.pushState(this.conf.data, '', this.conf.url);
    this.component = new this.conf.component(this.anchor, this.conf.settings);
    this.component.render();
  }
}

