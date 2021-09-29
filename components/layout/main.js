import Header from "./header";

export default function Layout({ children }) {
  return (
    <div className="overflow-x-auto">
      <Header />
      <main className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        <div className="w-full lg:w-5/6">{children}</div>
      </main>
    </div>
  );
}
