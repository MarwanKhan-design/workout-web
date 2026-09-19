import AuthCheck from "@/lib/AuthCheck";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthCheck />
      {children}
    </>
  );
}
