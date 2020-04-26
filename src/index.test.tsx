import * as React from "react";
import renderer from "react-test-renderer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import serializer from ".";

const TestHead = ({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement => (
  <>
    <Helmet>
      <html lang="en" />
      <title>Hello, Helmet!</title>
      <meta name="description" content="This is a unit test!" />
    </Helmet>
    {children}
  </>
);

describe("Serialization function", () => {
  it("serializes React Helmet Async context correctly", () => {
    expect.addSnapshotSerializer(serializer);
    const context: { helmet?: object } = {};
    const tree = renderer
      .create(
        <HelmetProvider context={context}>
          <TestHead>
            <div>
              <span>Hello, Jest!</span>
            </div>
          </TestHead>
        </HelmetProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(context.helmet).toMatchSnapshot();
  });
});

describe("Serialization module", () => {
  it("matches expectations", () => {
    expect(serializer).toMatchSnapshot();
  });
});
