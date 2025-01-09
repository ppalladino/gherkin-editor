"use client";
import Link from "next/link";
import React from "react";

export default function SecondaryNav() {
  return (
    <nav style={{ background: "#f0f0f0", padding: "0.5rem" }}>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li>
          <Link href="/features" style={{ color: "#333" }}>
            Features List
          </Link>
        </li>
        <li>
          <Link href="/features/edit" style={{ color: "#333" }}>
            Edit
          </Link>
        </li>
      </ul>
    </nav>
  );
}