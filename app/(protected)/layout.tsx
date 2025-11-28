// app/(protected)/layout.tsx (Para rutas protegidas)
import { SidebarComponent, NavbarComponent } from "../components"; // Importar el Sidebar y Navbar

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <SidebarComponent />

      <div className="flex flex-col w-full">
        {/* Navbar */}
        <NavbarComponent />

        {/* Contenido de la página */}
        <main className="p-2">
          {children}
        </main>
      </div>
    </div>
  );
}
