import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-background pt-16 pb-24 lg:pb-32">
      <div className="wrapper">
        <div className="library-hero-card">
          <div className="library-hero-content">
            {/* Left Part */}
            <div className="library-hero-text">
              <h1 className="library-hero-title">Your Library</h1>
              <p className="library-hero-description">
                Convert your books into interactive AI conversations.{" "}
                <br className="hidden md:block" />
                Listen, learn, and discuss your favorite reads.
              </p>
              <Link
                href="/books/new"
                className="library-cta-primary mt-2 lg:mt-4">
                <span className="text-3xl font-light mb-1 mr-2">+</span>
                <span className="text-[#212a3b]">Add new book</span>
              </Link>
            </div>

            {/* Center Part - Desktop */}
            <div className="library-hero-illustration-desktop">
              <Image
                src="/assets/hero-illustration.png"
                alt="Vintage books and a globe"
                width={400}
                height={400}
                className="object-contain"
                priority
              />
            </div>

            {/* Center Part - Mobile (Hidden on Desktop) */}
            <div className="library-hero-illustration">
              <Image
                src="/assets/hero-illustration.png"
                alt="Vintage books and a globe"
                width={300}
                height={300}
                className="object-contain"
                priority
              />
            </div>

            {/* Right Part */}
            <div className="library-steps-card min-w-[260px] max-w-[280px] z-10 shadow-soft-md">
              <ul className="space-y-6 list-none p-0 m-0">
                <li className="library-step-item">
                  <div className="library-step-number">1</div>
                  <div className="flex flex-col">
                    <h3 className="library-step-title">Upload PDF</h3>
                    <p className="library-step-description">
                      Add your book file
                    </p>
                  </div>
                </li>
                <li className="library-step-item">
                  <div className="library-step-number">2</div>
                  <div className="flex flex-col">
                    <h3 className="library-step-title">AI Processing</h3>
                    <p className="library-step-description">
                      We analyze the content
                    </p>
                  </div>
                </li>
                <li className="library-step-item">
                  <div className="library-step-number">3</div>
                  <div className="flex flex-col">
                    <h3 className="library-step-title">Voice Chat</h3>
                    <p className="library-step-description">Discuss with AI</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
