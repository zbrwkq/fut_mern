import "./mainSection.scss";

export default function MainSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <section>
        {children}
        <footer>footer</footer>
      </section>
    </main>
  );
}
