import MessageForm from "../_components/MessageForm";

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
            <p className="text-gray-400">info@goldenleafspa.com</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg">Opening Hours</h2>
            <p className="text-gray-400">Mon – Sun: 9:00 AM – 5:00 PM</p>
          </div>
        </div>

        <MessageForm />
      </div>
    </section>
  );
}
