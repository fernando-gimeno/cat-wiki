import Image from "next/image";
import image1 from "../../../public/img/image 1.png";
import image2 from "../../../public/img/image 2.png";
import image3 from "../../../public/img/image 3.png";

export default function WhyShouldHaveCat() {
  return (
    <section className="mt-24 mb-8 flex items-center flex-col lg:flex-row">
      <div>
        <hr className="border-2 border-[#4D270C] w-12 mb-4" />
        <h2 className="text-[#291507] font-bold text-4xl mb-10">
          Why should you have a cat?
        </h2>
        <p className="text-[#291507] text-lg font-medium mb-7">
          Having a cat around you can actually trigger the release of calming
          chemicals in your body which lower your stress and anxiety leves
        </p>
        <p className="text-[rgba(41,21,7,0.6)] font-bold text-xs">READ MORE</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-16">
        <Image src={image2} alt="Image 2" />
        <Image className="row-span-2" src={image3} alt="Image 3" />
        <Image className="w-3/4 justify-self-end" src={image1} alt="Image 1" />
      </div>
    </section>
  );
}
