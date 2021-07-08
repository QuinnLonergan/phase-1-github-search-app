document.addEventListener('DOMContentLoaded', () => {
    search()
})

function search() {
    document.querySelector(`#github-form`).addEventListener(`submit`, (e) => { 
    e.preventDefault()
    fetch (`https://api.github.com/search/users?q=${e.target.search.value}`)
        .then(res => res.json())
        .then(json => (json.items).forEach((users) => {
            // console.log(json.items)
            let userList = document.querySelector(`#user-list`)

            let li = document.createElement('li')
            li.textContent = users.login
            userList.append(li)

            let btn = document.createElement('button')
            btn.innerText = "Show Repos"
            btn.className = `btn-${users.login}`
            li.append(btn)

            let liLink = document.createElement('a')
            liLink.textContent = 'visit profile'
            liLink.href = users.html_url
            li.append(liLink)

            let img = document.createElement('img')
            img.src = users.avatar_url
            userList.append(img)

            document.querySelector(`.btn-${users.login}`).addEventListener( 'click', showRepo)

            function showRepo() {
                fetch (`https://api.github.com/users/${users.login}/repos`)
                    .then(result => result.json())
                    .then(data => data.forEach((repo) => {
                        let liRepo = document.createElement('li')
                        liRepo.textContent = repo.name
                        document.querySelector(`#repos-list`).append(liRepo)

                    }))
            }



        }))
        
    })
}

// function fetchUsers() {
//     fetch (`https://api.github.com/search/users?q=${user}`)
//     .then(res => res.json())
//     .then(json => console.log(json))
// }