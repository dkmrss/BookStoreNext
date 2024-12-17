import { dataCommentFake } from "@/const/fakedata";
import SearchGuarantee from "./SearchGuarantee";
import Comments from "@/common/Comments";
export default function Guarantee() {
  return (
    <>
      <SearchGuarantee />
      <Comments dataItem={null} dataComment={dataCommentFake || null} />
    </>
  );
}
