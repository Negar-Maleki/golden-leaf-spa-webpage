import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Thanks for reaching out! We&apos;ll get back to you as soon as possible.
      </h1>
      <Link
        href="/services"
        className="underline text-xl text-accent-500 inline-block"
      >
        Please visit our services page for more information &rarr;
      </Link>
    </div>
  );
}
