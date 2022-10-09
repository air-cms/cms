import { Express } from "express";

//interface for a route
interface IRoute {
  method: string;
  path: string;
}

//get all endpoints from passed app
export function getEndPoints(app: Express): IRoute[] {
  //use set (later convert to array) to remove duplicates
  const routes = new Set();

  //recursive functiom to traverse the layer
  function recursiveTraverseLayer(path: string[] = [], layer: any) {
    if (layer.route) {
      layer.route.stack.forEach((newLayer: any) =>
        recursiveTraverseLayer(path.concat(split(layer.route.path)), newLayer),
      );
    } else if (layer.name === "router" && layer.handle.stack) {
      layer.handle.stack.forEach((newLayer: any) =>
        recursiveTraverseLayer(path.concat(split(layer.regexp)), newLayer),
      );
    } else if (layer.method) {
      routes.add(
        `${layer.method.toUpperCase()} /${path
          .concat(split(layer.regexp))
          .filter(Boolean)
          .join("/")}`,
      );
    }
  }

  //splitter function for paths
  function split(thing: any) {
    if (typeof thing === "string") {
      return thing.split("/");
    } else if (thing.fast_slash) {
      return "";
    } else {
      var match = thing
        .toString()
        .replace("\\/?", "")
        .replace("(?=\\/|$)", "$")
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
      return match
        ? match[1].replace(/\\(.)/g, "$1").split("/")
        : "<complex:" + thing.toString() + ">";
    }
  }

  //start recursive call
  app._router.stack.forEach((layer: any) => recursiveTraverseLayer([], layer));

  //cast set to array and transform to IRoute[]
  return (Array.from(routes) as string[]).map((route) => {
    //split string and transform to IRoute
    return { method: route.split(" ")[0], path: route.split(" ")[1] };
  });
}
