export default function ScenariosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div style={{ padding: "1rem" }}>{children}</div>
    </section>
  );
}