const helper = require('./helper.js');
 
 
// login helper function that passes username and password
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
 
// signup helper function that creates an account based on user input
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
 
 
// window for login
const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
 
 
 
 
 
 
            {/* Login and SignUp Credits: https://tailwindcomponents.com/component/login-page-6, https://tailwindui.com/components/application-ui/forms/sign-in-forms */}
 
 
            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 className="font-bold text-2xl">Welcome to GameMaker</h3>
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
 
                    <div className="hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl
                transition duration-200">
                        <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                        <input className="formSubmit" type="submit" value="Sign In" />
                    </div>
 
 
 
                </section>
            </main>
 
 
 
 
 
 
 
        </form>
    );
};
 
// window for signup
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
                    <h3 className="font-bold text-2xl">Welcome to GameMaker</h3>
                    <p className="text-gray-600 pt-2">Sign in to your account.</p>
                </section>
 
                <section className="mb-10">
 
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="username">Username</label>
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
 
 
// initlaizing the necessary data for login and signup
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

