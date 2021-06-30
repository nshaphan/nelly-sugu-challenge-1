const api = 'https://jsonplaceholder.typicode.com'
let contentBox = null;
const pages = ['posts', 'users']

const renderUsers = () => {
    contentBox.innerHTML = `${contentBox.innerHTML} Loading...`
    fetch(`${api}/users`)
        .then((response) => response.json())
        .then((users) => {
            let content = `
                <h1 class="page-title">Users</h1>
            `
            users.forEach(user => {
                content = `${content}
                    <div class="card d-flex-md">
                        <div class="info">
                            <h3 class="names">
                                ${user.name}
                                <span class="username">&nbsp;@${user.username}</span>
                            </h3>
                            <span class="email">${user.email}</span>
                        </div>
                        <div>
                            <button class="btn get-posts" value="${user.id}">Get User's Posts</button>
                        </div>
                    </div>
                    `
            })
            content = `${content}</div>`
            contentBox.innerHTML = content;
            const buttons = document.querySelectorAll(".get-posts")
            for (const button of buttons) {
                button.addEventListener('click', renderPostsPage)
            }
        })
}


const fetchPosts = () => {
    const parsedUrl = new URL(window.location.href)
    id = parsedUrl.searchParams.get('id')
    fetch(`${api}/users/${id}/posts`)
        .then((response) => response.json())
        .then((posts) => {
            let content = `
                <h1 class="page-title">Posts</h1>
                <a href="#" id="btn-go-back">Go back</a>
                <div class="d-flex-md flex-wrap">
            `
            posts.forEach(post => {
                content =  `${content}
                    <div class="card post d-flex-md">
                        <div class="info">
                            <a href="#post-${post.id}" class="post-title">
                                ${post.title}
                            </a>
                        </div>
                    </div>
                `
            })
            console.log(content);
            content = `${content}</div>`
            contentBox.innerHTML = content;
            btnGoBack = document.getElementById("btn-go-back");
            btnGoBack.addEventListener('click', goBack)
        })
}

const renderPostsPage = (e) => {
    const { value } = e.target
    const btn = e.target || e.srcElement;
    btn.innerText = "Loading..."
    window.history.pushState({
        'title': 'Posts'
    }, 'posts', `?id=${value}#posts`)
    render()
}

const goBack = (e) => {
    e.preventDefault()
    contentBox.innerHTML = `${contentBox.innerHTML} Loading...`
    window.history.pushState({
        'title': 'Users'
    }, 'users', `#users`)
    render()
}

const renderUsersPage = (e) => {
    window.history.pushState({
        'title': 'Users'
    }, 'users', `#users`)
    render()
}


const render = () => {
    const page = window.location.hash.split('#').pop() || ''
    if (pages.includes(page)){
        if (page === 'posts') {
            fetchPosts()
        } else {
            renderUsers()
        }
    } else {renderUsers()}
}

document.addEventListener("DOMContentLoaded", function(){
    contentBox = document.getElementById("content-box");    
    render()
});
