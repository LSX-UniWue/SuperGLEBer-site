export default function Submit() {
  return (
    <div className="flex flex-col px-2 sm:px-4 md:px-16 lg:px-64">
      <Intro />
    </div>
  );
}

function Intro() {
  return (
    <div className="text-center p-3 sm:p-4 md:p-8 lg:p-12 max-w-4xl mx-auto bg-base-100 shadow-xl rounded-lg my-4 sm:my-6">
      <h1 className="text-3xl sm:text-5xl font-bold text-center py-3 sm:py-5">Submission</h1>
      <p className="py-3 text-left text-sm sm:text-base">
        Welcome to the submission site 🚀 In order to submit your model to the SuperGLEBer leaderboard, please provide the following information via email to:{" "}
        <a href="mailto:supergleber@informatik.uni-wuerzburg.de" className="text-blue-500 break-all">
          supergleber@informatik.uni-wuerzburg.de
        </a>
      </p>
      <ul className="list-disc list-inside text-left text-sm sm:text-base">
        <li>Model Name</li>
        <li>System Description</li>
        <li>Overview of achieved results</li>
        <li>Compressed (ZIP) file of model predictions on test set</li>
        <li>Compressed (ZIP) file of training logs</li>
      </ul>
      <p className="py-6 sm:py-10 text-sm sm:text-base">
        By submitting your data, you consent to being contacted by the SuperGLEBer organizers about your submission. If you have any issues making a submissions, or have any questions, please reach out to us at: <br />{" "}
        <a href="mailto:supergleber@informatik.uni-wuerzburg.de" className="text-blue-500 break-all">
          supergleber@informatik.uni-wuerzburg.de
        </a>
      </p>
    </div>
  );
}
