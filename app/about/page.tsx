import GetIp from "../ip/page";
import Count from "./count";
import AboutIp from "./ip";

export default function AboutPage() {
  return (
    <>
      <GetIp></GetIp>
      <AboutIp></AboutIp>
      <Count></Count>
      <h1>Hello, About Page!</h1>
    </>
  );
}
