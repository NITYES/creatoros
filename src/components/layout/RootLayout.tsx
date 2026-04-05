import Header from "./header";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="flex-1 mt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-100 text-center py-4 mt-10">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} creatorOS. All rights reserved.
        </p>
      </footer>
    </div>
  );
}