import React from "react";

export default function Home() {
  return (
    <div className="hero min-h-[calc(100vh-8rem)] bg-base-100">
      <div className="hero-content text-center px-4">
        <div className="w-full max-w-3xl space-y-4">
          <h1 className="hidden sm:block text-4xl md:text-5xl font-bold text-blue-500 relative z-30">SuperGLEBer</h1>
          <h2 className="text-xl sm:text-2xl py-2">German Language Understanding Evaluation Benchmark</h2>
          <p className="py-5 text-sm sm:text-base">
            We assemble a broad Natural Language Understanding benchmark suite for the German language and consequently evaluate a wide array of existing German-capable models in order to create a better understanding of the current state of German LLMs. Our benchmark consists of 29 different tasks
            ranging over different types like document classification, sequence tagging, document embedding, and question answering. We evaluate 10 different German-pretrained models and thereby chart the landscape of German LLMs. In our comprehensive evaluation, we find that encoder models are a
            good choice for most tasks, but also that the largest encoder model does not necessarily perform best for all tasks. We make our benchmark suite and leaderboard publicly available here and encourage the community to contribute new tasks and evaluate more models on it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="./leaderboard_v1" className="flex-1">
              <button className="btn bg-blue-500 w-full text-white">
                <span className="fa fa-trophy mr-2"></span>
                Leaderboard
              </button>
            </a>

            <a href="https://aclanthology.org/2024.naacl-long.438/" target="_blank" className="flex-1">
              <button className="btn bg-blue-500 w-full text-white">
                <span className="fa fa-file-text mr-2"></span>
                Paper
              </button>
            </a>

            <a href="https://github.com/LSX-UniWue/SuperGLEBer" target="_blank" className="flex-1">
              <button className="btn bg-blue-500 w-full text-white">
                <span className="fa fa-file-code mr-2"></span>
                Code
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
