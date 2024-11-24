import Header from "../components/Header";

const ContactUsPage = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="flex flex-col items-center font-poppins bg-custom-gradient text-white h-screen">
        <div className="p-4 w-full max-w-md mt-20">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="border bg-white text-black border-gray-300 p-2 w-full rounded"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium">
                Message
              </label>
              <textarea
                id="message"
                className="border bg-white text-black border-gray-300 p-2 w-full h-40 rounded"
                placeholder="Enter your message"
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-transparent text-white px-6 py-3 rounded-full hover:bg-buttonHover border-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
