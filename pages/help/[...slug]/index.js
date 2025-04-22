export default function HelpPage({ title, content, slug }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="mb-6">{content}</p>

        {slug === "faqs" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">
                How often is the movie database updated?
              </h3>
              <p>
                Our database is updated weekly with new releases and
                information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">
                Can I contribute to the movie database?
              </h3>
              <p>Yes! Please contact us to learn how you can contribute.</p>
            </div>
          </div>
        )}

        {slug === "contact" && (
          <div className="space-y-4">
            <p>Email: contact@moviehouse.example.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Movie Lane, Hollywood, CA 90210</p>
          </div>
        )}

        {slug === "privacy" && (
          <div className="space-y-4">
            <p>
              We respect your privacy and are committed to protecting your
              personal data.
            </p>
            <p>
              This privacy policy will inform you about how we look after your
              personal data when you visit our website.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: ["faqs"] } },
      { params: { slug: ["contact"] } },
      { params: { slug: ["privacy"] } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug[0];

  let title = "";
  let content = "";

  switch (slug) {
    case "faqs":
      title = "Frequently Asked Questions";
      content = "Here are some common questions about our movie database";
      break;
    case "contact":
      title = "Contact Us";
      content = "Get in touch with our team for any inquiries or feedback";
      break;
    case "privacy":
      title = "Privacy Policy";
      content = "Our privacy policy outlines how we collect and use your data";
      break;
    default:
      return {
        notFound: true,
      };
  }

  return {
    props: {
      title,
      content,
      slug,
    },
  };
}
