import { BookCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const BookCard = ({ title, author, coverUrl, slug }: BookCardProps) => {
  return (
    <Link href={`/books/${slug}`}>
      <article className="book-card">
        <figure className="book-card-figure">
          <div className="book-card-wrapper-cover">
            <Image
              src={coverUrl}
              alt={title}
              height={200}
              width={133}
              unoptimized
              className="book-card-cover"
            />
          </div>

          <figcaption className="book-card-meta">
            <h3 className="book-card-title">{title}</h3>
            <p className="book-card-author">{author}</p>
          </figcaption>
        </figure>
      </article>
    </Link>
  );
};

export default BookCard;
