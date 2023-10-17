import Button from "../Components/Button";
import heroImage from "../assets/hero-img.png";
import logo from "../assets/logo.png";
import logoGrayscale from "../assets/logo-grayscale.png";
import featuresImage from "../assets/features-img.png";
import featuresChat from "../assets/features-chat.png";
import featuresFriend from "../assets/features-friend.png";
import featuresPlatform from "../assets/features-platform.png";
import { useEffect, useState } from "react";

const faqData = [
  {
    question: "Q : What is Social Sphere?",
    answer:
      "Social Sphere is a cutting-edge social platform dedicated to connecting friends, old and new. It provides a vibrant space for meaningful conversations, real-time interactions in Chat Rooms, intelligent friend suggestions through our Friend Finder, and seamless multi-platform compatibility for users across Android, iOS, and Windows devices.",
  },
  {
    question:
      "Q : How does the Friend Finder feature work?",
    answer:
      "Our Friend Finder feature uses advanced algorithms to analyze your interests, preferences, and social interactions. It then suggests compatible friends automatically, eliminating the need for manual searches. This ensures that the friends you connect with share your passions, making your social experience more enriching and enjoyable.",
  },
  {
    question:
      "Q : Is my privacy protected on Social Sphere?",
    answer:
      "Absolutely. We prioritize your privacy and security. All conversations are protected with end-to-end encryption, ensuring that your messages remain private. We have stringent data protection measures in place, and our dedicated support team is always ready to assist you. Your safety and confidentiality are our top priorities.",
  },
  {
    question: "Q : How can I get started on Social Sphere?",
    answer:
      "Getting started on Social Sphere is easy! Simply sign up for a free account, create your personalized profile, and start exploring. You can join Chat Rooms, use the Friend Finder feature, and connect with friends right away. Our intuitive interface makes navigation seamless, allowing you to focus on building meaningful friendships from the moment you join.",
  },
];

const featureData = [
  {
    img: featuresChat,
    title: "Chat Room",
    alt: "chat room",
    paragraph:
      "Engage in real-time conversations, forging connections with friends, in our vibrant Chat Room.",
  },
  {
    img: featuresFriend,
    title: "Friend Finder",
    alt: "friend finder",
    paragraph:
      "Expand your social circle effortlessly with our intelligent Friend Finder.",
  },
  {
    img: featuresPlatform,
    title: "Multi Platform",
    alt: "multi platform",
    paragraph:
      "Stay connected across Android, iOS, and Windows devices seamlessly, ensuring limitless interactions anytime, anywhere.",
  },
];

export default function Landing({ setActivePage }) {
  const props = { setActivePage };

  return (
    <div className="page__landing">
      <Nav />
      <Hero {...props} />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}

function Nav() {
  const [mobileNavOpen, setMobileNavOpen] = useState(true);

  useEffect(() => {
    const toggleMobileNav = (e) => {
      if (
        e.target.closest(".nav-container") ||
        e.target.closest(".close-nav-mobile")
      ) {
        return;
      }

      setMobileNavOpen((current) => !current);
    };

    window.addEventListener("click", toggleMobileNav);

    return () => {
      window.removeEventListener("click", toggleMobileNav);
    };
  }, []);

  return (
    <nav>
      <div className="nav__mobile">
        <img src={logo} alt="Logo" className="logo" />
        <i
          className="bx bx-menu close-nav-mobile"
          onClick={() => {
            setMobileNavOpen((current) => !current);
          }}
        ></i>
      </div>
      <ul
        className={`nav-container ${
          mobileNavOpen ? "open" : ""
        }`}
      >
        <div className="info">
          <li className="logo">
            <img src={logo} alt="Logo" />
          </li>
          <li>
            <a href="#hero-section">Home</a>
          </li>
          <li>
            <a href="#features-section">About Us</a>
          </li>
          <li>
            <a href="#faq-section">FAQ</a>
          </li>
        </div>
        <div className="cta">
          <li>Login</li>
          <Button buttonText="Sign up" />
        </div>
      </ul>
    </nav>
  );
}

function Hero({ setActivePage }) {
  return (
    <section className="hero" id="hero-section">
      <div className="hero-inside">
        <div className="info">
          <h1>Your Social Circle, Reimagined.</h1>
          <p>
            Elevate your social experience with our
            platform. Engage in meaningful conversations,
            discover shared passions, and plan exciting
            adventures with your friends, both old and new.
          </p>
          <Button
            buttonText="Get Started"
            className="hero-button"
            padding="1.25rem 1rem"
            width="40%"
            goToPage={() => {
              setActivePage("login");
            }}
          />
        </div>
        <div className="hero__image">
          <img src={heroImage} alt="Hero Image" />
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="features" id="features-section">
      <div className="image">
        <img src={featuresImage} alt="features image" />
      </div>
      <div className="info">
        <h2>A new experience to social networking.</h2>
        <ul>
          {featureData.map(
            ({ img, alt, title, paragraph }) => (
              <li
                key={alt + title}
                className="feature-cards"
              >
                <img src={img} alt={alt} />
                <div className="feature-info">
                  <h3>{title}</h3>
                  <p>{paragraph}</p>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}

function FAQ() {
  const [currentOpen, setCurrentOpen] = useState(-1);

  return (
    <section className="faq" id="faq-section">
      <h2>Frequently Asked Questions.</h2>
      <ul>
        {faqData.map(({ question, answer }, i) => (
          <li
            key={question + i}
            onClick={() =>
              setCurrentOpen((current) =>
                current === i ? -1 : i
              )
            }
          >
            {/* Questions */}
            <div className="top">
              <p>{question}</p>
              <i
                className={`bx bxs-chevron-down ${
                  currentOpen === i ? "open" : ""
                }`}
              ></i>
            </div>
            {/* Answers */}
            <div
              className={`accordion-wrapper ${
                currentOpen === i ? "open" : ""
              }`}
            >
              <article className="accordion">
                <div className="bottom">{answer}</div>
              </article>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer-section">
      <div className="footer__content">
        <div className="main">
          <img src={logoGrayscale} alt="footer logo" />
          <p>
            Feel free to contact us if you have any
            inquiries or questions
          </p>
          <ul>
            <li>
              <i className="bx bxl-instagram"></i>
            </li>
            <li>
              <i className="bx bxl-facebook-square"></i>
            </li>
            <li>
              <i className="bx bxl-linkedin-square"></i>
            </li>
            <li>
              <i className="bx bx-envelope"></i>
            </li>
          </ul>
          <p className="copyright">
            © 2023 Social Sphere. All rights reserved
          </p>
        </div>
        <div className="links__container">
          <ul className="links">
            <p>About</p>
            <li>Links</li>
            <li>Portfolio</li>
            <li>Guidelines</li>
            <li>Contact</li>
          </ul>
          <ul className="links">
            <p>Company</p>
            <li>Submit</li>
            <li>Agency</li>
            <li>Advertise</li>
          </ul>
          <ul className="links">
            <p>Support</p>
            <li>Tools</li>
            <li>Feedback</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
