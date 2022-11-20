const helper = require('./helper.js');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, _csrf });

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, pass2, _csrf });

    return false;
};

const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >




            {/* <div className="">
                    <div className="content-center px-8 py-6 text-left bg-white shadow-lg bg-gray-100">
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-center">Login to your account</h3>

                        <div className="mt-4">
                            <div>
                                <label className="block" htmlFor="username">Username</label>
                                <input placeholder="username" autoComplete="off" id="user" name="username" type="text"
                                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="pass" className="block">Password</label>
                                <input autoComplete="off" type="password" id="pass" name="pass"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />

                            </div>
                            <div className="flex items-baseline justify-between">
                                <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                                <input className="formSubmit" type="submit" value="Sign In" />
                            </div>
                        </div>

                    </div>
                </div> */}



            {/* <label htmlFor="username">Username: </label>
            <input type="text" id="user" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input type="password" id="pass" name="pass" placeholder="password" />
            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign In" /> */}





            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 className="font-bold text-2xl">Welcome to Startup</h3>
                    <p className="text-gray-600 pt-2">Sign in to your account.</p>
                </section>

                <section className="mb-10">

                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="username">Email</label>
                        <input type="text" id="user" name="username" placeholder="username"
                            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="pass">Password</label>
                        <input type="password" id="pass" name="pass"
                            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                    </div>
                    <div className="flex justify-end">
                        <a href="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot
                            your password?</a>
                    </div>
                    <div className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl
                transition duration-200">
                        <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                        <input className="formSubmit" type="submit" value="Sign In" />
                    </div>



                </section>
            </main>







        </form>
    );
};

const SignUpWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >


            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 className="font-bold text-2xl">Welcome to Startup</h3>
                    <p className="text-gray-600 pt-2">Sign in to your account.</p>
                </section>

                <section className="mb-10">

                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="username">Email</label>
                        <input type="text" id="user" name="username" placeholder="username"
                            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="pass">Password</label>
                        <input type="password" id="pass" name="pass"
                            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="pass2">Retype Password</label>
                        <input type="password" id="pass2" name="pass2"
                            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                    </div>
                    <div className="flex justify-end">
                        <a href="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot
                            your password?</a>
                    </div>
                    <div className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl
                transition duration-200">
                        <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                        <input className="formSubmit" type="submit" value="Sign In" />
                    </div>



                </section>
            </main>










{/* 
            <label htmlFor="username">Username: </label>
            <input type="text" id="user" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input type="password" id="pass" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input type="password" id="pass2" name="pass2" placeholder="retype password" />
            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign In" /> */}
        </form>
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf={data.csrfToken} />,
            document.getElementById('content'));

        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignUpWindow csrf={data.csrfToken} />,
            document.getElementById('content'));

        return false;
    });

    ReactDOM.render(<LoginWindow csrf={data.csrfToken} />,
        document.getElementById('content'));
};

window.onload = init;