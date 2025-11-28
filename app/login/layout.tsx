// Este layout "anula" el layout principal
export default function LoginLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}
