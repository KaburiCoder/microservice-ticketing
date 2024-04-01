import React from "react";
import Link from "next/link";
import { apiUrl, paths } from "@/paths";
interface Props {
  currentUser: any;
}
export default function Header({ currentUser }: Props) {
  const links: { label: string; href: string }[] = [
    !currentUser && { label: "Sign up", href: paths.auth.signup },
    !currentUser && { label: "Sign in", href: paths.auth.signin },
    currentUser && { label: "Sign out", href: paths.auth.signout },
  ].filter((link) => link);
  const linksComponents = links.map(({ label, href }) => {
    return (
      <li key={href} className="border p-2 rounded">
        <Link href={href}>{label}</Link>
      </li>
    );
  });

  return (
    <nav className="h-14 px-2 w-full flex items-center justify-between">
      <Link href={"/"}>메인으로</Link>

      <div>
        <ul className="flex gap-2 items-center">{linksComponents}</ul>
      </div>
    </nav>
  );
}
