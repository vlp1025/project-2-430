// informs of errors
const handleError = (message) => {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('gameMessage').classList.remove('hidden');
};


// sends page information
const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.getElementById('gameMessage').classList.add('hidden');

  if(result.error) {
    handleError(result.error);
  }

  if(result.redirect) {
    window.location = result.redirect;
  }

  if (handler) {
      handler(result);
  }
};

// hides error message
const hideError = () => {
  document.getElementById('gameMessage').classList.add('hidden');
};

module.exports = {
  handleError,
  sendPost,
  hideError,
};

