import Head from "next/head";
import Header from "./Header";
import ScreenSwitcher from "./ScreenSwitcher";
import Sidebar from "./Sidebar";

export default function ActualLayout({
  children,
  breadcrumb,
  rightSlot,
  title = "Actual AI",
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="font-inter antialiased min-h-screen bg-white text-actual-ink">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-col pl-[220px]">
          <Header breadcrumb={breadcrumb} rightSlot={rightSlot} />
          <main className="min-h-0 min-w-0 flex-1 bg-white pb-24 pt-[68px]">
            {children}
          </main>
        </div>
        <ScreenSwitcher />
      </div>
    </>
  );
}
