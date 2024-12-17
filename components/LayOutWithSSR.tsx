import AppContainer from "@/common/AppContainer";
import FooterComponent from "./Footer/FooterComponent";
import Header from "./Header";
import style from "./HeaderMegaMenu.module.css";

export default function LayOutWithSSR({ children }: { children: any }) {
  return (
    <>
      <Header />
      <main className={style.main}>
        <AppContainer>{children}</AppContainer>
      </main>
      <FooterComponent />
    </>
  );
}
