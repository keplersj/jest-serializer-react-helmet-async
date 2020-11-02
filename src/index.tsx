import * as React from "react";
import { HelmetData, HelmetProvider } from "react-helmet-async";

interface HelmetTestProvider {
  canUseDOM: boolean;
}

// The typedef for react-helmet-async doesn't include canUseDOM, even though it's in the docs.
//  Make TypeScript know it's there.
((HelmetProvider as unknown) as HelmetTestProvider).canUseDOM = false;

const ReactHelmetAsyncContextSerializer: jest.SnapshotSerializerPlugin = {
  test(value: any) {
    return Boolean(
      // Does the value exist?
      value &&
        value.base &&
        value.base.toComponent &&
        value.bodyAttributes &&
        value.bodyAttributes.toComponent &&
        value.htmlAttributes &&
        value.htmlAttributes.toComponent &&
        value.link &&
        value.link.toComponent &&
        value.meta &&
        value.meta.toComponent &&
        value.noscript &&
        value.noscript.toComponent &&
        value.script &&
        value.script.toComponent &&
        value.style &&
        value.style.toComponent &&
        value.title &&
        value.title.toComponent
    );
  },

  print(value: any, serialize) {
    // Recreate head from Helmet data
    const head = serialize(
      <html {...value.htmlAttributes.toComponent()}>
        <head>
          {value.base.toComponent()}
          {value.link.toComponent()}
          {value.meta.toComponent()}
          {value.noscript.toComponent()}
          {value.script.toComponent()}
          {value.style.toComponent()}
          {value.title.toComponent()}
        </head>
        <body {...value.bodyAttributes.toComponent()} />
      </html>
    );

    // Return recreated head
    return head;
  },
};

export = ReactHelmetAsyncContextSerializer;
