import '../styles/globals.css';

let FONT_HEAD = '20px'


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
                <link rel="icon" href="/SuperGLEBer-site/bernd.png" />
                <title>SuperGLEBer</title>
            </head>

            <body>

                <div id="__next" className="flex flex-col h-full">
                    <div className="main-content">
                        <NavBar />
                        {children}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}


export function NavBar() {
    const dropdownStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex: '1',
        position: 'absolute',

    };

    return (
        <div className="navbar bg-blue-500 text-white relative">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                    <div className="dropdown text-white mr-4 relative">
                        <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex="0"
                            className="menu menu-sm dropdown-content mt-3 p-2 rounded-box w-52"
                            style={dropdownStyle}>
                            <li><a>Tasks</a>
                                <ul className="p-2">
                                    <li><a href="./classification">Classification</a></li>
                                    <li><a href="./sequencetagger">Sequence Tagging</a></li>
                                    <li><a href="./similarity">Sentence Similarity</a></li>
                                    <li><a href="./qa">Question Answering</a></li>
                                </ul>
                            </li>
                            <li style={{ fontSize: FONT_HEAD }}><a href="./leaderboard">Leaderboard</a>
                                <ul className="p-2">
                                    <li><a href="./leaderboard_v1">Leaderboard v1</a></li>
                                    <li><a href="./leaderboard_v09">Leaderboard v0.9</a></li>
                                </ul>


                            </li>
                            <li style={{ fontSize: FONT_HEAD }}><a>Paper</a></li>
                            <li style={{ fontSize: FONT_HEAD }}><a>Code</a></li>
                            <li style={{ fontSize: FONT_HEAD }}><a href="./submit">Submit</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl" href="./" style={{ fontSize: 25 }}>SuperGLEBer</a>
                </div>
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-3">
                        <li>
                            <details>
                                <summary style={{ fontSize: FONT_HEAD }}>Tasks</summary>
                                <ul className="p-2 text-black" style={{ ...dropdownStyle, display: 'flex', flexDirection: 'column', padding: '5px' }}>
                                    <li><a href="./classification">Classification</a></li>
                                    <li><a href="./sequencetagger">Sequence Tagging</a></li>
                                    <li><a href="./similarity">Sentence Similarity</a></li>
                                    <li><a href="./qa">Question Answering</a></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary style={{ fontSize: FONT_HEAD }}><a href="./leaderboard_v1">Leaderboard</a></summary>
                                <ul className="p-2 text-black" style={{ ...dropdownStyle, display: 'flex', flexDirection: 'column', padding: '5px' }}>
                                    <li><a href="./leaderboard_v1">Leaderboard v1</a></li>
                                    <li><a href="./leaderboard_v09">Leaderboard v0.9</a></li>
                                </ul>
                            </details>
                        </li>
                        <li style={{ fontSize: FONT_HEAD }}><a href="https://aclanthology.org/2024.naacl-long.438/" target="_blank">Paper</a></li>
                        <li style={{ fontSize: FONT_HEAD }}><a href="https://github.com/LSX-UniWue/SuperGLEBer" target="_blank">Code</a></li>
                        <li style={{ fontSize: FONT_HEAD }}><a href="./submit">Submit</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="footer items-center p-4 bg-blue-500 text-white">
            <aside className="items-center grid-flow-col">
                <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
                    clipRule="evenodd" className="fill-current">
                    <path
                        d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                </svg>
                <p>Copyright © 2024 - All right reserved - <a href="https://www.uni-wuerzburg.de/sonstiges/impressum/"
                    target="_blank">Impressum - </a> Center for Artificial Intelligence and Data Science (CAIDAS) - Data Science Chair (JMU) </p>

            </aside>
        </footer>
    );
}
