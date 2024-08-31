import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-start h-fit min-h-screen bg-[#6e199a]">
      <Header />
      <h1 className="mt-10 mb-10 font-bold text-3xl">Privacy Policy</h1>
      <div className="w-11/12 lg:w-3/4">
        <h3 className="underline font-bold text-2xl mb-4">
          Acceptance of Privacy Policy
        </h3>{" "}
        <p className="mb-4">
          This Privacy Policy applies to the website:{" "}
          <span className="underline">https://cloned.chat</span> (the
          &#34;Site&#34;) and does not govern privacy practices associated with
          offline activities. These are the guidelines used by Sheep LLC.
          (&#34;COMPANY&#34;) (currently doing business as &#34;Cloned
          Chat&#34;) do in protecting your privacy. The Site is only directed to
          those in the United States; however it may be accessed from many
          different places around the world. By accessing the Site, you agree
          that the laws of Delaware apply to all matters related to your
          interaction with the Site. COMPANY reserves the right to modify these
          terms at any time and in any manner, without prior notice.
        </p>
        <h4 className="font-bold text-xl mb-4">Rights</h4>
        <p className="mb-4">
          {" "}
          COMPANY respects your privacy and is committed to protecting the
          information you provide us through the Site. We do not sell or
          distribute user information to unaffiliated third parties, except as
          needed to provide services that you have requested. We may gather Site
          use information and distribute this information to affiliated
          companies in order to serve your needs and respond to your information
          requests.
        </p>
        <h4 className="font-bold text-xl "> User Information</h4>
        <p className="mb-4">
          During your interaction with the Site, COMPANY may request information
          from you. The only information COMPANY will collect and store about
          you is information you decide to provide us. If you have voluntarily
          submitted user information to us through an email or contact form or
          any other information, COMPANY will only use such information for the
          purpose that it was provided or as otherwise permitted by law.
        </p>
        <h4 className="font-bold text-xl mb-4">Other Information</h4>
        <p className="mb-4">
          COMPANY may use server logs to record a visitor’s Internet Protocol
          (IP) address and to collect general information about the visit to the
          Site, such as the time and length of the visit, messages, prompts, AI
          profiles, and the web pages accessed during the visit. COMPANY may use
          this information for Site management and performance monitoring only.
          COMPANY does not make this information available to unaffiliated third
          parties, but may share it with affiliated companies.
        </p>
        <h4 className="font-bold text-xl mb-4">Cookies</h4>
        <p className="mb-4">
          COMPANY may use cookies from time to time to allow COMPANY to tailor
          the Site to your preferences or interests, customize promotions or
          marketing or identify which areas of the Site are more popular. A
          cookie is a small, unique text file that a website can send to your
          computer hard drive when you visit that site. COMPANY does not make
          any cookie information available to unaffiliated third parties. Most
          web browsers can either alert you to the use of cookies or refuse to
          accept cookies entirely. If you do not want COMPANY to deploy cookies
          in your browser, you can set your browser to reject cookies or to
          notify you when a website tries to put a cookie on your computer.
          Rejecting cookies may affect your ability to use some of the services
          available on the Site.
        </p>{" "}
        <h4 className="font-bold text-xl mb-4">Security</h4>
        <p className="mb-4">
          To prevent unauthorized access to any user information, COMPANY has
          put in place commercially reasonable physical, electronic, and
          managerial procedures to safeguard and secure the information it
          collects through this Site. However, COMPANY cannot guarantee the
          security of any information you transmit to COMPANY or guarantee that
          your information on the Site may not be accessed, disclosed, altered,
          or destroyed by breach of any of our physical, technical, or
          managerial safeguards.
        </p>
        <h3 className="underline font-bold text-xl mb-4">
          For More Information
        </h3>
        <p className="mb-4">
          If you have any comments, concerns or questions regarding these terms,
          please contact us at{" "}
          <a href="mailto:support@cloned.chat" className="underline">
            support@cloned.chat
          </a>
          .
        </p>
        <p className="mb-16 font-bold">Last updated on August 31, 2024.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
