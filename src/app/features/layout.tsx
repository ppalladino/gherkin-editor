import FeaturesNav from "./_components/FeaturesNav";

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <FeaturesNav />
      <div style={{ padding: "1rem" }}>{children}</div>
    </section>
  );
}