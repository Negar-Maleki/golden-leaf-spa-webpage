import Image from "next/image";
import image1 from "@/public/image1.png";

export const metadata = {
  title: "About",
};
export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to Golden Leaf Spa
        </h1>
        <p>
          Welcome to serenity. Nestled among glowing autumn trees and bathed in
          golden sunlight, Golden Leaf Spa is a sanctuary of warmth, calm, and
          natural renewal. Inspired by nature&apos;s soothing rhythms, our spa
          blends earthy textures, soft candlelight, and tranquil water elements
          to create a deeply restorative experience.
        </p>

        <div className="space-y-8">
          <p>
            Where nature&apos;s beauty and mindful living blend seamlessly.
            Hidden within a peaceful garden setting, Golden Leaf Spa is your
            retreat away from the noise of everyday life. But it&apos;s not just
            about treatments — it&apos;s about the experience of slowing down,
            breathing deeply, and reconnecting with yourself.
          </p>
          <p>
            Our thoughtfully designed treatment rooms, salt pools, saunas, and
            outdoor hot water retreats provide a peaceful base. Yet the true
            magic lies in the atmosphere — the golden light filtering through
            autumn leaves, the gentle glow of lanterns at dusk, and the quiet
            comfort of warm water beneath the open sky.
          </p>
          <p>
            This is where tension softens, where stillness becomes natural, and
            where memorable moments are created in an atmosphere of beauty and
            calm. It&apos;s a place to pause, restore, and rediscover balance.
          </p>
        </div>
      </div>

      <div className="col-span-3 md:col-span-2">
        <Image
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="relative aspect-square col-span-3 md:col-span-2 order-last md:order-none">
        <Image
          src="/image2.png"
          fill
          className="object-cover"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Our Philosophy
        </h1>

        <div className="space-y-8">
          <p>
            At Golden Leaf Spa, wellness is more than a service — it&apos;s a
            ritual of care. We believe in creating experiences that nurture both
            body and mind. Every massage, sauna session, and herbal treatment is
            designed with intention. Every detail — from the scent of natural
            oils to the warmth of our candlelight — is curated to bring comfort
            and harmony.
          </p>
          <p>
            Here, you are not just a guest. You are welcomed into a space
            created with care, where tranquility meets thoughtful hospitality.
            Whether you visit for a single treatment or a full day of
            relaxation, we invite you to unwind, recharge, and feel at home in a
            setting inspired by nature&apos;s golden glow.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Golden Leaf Spa — where warmth meets wellness.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
