"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Suspense, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathName = usePathname();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
  ];

  return (
    <header className="w-full fixed z-50 bg-('--bg-primary')">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-0.5 items-center">
          <Image src="/assets/logo.png" alt="logo" width={42} height={26} />{" "}
          <span className="logo-text">Bookify</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="w-fit hidden md:flex gap-7.5 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName?.startsWith(href));

            return (
              <Link
                href={href}
                key={label}
                className={cn(
                  "nav-link-base font-inter",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70",
                )}>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 font-jost">
          {/* Desktop auth button */}
          <div className="hidden md:flex items-center gap-3">
            <Suspense>
              <Show when="signed-out">
                <div className="flex items-center gap-3">
                  <div className="px-4 py-1 rounded-md border-black cursor-pointer bg-accent-foreground text-white">
                    <SignInButton />
                  </div>
                  <div className="border border-black rounded-md px-4 py-1 cursor-pointer">
                    <SignUpButton />
                  </div>
                </div>
              </Show>
              <Show when="signed-in">
                <div className="nav-user-link">
                  <UserButton />
                  {user?.firstName && (
                    <div className="rounded-md px-3 py-1 border border-black hover:bg-black transition-all duration-300">
                      <Link
                        href="/subscriptions"
                        className="nav-user-name hover:text-white">
                        {user.firstName}
                      </Link>
                    </div>
                  )}
                </div>
              </Show>
            </Suspense>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-black hover:opacity-70"
            aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-60 bg-('--bg-primary')">
          {/* Backdrop — tap to close */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-('--bg-primary') border-l border-[rgba(33,42,59,0.12)] flex flex-col z-61">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-black hover:opacity-70"
                aria-label="Close mobile menu">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 px-6 pb-8 overflow-y-auto">
              {/* Navigation links */}
              {navItems.map(({ label, href }) => {
                const isActive =
                  pathName === href ||
                  (href !== "/" && pathName?.startsWith(href));

                return (
                  <Link
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    key={label}
                    className={cn(
                      "flex w-full items-center gap-2 py-4 px-4 text-base font-medium leading-6 transition-all font-inter border-b border-[rgba(33,42,59,0.12)]",
                      isActive
                        ? "text-(--color-brand) border-b-2 border-(--color-brand)"
                        : "text-black hover:opacity-70",
                    )}>
                    {label}
                  </Link>
                );
              })}

              {/* Auth section */}
              <div className="mt-8 pt-6">
                <Suspense>
                  <Show when="signed-out">
                    <div className="space-y-3">
                      <Link
                        href="/sign-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex w-full items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-(--color-brand) text-white text-base font-medium transition-all hover:bg-(--color-brand-hover) shadow-sm"
                        aria-label="Sign in">
                        Sign in
                      </Link>
                      <Link
                        href="/sign-up"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex w-full items-center justify-center gap-2 py-3.5 px-4 rounded-lg border border-[rgba(33,42,59,0.2)] text-(--text-primary) text-base font-medium transition-all hover:bg-[#f3e4c7] shadow-sm"
                        aria-label="Sign up">
                        Sign up
                      </Link>
                    </div>
                  </Show>
                  <Show when="signed-in">
                    <div className="space-y-3">
                      <div
                        className="flex w-full items-center justify-center gap-2 py-3.5 px-4 rounded-lg border border-[rgba(33,42,59,0.2) text-(--text-primary) text-base font-medium transition-all hover:bg-[#f3e4c7] shadow-sm"
                        aria-label="Account">
                        <UserButton />
                      </div>
                    </div>
                  </Show>
                </Suspense>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
