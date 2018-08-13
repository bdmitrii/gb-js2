const url = 'https://randomuser.me/api/?results=10';
const appContainer = document.getElementById('app');

fetch(url)
    .then((res) => res.json())
    .then((res) => {
        const results = res.results;
        console.log(results[0]);

        results.forEach(user => {
            app.insertAdjacentHTML('beforeend', `
                <div style="margin-bottom: 40px; background-color: orange; width: 100px">
                    <img src="${user.picture.medium}" alt="User Photo"/>
                    <p>${user.name.first}</p>
                </div>
            `);
        })        
    })
    .catch((err) => {
        console.error(err);
    })