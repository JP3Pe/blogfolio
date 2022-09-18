import TopBar from "./top-bar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <TopBar />
      <main>{children}</main>
    </>
  );
}
