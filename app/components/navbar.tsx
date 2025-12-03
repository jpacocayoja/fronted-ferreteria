"use client";

import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export function NavbarComponent() {
    const [isDark, setIsDark] = useState(false);

    // Leer tema guardado
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else if (storedTheme === "light") {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        } else {
            // Si no hay tema guardado, usar la preferencia del sistema
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                document.documentElement.classList.add("dark");
                setIsDark(true);
            } else {
                document.documentElement.classList.remove("dark");
                setIsDark(false);
            }
        }
    }, []);


    const toggleTheme = () => {
        const html = document.documentElement;
        const newIsDark = !isDark;

        setIsDark(newIsDark);

        if (newIsDark) {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <Navbar fluid rounded>
            <div className="flex items-center gap-3 md:order-2">

                {/* Botón de cambio de tema */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    {isDark ? (
                        <SunIcon className="h-5 w-5 text-yellow-400" />
                    ) : (
                        <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                    )}
                </button>

                {/* Perfil */}
                <Dropdown
                    className="cursor-pointer"
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded
                        />
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </DropdownHeader>
                    <DropdownItem>Dashboard</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Earnings</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem href="/login">Sign out</DropdownItem>
                </Dropdown>

                <NavbarToggle />
            </div>

            <NavbarCollapse>
                <NavbarLink href="#" active>
                    Home
                </NavbarLink>
                <NavbarLink href="#">About</NavbarLink>
                <NavbarLink href="#">Services</NavbarLink>
                <NavbarLink href="#">Pricing</NavbarLink>
                <NavbarLink href="#">Contact</NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}
