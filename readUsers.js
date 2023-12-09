fetch('/displayUsers', { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    displayUsers(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

const displayUsers = (users) => {
  const usersContainer = document.getElementById('usersContainer');

  users.forEach((user) => {
        const userDiv = document.createElement('div');
        const image = document.createElement('img');
        const userInfo = document.createElement('div');
        const usernamePara = document.createElement('p');


        userDiv.id = `user_${user.id}`;
        userDiv.classList.add('card', 'm-1', 'mt-4', 'border-secondary');
        userDiv.style.width = '18rem';
        image.src = './img/' + user.image;
        image.alt = 'User Image';
        image.style = "min-height: 288px;";

        userInfo.classList.add('card-body');  
        usernamePara.classList.add('card-text');

        usernamePara.textContent = `${user.name}`;

  
        userInfo.appendChild(usernamePara);

        userDiv.appendChild(image);
        userDiv.appendChild(userInfo);


        usersContainer.appendChild(userDiv);

        const targetId = document.getElementById(`user_${user.id}`);
        targetId.addEventListener("click", (event) => {
          location.href=`http://localhost:3000/edit?user=${user.id}`;
        });

    });
};
