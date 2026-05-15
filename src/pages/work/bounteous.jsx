import Head from "next/head";

/**
 * Full-viewport embedded prototype (same presentation pattern as Actual work pages:
 * the product UI is the page — no portfolio chrome around the frame).
 */
export default function BounteousSniffyPrototype() {
  return (
    <>
      <Head>
        <title>SniffAI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <iframe
        title="SniffAI — compliance dashboard prototype"
        src="/sniffy-dashboard.html"
        className="fixed inset-0 z-0 block h-[100dvh] w-full border-0"
      />
    </>
  );
}
