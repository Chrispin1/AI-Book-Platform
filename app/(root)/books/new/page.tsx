import UploadForm from "@/components/UploadForm";

export default function Page() {
  return (
    <main className="wrapper container">
      <div className="mx-auto max-w-180 space-y-10">
        <section className="flex flex-col gap-5">
          <h1 className="page-title-xl font-inter">Add a new book</h1>
          <p className="subtitle font-jost">
            Upload a PDF to generate an interactive reading experience
          </p>
        </section>

        <UploadForm />
      </div>
    </main>
  );
}
