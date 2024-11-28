import Header from "../components/Header";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="aboutPage flex flex-col items-center font-poppins bg-custom-gradient p-6 text-white min-h-screen h-screen overflow-y-scroll">
        <div className="max-w-3xl w-full bg-transparent rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4 drop-shadow-slogan text-center">
            About <span className="font-bold font-poppins">Rizzy</span>
          </h1>
          <p className="mb-4">
            <span className="font-bold font-poppins">Rizzy</span> is the dating
            app designed to help you elevate your dating game by building
            confidence, refining your communication, and mastering the art of
            attraction. We’ve created a platform where users can not only meet
            potential matches but also enhance their "
            <span className="font-bold font-poppins">rizz</span>"—the charm and
            charisma that makes meaningful connections happen.
          </p>
          <p className="mb-4">
            At <span className="font-bold font-poppins">Rizzy</span>, we believe
            that confidence is key when it comes to successful dating. That's
            why we offer more than just a place to swipe. Our app is tailored
            for people who want to improve their social skills and become more
            self-assured in their interactions, both online and in person. With
            personalized profiles, curated matches, and unique icebreakers,{" "}
            <span className="font-bold font-poppins">Rizzy</span> creates a
            space where authentic connections can flourish.
          </p>
          <p className="mb-4">
            What sets <span className="font-bold font-poppins">Rizzy</span>{" "}
            apart is our Dating Coach Services, available on our website. These
            expert resources offer personalized tips, communication strategies,
            and advice on everything from creating a standout profile to nailing
            the first date. Our goal is to help you "
            <span className="font-bold font-pacifico">Get Your Rizz Up</span>
            "—not just for dating success but for a more confident, charismatic
            approach to relationships in general.
          </p>
          <p className="mb-4">
            Whether you're new to dating or just looking to improve your
            connection skills,{" "}
            <span className="font-bold font-poppins">Rizzy</span> is the perfect
            companion to help you become your most charming, confident self.
          </p>

          <h2 className="text-2xl font-bold drop-shadow-slogan mt-6 mb-2">
            App Name: <span className="font-bold font-poppins">Rizzy</span>
          </h2>
          <p className="mb-4">
            Rizzy is all about empowering you to boost your charisma and
            confidence in the dating world. The name "
            <span className="font-bold font-poppins">Rizzy</span>" comes from
            the popular slang term "
            <span className="font-bold font-poppins">rizz</span>," which is
            short for "charisma" or "the ability to attract someone romantically
            through charm." Our app focuses on helping users develop and refine
            their "<span className="font-bold font-poppins">rizz</span>
            "—whether that means improving their communication skills, boosting
            their confidence, or just being more authentic in how they connect
            with others.
          </p>

          <h2 className="text-2xl font-bold drop-shadow-slogan mt-6 mb-2">
            Slogan: "
            <span className="font-bold font-pacifico">Get Your Rizz Up</span>"
          </h2>
          <p className="mb-4">
            Our slogan, "
            <span className="font-bold font-pacifico">Get Your Rizz Up</span> ,"
            reflects our mission: to help you build the skills you need to
            become more confident and charismatic in dating. Whether you're
            looking to meet new people or just improve your overall dating game,
            <span className="font-bold font-poppins">Rizzy</span> is here to
            support you on your journey. We go beyond the standard dating app
            experience by offering personalized dating coach services on our
            website, giving you expert advice to take your dating life to the
            next level.
          </p>

          <p className="mb-4">
            At <span className="font-bold font-poppins">Rizzy</span>, it’s not
            just about matching; it’s about mastering the art of connection.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
