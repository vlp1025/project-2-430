const helper = require('./helper.js');

const handleGame = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#gameName').value;
    const hours = e.target.querySelector('#gamehours').value;
    const _csrf = e.target.querySelector('#_csrf').value;
    const start = e.target.querySelector('#start').value;


    if (!name || !hours || !start) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { name, hours, start, _csrf }, loadGamesFromServer);

    return false;
};


const deleteGame = (e) => {

    e.preventDefault();
    helper.hideError();

    const _csrf = document.querySelector('#_csrf').value;
    const _id = e.target.querySelector('#_id').value;
    helper.sendPost(e.target.action, { _id, _csrf }, loadGamesFromServer);
}

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

                <label htmlFor="name">Name: </label>
                <br /><br />
                <input type="text" id="gameName" name="name" placeholder="Game Name" />
                <br /><br />
                <label htmlFor="hours">Hours: </label>
                <br /><br />
                <input type="number" id="gameHours" name="hours" min="0" />
                <br /><br />
                <label htmlFor="start">Start Date: </label>
                <br /><br />
                <input type="date" id="start" name="start" />
                <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                <input className="makeGameSubmit" type="submit" value="Make Game" />


            </form>

            <form
                id='uploadForm'
                action='/upload'
                method='post'
                encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                <br /><br />
                <input type='submit' value='Upload!' />
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
                <h3 className='start'>Start Date: {parsedDate} </h3>
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



// change pass 
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






const ChangePasswordWindow = (props) => {
    return (
        <form id='changePasswordForm'
            name='changePasswordForm'
            onSubmit={changePassword}
            action="/changePassword"
            method='POST'
        >
            <label htmlFor="pass">New password: </label>
            <input type="password" id="pass" name="pass" placeholder="new password" />
            <label htmlFor="pass2">Confirm New password: </label>
            <input type="password" id="pass2" name="pass2" placeholder="retype new password" />
            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change Password" />
        </form>
    );
};












const loadGamesFromServer = async () => {
    const response = await fetch('/getGames');
    const data = await response.json();
    ReactDOM.render(
        <GameList games={data.games} />,
        document.getElementById('games')
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();


    // change pass
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

    // const domos = document.getElementById('domos');
    // const image = document.createElement('img');
    // const imageId = '636fdb48eae0701545149ec7';
    // image.src = `/retrieve?_id=${imageId}`;
    // domos.appendChild(image);

    loadGamesFromServer();
};

window.onload = init;

