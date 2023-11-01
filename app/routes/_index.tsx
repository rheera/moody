import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <section id="logged-in-view">
      <div className="container">
        <h2>Logged In </h2>
      </div>
    </section>
  );
}
