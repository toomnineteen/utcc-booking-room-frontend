import PageHomeCalendarCard from "../components/user/PageHomeCalendarCard";

const PageHome = () => {
  return (
    <div className="p-4">
      <div className="breadcrumbs text-sm ">
        <ul>
          <li>หน้าแรก</li>
        </ul>
      </div>
      <div className=" border my-4 border-[#EEE]"></div>

      <PageHomeCalendarCard />
    </div>
  );
};

export default PageHome;
