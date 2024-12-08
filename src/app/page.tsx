import BgMove from "@/components/BgMove";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden top-0 left-0 bg-black ">
      <Header />
      <BgMove />
      <div className="w-full h-full relative z-10 flex items-center justify-center">
        <h1 className="text-[56px] text-white uppercase font-bold ">
          Nguyen Van Tuan
        </h1>
      </div>
    </div>
  );
}
