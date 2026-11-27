import BookCard from "@/components/BookCard";
import LibraryHero from "@/components/ui/LibraryHero";
import { sampleBooks } from "@/lib/constants";

export default function Home() {
  return (
    <main className="wrapper container">
      <LibraryHero />

      <div className="library-books-grid">
        {sampleBooks.map((book) => (
          <BookCard
            key={book._id}
            title={book.title}
            author={book.author}
            slug={book.slug}
            coverUrl={book.coverURL}
          />
        ))}
      </div>
    </main>
  );
}
