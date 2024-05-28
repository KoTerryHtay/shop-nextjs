import { Suspense } from "react";
import Footer from "./footer";
import Header from "./header";

export default function Tabs({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-[#393E46]">
      <Header />
      <div className="flex-grow overflow-auto p-4">{children}</div>
      <Suspense fallback={<p>loading...</p>}>
        <Footer />
      </Suspense>
    </div>
  );
}
