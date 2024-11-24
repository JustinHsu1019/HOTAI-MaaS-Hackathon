// 初始化數據
let boards = {};
let posts = [];

// 加載板塊
function loadBoards() {
    const boardList = document.getElementById('board-list');
    boardList.innerHTML = '';
    Object.keys(boards).forEach(board => {
        const li = document.createElement('li');
        li.textContent = `${board} (${boards[board].length} 則貼文)`;
        li.addEventListener('click', () => showBoard(board));
        boardList.appendChild(li);
    });
}

// 顯示板塊
function showBoard(boardName) {
    const boardTitle = document.getElementById('board-title');
    const boardInfo = document.getElementById('board-info');
    const postContainer = document.getElementById('posts');

    boardTitle.textContent = `#${boardName}`;
    boardInfo.textContent = `${boards[boardName].length} 則貼文`;
    postContainer.innerHTML = '';

    boards[boardName].forEach(postId => {
        const post = posts.find(p => p.id === postId);
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `<h4>${post.title}</h4><p>${post.content.substring(0, 50)}...</p>`;
        postContainer.appendChild(div);
    });
}

// 新增貼文
function addPost() {
    const title = prompt('請輸入貼文標題:');
    const content = prompt('請輸入貼文內容:');
    const tags = prompt('請輸入貼文標籤 (用逗號分隔):').split(',');

    const postId = `post-${posts.length + 1}`;
    posts.push({ id: postId, title, content, tags });

    tags.forEach(tag => {
        if (!boards[tag]) boards[tag] = [];
        boards[tag].push(postId);
    });

    saveData();
    loadBoards();
}

// 保存數據
function saveData() {
    const data = { boards, posts };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.getElementById('download-link');
    link.href = URL.createObjectURL(blob);
    link.download = 'forum-data.txt';
    link.click();
}

// 加載數據
function loadData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const data = JSON.parse(reader.result);
        boards = data.boards || {};
        posts = data.posts || [];
        loadBoards();
    };
    reader.readAsText(file);
}

// 初始化事件
document.getElementById('add-post').addEventListener('click', addPost);
document.getElementById('upload-file').addEventListener('change', loadData);

// 初始化板塊
loadBoards();
