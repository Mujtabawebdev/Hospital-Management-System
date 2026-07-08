import pageNotFoundImage from "/404PageError.png";

export default function ErrorPage() {
  return (
    <div className="flex w-full  h-92vh flex-col h-92vh items-center mt-16 mb-8 pt-8 pb-8">
      <img
        src={pageNotFoundImage}
        alt="404 Error"
        style={{ width: "300px", height: "auto" }}
      ></img>

      <h1 className=" mt-4 text-center text-2xl font-bold">
        SORRY, we couldn't find that page.
      </h1>
      <h1 className="mt-4 text-center mb-4 text-2xl font-bold">
        Try searching or go to{" "}
        <a
          className="text-blue-600 underline transition duration-300 ease-in-out hover:text-blue-700"
          href="/"
        >
          Medi-Hub's Homepage
        </a>
      </h1>
    </div>
  );
}
