fetch('/selectedUser', { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    displayUser(data);
    completeInput(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

const displayUser = (user) => {
    const usersContainer = document.getElementById('userContainer');

    const userDiv = document.createElement('div');
    const image = document.createElement('img');
    const userInfo = document.createElement('div');
    const usernamePara = document.createElement('p');
    const emailPara = document.createElement('p');
    const phonePara = document.createElement('p');
    const hr = document.createElement('hr');


    userDiv.classList.add('card', 'm-1', 'mt-4', 'border-secondary', 'text-center');
    userDiv.style.width = '27rem';
    image.src = './img/' + user.image;
    image.alt = 'User Image';

    userInfo.classList.add('card-body');
    usernamePara.classList.add('card-text');
    usernamePara.classList.add('text-center');
    emailPara.classList.add('card-text');
    phonePara.classList.add('card-text');

    usernamePara.textContent = `${user.name}`;
    emailPara.textContent = `${user.email}`;
    phonePara.textContent = `${user.phone}`;


    userInfo.appendChild(usernamePara);
    userInfo.appendChild(hr);
    userInfo.appendChild(emailPara);
    userInfo.appendChild(phonePara);

    userDiv.appendChild(image);
    userDiv.appendChild(userInfo);


    usersContainer.appendChild(userDiv);
};

const completeInput = (user) => {
    document.getElementById('usernameInput').value = user.name;
    document.getElementById('emailInput').value = user.email;
    document.getElementById('numberInput').value = user.phone;
}

