import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function App() {
  const [gigSeeker, setGigSeeker] = useState();
  const [senderName, setSenderName] = useState();
  const [tag, setTag] = useState();
  const [email, setEmail] = useState();
  const [resumeIsUploaded, setResumeIsUploaded] = useState(false);
  const [photoIsGood, setPhotoIsGood] = useState(false);

  const SERVICE_ID = "service_nz746jv";
  const TEMPLATE_ID = "template_fprczz4";
  const PUBLIC_KEY = "OY47pSEhckBwSInLH";

  const form = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
    form.current.reset();

    let newEntry = JSON.stringify({
      name: gigSeeker,
      email: email,
      tag: tag,
    });
    console.log(newEntry);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: newEntry,
    };
    let res = await fetch("http://localhost:3000", requestOptions);
    if (res.status === 200) {
      console.log("success");
    }

    alert("success");
    setGigSeeker("");
    setEmail("");
    setTag("");
    setPhotoIsGood(false);
    setResumeIsUploaded(false);
  };

  return (
    <div className="App">
      <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-lg mx-auto text-center">
          <h1 class="text-2xl font-bold sm:text-3xl">
            TempIn Gig Seeker Automation
          </h1>

          <p class="mt-4 text-gray-500">
            Just type in the information then click submit!
          </p>
        </div>

        <form
          ref={form}
          onSubmit={handleOnSubmit}
          class="max-w-md mx-auto mt-8 mb-0 space-y-4"
        >
          <div>
            <label for="email" class="sr-only">
              Your Name
            </label>

            <div class="relative">
              <input
                type="text"
                class="w-full p-4 pr-12 text-black text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Your Name"
                name="senderName"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label for="name" class="sr-only">
              Gig Seeker Name
            </label>

            <div class="relative">
              <input
                type="text"
                class="w-full p-4 pr-12 text-sm text-black border-gray-200 rounded-lg shadow-sm"
                placeholder="Gig Seeker Name"
                value={gigSeeker}
                name="gigSeeker"
                onChange={(e) => setGigSeeker(e.target.value)}
              />

              <span class="absolute inset-y-0 inline-flex items-center right-4"></span>
            </div>
          </div>
          <div>
            <label for="email" class="sr-only">
              Email
            </label>

            <div class="relative">
              <input
                type="email"
                class="w-full p-4 pr-12 text-black text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <span class="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label for="email" class="sr-only">
              Email
            </label>

            <div class="relative">
              <input
                type="text"
                class="w-full p-4 pr-12 text-black text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Extra Tags (optional)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
          </div>

          <input
            id="default-checkbox"
            type="checkbox"
            value={resumeIsUploaded}
            onChange={() => setResumeIsUploaded(!resumeIsUploaded)}
            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Resume Uploaded
          </label>

          <input
            id="default-checkbox"
            type="checkbox"
            value={resumeIsUploaded}
            onChange={() => setResumeIsUploaded(!resumeIsUploaded)}
            class="w-4 h-4 ml-6 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Profile Photo is Good
          </label>

          <div class="flex items-center justify-center">
            <button
              type="submit"
              class="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
              onClick={handleOnSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div class="flex items-center mb-4"></div>
    </div>
  );
}

export default App;
