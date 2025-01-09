export default function FeaturesEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Secondary navigation (local to dashboard) */}
      <div style={{ padding: "1rem" }}>{children}</div>
    </section>
  );
}