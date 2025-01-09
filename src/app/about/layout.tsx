// import SecondaryNav from "@/_components/SecondaryNav";

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Secondary navigation (local to dashboard) */}
      {/* <SecondaryNav /> */}
      <div style={{ padding: "1rem" }}>{children}</div>
    </section>
  );
}