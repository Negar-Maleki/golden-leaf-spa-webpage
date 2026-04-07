import { createMessage } from "../_lib/actions";
function MessageForm() {
  return (
    <form action={createMessage} className="space-y-4 text-gray-900">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring"
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring"
      />

      <textarea
        placeholder="Your Message"
        name="message"
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
  );
}

export default MessageForm;
