 
const helper = require('./helper.js');
 
 
// handles creating game information
const handleGame = (e) => {
    e.preventDefault();
    helper.hideError();
 
    const name = e.target.querySelector('#gameName').value;
    const hours = e.target.querySelector('#gamehours').value;
    const genre = e.target.querySelector('#gameGenre').value;
    const _csrf = e.target.querySelector('#_csrf').value;
    const fileId = e.target.querySelector('#gamefileId').value;
    const start = e.target.querySelector('#start').value;
    const rating = e.target.querySelector('#gameRating').value;
 
 
 
    if (!name || !hours || !start || !fileId || !genre || !rating) {
        helper.handleError('All fields are required!');
        return false;
    }
 
    helper.sendPost(e.target.action, { name, hours, start, genre, fileId, rating, _csrf }, loadGamesFromServer);
 
    return false;
};
 
// game deletion
const deleteGame = (e) => {
 
    e.preventDefault();
    helper.hideError();
 
    const _csrf = document.querySelector('#_csrf').value;
    const _id = e.target.querySelector('#_id').value;
    helper.sendPost(e.target.action, { _id, _csrf }, loadGamesFromServer);
}
 
 
// establishes the form of the game and gathers data from user
const GameForm = (props) => {
    return (
        <div>
            <form id="gameForm"
                onSubmit={handleGame}
                name="gameForm"
                action="/maker"
                method="POST"
                className="gameForm"
            >
 
                <div className="grid gap-6 mb-6 md:grid-cols-2" id="gameForm1">
                    <div>
                        <label htmlFor="name" className="ml-12 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name:</label>
                        <input type="text" id="gameName" name="name" placeholder="Game Name" className="ml-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="hours" className="ml-12 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hours:</label>
                        <input type="number" id="gameHours" name="hours" className="ml-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="fileId" className="ml-12 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">File ID:</label>
                        <input type="text" id="gamefileId" name="fileId" className="ml-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="genre" className="ml-12 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Genre:</label>
                        <input type="text" id="gameGenre" name="genre" className="ml-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="start" className="ml-12 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Start Date:</label>
                        <input type="date" id="start" name="start" className="ml-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="rating" className="ml-12 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rating 1 to 10:</label>
                        <input type="number" id="gameRating" name="rating" min='0' max='10' className="ml-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
 
 
                    <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                    <br /><br />
                    <input className="makeGameSubmit" type="submit" value="Make Game" />
 
                </div>
 
 
 
            </form>
 
            <form
                id='uploadForm'
                action='/upload'
                method='post'
                encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                <br /><br />
                <input type='submit' value='Upload!' id="uploadButton" />
            </form>
 
            <form
                id='retrieveForm'
                action='/retrieve'
                method='get'>
                <label htmlFor='fileName'>Retrieve File By ID: </label>
                <br /><br />
                <input name='_id' type='text' />
                <input type='submit' value='Retrieve!' />
            </form>
 
            <section id="messages"></section>
 
        </div>
 
    );
};
 
 
// lists the available game data
const GameList = (props) => {
    if (props.games.length === 0) {
        return (
 
            <h3 className='emptyGame'>No Games Yet!</h3>
 
        );
    }
 
    const gameNodes = props.games.map(game => {
        const imageUrl = `/retrieve?_id=${game.imgId}`;
        const parsedDate = (new Date(Date.parse(game.start))).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        console.log(game);
        return (
            <div key={game._id} className="game">
                <img src="/assets/img/gamePad.jpg" alt="game symbol" className='gameSymbol' />
                <h3 className='gameName'>Name: {game.name} </h3>
                <h3 className='gameHours'>Hours Played: {game.hours} </h3>
                <h3 className='gameGenre'>Genre: {game.genre} </h3>
                <h3 className='gamefileId'>File ID: {game.fileId} </h3>
                <h3 className='start'>Start Date: {parsedDate} </h3>
                <h3 className='gameRating'>Rating: {game.rating} </h3>
 
                {/* <img src={imageUrl} /> */}
                <form
                    action="/delete"
                    name="deleteButton"
                    method='POST'
                    onSubmit={deleteGame}
                >
                    <input className="makeGameSubmit" type="submit" value="Delete" id="deleteButton" />
                    <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                    <input type="hidden" id="_id" name='_id' value={game._id} />
                </form>
            </div>
        );
    });
 
    return (
        <div className='gameList'>
            {gameNodes}
        </div>
    );
};
 
 
 
// password change
const changePassword = (e) => {
    e.preventDefault();
    helper.hideError();
 
    const newPass = e.target.querySelector('#pass').value;
    const newPass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;
 
    if (!newPass || !newPass2) {
        helper.handleError('All fields are required');
        return false;
    }
 
    helper.sendPost(e.target.action, { newPass, newPass2, _csrf });
 
    return false;
};
 
 
 
 
 
// creates the label and input for changing a password
const ChangePasswordWindow = (props) => {
    return (
        <form id='changePasswordForm'
            name='changePasswordForm'
            onSubmit={changePassword}
            action="/changePassword"
            method='POST'
        >
 
 
 
            <label htmlFor="pass" className="block ml-5">New password: </label>
            <input type="password" id="pass" name="pass" placeholder="new password" className="block ml-5 " />
 
 
 
            <label htmlFor="pass2" className="block ml-5">Confirm New password: </label>
            <input type="password" id="pass2" name="pass2" placeholder="retype new password" className="block ml-5"/>
 
 
            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change Password" />
        </form>
    );
};
 
 
 
 
 
 
 
 
 
 
 
// gather game information from server
const loadGamesFromServer = async () => {
    const response = await fetch('/getGames');
    const data = await response.json();
    ReactDOM.render(
        <GameList games={data.games} />,
        document.getElementById('games')
    );
};
 
 
// initializes the appropiate data to handle making a ga,e and changing password
const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
 
 
    const changePasswordButton = document.getElementById('changePassword');
 
    changePasswordButton.addEventListener('click', async (e) => {
 
        e.preventDefault();
        ReactDOM.render(<ChangePasswordWindow csrf={data.csrfToken} />,
            document.getElementById("changePasswordSection"))
    });
 
 
    ReactDOM.render(
        <GameForm csrf={data.csrfToken} />,
        document.getElementById('makeGame')
    );
 
    ReactDOM.render(
        <GameList games={[]} csrf={data.csrfToken} />,
        document.getElementById('games')
    );
 
 
    loadGamesFromServer();
};
 
window.onload = init;
 
 
 
 

