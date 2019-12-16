import * as React from "react";
import { HelmetProvider } from "react-helmet-async";

(HelmetProvider as any).canUseDOM = false;

const ReactHelmetAsyncContextSerializer: jest.SnapshotSerializerPlugin = {
  test(val) {
    return Boolean(
      // Does the value exist?
      val &&
        val.base &&
        val.base.toComponent &&
        val.bodyAttributes &&
        val.bodyAttributes.toComponent &&
        val.htmlAttributes &&
        val.htmlAttributes.toComponent &&
        val.link &&
        val.link.toComponent &&
        val.meta &&
        val.meta.toComponent &&
        val.noscript &&
        val.noscript.toComponent &&
        val.script &&
        val.script.toComponent &&
        val.style &&
        val.style.toComponent &&
        val.title &&
        val.title.toComponent
    );
  },

  print(val, serialize) {
    // Recreate head from Helmet data
    const head = serialize(
      <html {...val.htmlAttributes.toComponent()}>
        <head>
          {val.base.toComponent()}
          {val.link.toComponent()}
          {val.meta.toComponent()}
          {val.noscript.toComponent()}
          {val.script.toComponent()}
          {val.style.toComponent()}
          {val.title.toComponent()}
        </head>
        <body {...val.bodyAttributes.toComponent()} />
      </html>
    );

    // Return recreated head
    return head;
  }
};

export = ReactHelmetAsyncContextSerializer;
