import Image from "next/image";
import image1 from "@/public/image1.png";
import { getServices } from "@/lib/services";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400">
          Have questions or want to book a treatment? We would love to hear from
          you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg">Address</h2>
            <p className="text-gray-400">
              123 Serenity Street <br />
              London, UK
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg">Phone</h2>
            <p className="text-gray-400">+44 123 456 789</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg">Email</h2>
            <p className="text-gray-400">info@serenityspa.com</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg">Opening Hours</h2>
            <p className="text-gray-400">
              Mon – Fri: 9:00 AM – 7:00 PM <br />
              Sat – Sun: 10:00 AM – 6:00 PM
            </p>
          </div>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring"
          ></textarea>

          <button
            type="submit"
            className="bg-accent-500 text-primary-800 px-6 py-3 rounded-lg hover:bg-accent-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
