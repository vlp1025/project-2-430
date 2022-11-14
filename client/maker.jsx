const helper = require('./helper.js');
 
const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();
 
    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const _csrf = e.target.querySelector('#_csrf').value;
    const health = e.target.querySelector('#domoHealth').value;
 
 
    if (!name || !age) {
        helper.handleError('All fields are required!');
        return false;
    }
 
    helper.sendPost(e.target.action, { name, age, health, _csrf }, loadDomosFromServer);
 
    return false;
};
 
const DomoForm = (props) => {
    return (
        <div>
            <form id="domoForm"
                onSubmit={handleDomo}
                name="domoForm"
                action="/maker"
                method="POST"
                className="domoForm"
            >
                <label htmlFor="name">Name: </label>
                <input type="text" id="domoName" name="name" placeholder="Domo Name" />
                <label htmlFor="age">Age: </label>
                <input type="number" id="domoAge" name="age" min="0" />
                <label htmlFor="health">Health: </label>
                <input type="number" id="domoHealth" name="health" min="0" max="10" />
                <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                <input className="makeDomoSubmit" type="submit" value="Make Domo" />
 
 
            </form>
 
            <form
                id='uploadForm'
                action='/upload'
                method='post'
                encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
                <input type='submit' value='Upload!' />
            </form>
 
            <form
                id='retrieveForm'
                action='/retrieve'
                method='get'>
                <label htmlFor='fileName'>Retrieve File By ID: </label>
                <input name='_id' type='text' />
                <input type='submit' value='Retrieve!' />
            </form>
 
            <section id="messages"></section>
 
        </div>
 
    );
};
 
const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className='emptyDomo'>No Domos Yet!</h3>
            </div>
        );
    }
 
    const domoNodes = props.domos.map(domo => {
        const imageUrl = `/retrieve?_id=${domo.imgId}`;
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className='domoFace' />
                <h3 className='domoName'>Name: {domo.name} </h3>
                <h3 className='domoAge'>Age: {domo.age} </h3>
                <h3 className='domoHealth'>Health: {domo.health} </h3>
                {/* <img src={imageUrl} /> */}
            </div>
        );
    });
 
    return (
        <div className='domoList'>
            {domoNodes}
        </div>
    );
};
 
const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
};
 
const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
 
    ReactDOM.render(
        <DomoForm csrf={data.csrfToken} />,
        document.getElementById('makeDomo')
    );
 
    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );
 
    // const domos = document.getElementById('domos');
    // const image = document.createElement('img');
    // const imageId = '636fdb48eae0701545149ec7';
    // image.src = `/retrieve?_id=${imageId}`;
    // domos.appendChild(image);
 
    loadDomosFromServer();
};
 
window.onload = init;
 
 
