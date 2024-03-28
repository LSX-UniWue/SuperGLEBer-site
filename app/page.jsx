export default function Home() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="w-3/5 space-y-4">
                    <h1 className="text-5xl font-bold">SuperGLEBer</h1>
                    <h2 className="text-2xl font-bold py-2">German Language Understanding Evaluation Benchmark</h2>
                    <p className="py-5">
                        We assemble a broad Natural Language Understanding benchmark suite for the German language and
                        consequently evaluate a wide array of existing German-capable models in order to create a better
                        understanding of the current state of German LLMs. Our benchmark consists of 29 different tasks
                        ranging over different types like document classification, sequence tagging, document embedding,
                        and question answering. We evaluate 10 different German-pretrained models and thereby chart the
                        landscape of German LLMs. In our comprehensive evaluation, we find that encoder models are a
                        good
                        choice for most tasks, but also that the largest encoder model does not necessarily perform best
                        for all tasks. We make our benchmark suite and leaderboard publicly available here and
                        encourage the community to contribute new tasks and evaluate more models on it.
                    </p>
                    <div className="flex justify-between mt-60">
                        <button className="btn bg-blue-500 flex-1 mr-2 ">
                            <a href="./leaderboard" className="text-white ">
                                <span className="fa fa-trophy mr-2"></span>
                                Leaderboard
                            </a>
                        </button>


                        <button className="btn bg-blue-500 flex-1 mx-2 ">
                            <a href="#" className="text-white ">
                                <span className="fa fa-file-text mr-2"></span>
                                Paper
                            </a>
                        </button>

                        <button className="btn bg-blue-500 flex-1 ml-2 ">
                            <a href="#" className="text-white ">
                                <span className="fa fa-file-code mr-2"></span>
                                Code
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
