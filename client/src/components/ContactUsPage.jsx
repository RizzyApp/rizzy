import React from "react";

const ContactUsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-lg font-medium">
            Email address:
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-medium">
            Message:
          </label>
          <textarea
            id="message"
            className="border border-gray-300 p-2 w-full h-32"
            placeholder="Enter your message"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2">Submit</button>
      </form>
    </div>
  );
};

export default ContactUsPage;
