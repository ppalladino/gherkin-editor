"use client"; // because we'll have interactive nav links, etc.
import Link from "next/link";
import React from "react";

export default function PrimaryNav() {
  return (
    <nav style={{ background: "#333", padding: "1rem" }}>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li>
          <Link href="/" style={{ color: "#fff" }}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/features" style={{ color: "#fff" }}>
            Features
          </Link>
        </li>
        <li>
          <Link href="/about" style={{ color: "#fff" }}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}