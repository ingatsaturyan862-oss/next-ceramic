import React from "react";
import { Hero } from "./hero";
import { Title } from "./title";
import { Container } from "./container";
import { ContactInfo } from "./contact-info";
import { FormContact } from "./form/form-contact";
import { ContactHero } from "@prisma/client";

// const socialLinks = [
//   {
//     icon: <FacebookIcon size={18} />,
//     href: "https://www.facebook.com/",
//   },
//   {
//     icon: <TwitterIcon size={18} />,
//     href: "https://www.twitter.com/",
//   },
//   {
//     icon: <InstagramIcon size={18} />,
//     href: "https://www.instagram.com/",
//   },
//   {
//     icon: <LinkedinIcon size={18} />,
//     href: "https://www.linkedin.com/",
//   },
//   {
//     icon: <YoutubeIcon size={18} />,
//     href: "https://www.youtube.com/",
//   },
// ];



interface Props {
  hero: ContactHero;
}
export const Contact: React.FC<Props> = (props) => {
  const { hero } = props;

  return (
    <>
      <Hero
        className="text-[#c69b7b]"
        color={hero.color}
        desctopImgUrl={hero.imgUrlDesktop}
        mobileImgUrl={hero.imgUrlMobile}
      >
        <div className="max-w-70 mx-auto text-center text-[#fffdfb]">
          <Title className="pb-7.5 mb-7.5 border-b border-grey-400" size="l">
            {hero.title}
          </Title>

          <p className="text-[14px] text-semibold leading-[143%] mb-5">
            Follow us on social media
          </p>
          <ul className="flex items-center justify-center gap-4">
            {/* {[].map((el, i) => (
              <li key={i}>
                <a
                  className="flex items-center justify-center text-white bg-[#c69b7b] w-6 h-6"
                  href={el?.href}
                  target="_blank"
                >
                  {el?.icon}
                </a>
              </li>
            ))} */}
          </ul>
        </div>
      </Hero>
      <Container>
        <ContactInfo className="mb-12.5" />
        <FormContact />
      </Container>
      <iframe
        className="w-full h-125"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97583.89596793758!2d44.40616732964665!3d40.15349240505668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2dab8fc8b5b%3A0x3d1479ae87da526a!2z0JXRgNC10LLQsNC9!5e0!3m2!1sru!2sam!4v1773504870685!5m2!1sru!2sam"
      ></iframe>
    </>
  );
};
