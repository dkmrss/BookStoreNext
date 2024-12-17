import Outstanding from "@/common/Outstanding";

export interface ListOutstanding {
  title: string;
  link: string;
}
interface ListOutstandingProps {
  data: ListOutstanding[];
}
const OutStandingList: React.FC<ListOutstandingProps> = ({ data }) => {
  return (
    <div style={{ padding: "10px 0px", display: "flex", gap: 10 }}>
      <Outstanding listOutstanding={data} />
    </div>
  );
};

export default OutStandingList;
