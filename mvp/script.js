// 初始化數據
let boards = JSON.parse(localStorage.getItem('boards')) || {};
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let selectedBoard = null;
let selectedPost = null;

// 初始化 Bootstrap 模態框實例
const postDetailsModalElement = document.getElementById('postDetailsModal');
const postDetailsModal = new bootstrap.Modal(postDetailsModalElement);

const popupModalElement = document.getElementById('popup');
const popupModal = new bootstrap.Modal(popupModalElement);

// 儲存數據到 localStorage
function saveData() {
    localStorage.setItem('boards', JSON.stringify(boards));
    localStorage.setItem('posts', JSON.stringify(posts));
}

// 加載板塊
function loadBoards() {
    const boardList = document.getElementById('board-list');
    boardList.innerHTML = '';
    Object.keys(boards).forEach(board => {
        const li = document.createElement('li');
        li.textContent = `${board} (${boards[board].length} 則貼文)`;
        li.classList.add('list-group-item', 'list-group-item-action');
        li.addEventListener('click', () => showBoard(board));
        boardList.appendChild(li);
    });
}

// 顯示板塊貼文
function showBoard(boardName) {
    selectedBoard = boardName;
    const boardTitle = document.getElementById('board-title');
    const boardInfo = document.getElementById('board-info');
    const postContainer = document.getElementById('posts');

    boardTitle.textContent = `#${boardName}`;
    boardInfo.textContent = `${boards[boardName].length} 則貼文`;
    postContainer.innerHTML = '';

    boards[boardName].forEach(postId => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            const div = document.createElement('div');
            div.className = 'post card mb-2';
            div.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.content.substring(0, 50)}...</p>
                </div>
            `;
            div.addEventListener('click', () => showPostDetails(post));
            postContainer.appendChild(div);
        }
    });

    // 關閉板塊列表
    closeBoardList();
}

// 顯示貼文詳細內容
function showPostDetails(post) {
    selectedPost = post;
    document.getElementById('detail-title').textContent = post.title;
    document.getElementById('detail-content').textContent = post.content;
    document.getElementById('like-count').textContent = post.likes || 0;

    const commentList = document.getElementById('comments');
    commentList.innerHTML = '';
    (post.comments || []).forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment;
        li.classList.add('list-group-item');
        commentList.appendChild(li);
    });

    postDetailsModal.show();
}

// 新增留言
function addComment() {
    const input = document.getElementById('comment-input');
    const comment = input.value.trim();
    if (comment && selectedPost) {
        selectedPost.comments = selectedPost.comments || [];
        selectedPost.comments.push(comment);
        saveData();

        // 更新留言列表
        const commentList = document.getElementById('comments');
        const li = document.createElement('li');
        li.textContent = comment;
        li.classList.add('list-group-item');
        commentList.appendChild(li);

        input.value = '';
    }
}

// 按讚
function likePost() {
    if (selectedPost) {
        selectedPost.likes = (selectedPost.likes || 0) + 1;
        document.getElementById('like-count').textContent = selectedPost.likes;
        saveData();
    }
}

// 新增貼文
function addPost() {
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const tags = document.getElementById('post-tags').value.split(',').map(t => t.trim()).filter(t => t);

    if (title && content && tags.length) {
        const postId = `post-${posts.length + 1}`;
        const newPost = { id: postId, title, content, tags, likes: 0, comments: [] };
        posts.push(newPost);

        tags.forEach(tag => {
            if (!boards[tag]) boards[tag] = [];
            boards[tag].push(postId);
        });

        saveData();
        popupModal.hide();
        loadBoards();
        if (selectedBoard) showBoard(selectedBoard);
    }
}

// 顯示新增貼文視窗
function openPopup() {
    popupModal.show();
}

// 關閉新增貼文視窗
function closePopup() {
    popupModal.hide();
}

// 開啟板塊列表
function openBoardList() {
    document.getElementById('board-list-overlay').style.display = 'block';
}

// 關閉板塊列表
function closeBoardList() {
    document.getElementById('board-list-overlay').style.display = 'none';
}

// 初始化事件
document.getElementById('add-post').addEventListener('click', openPopup);
document.getElementById('submit-post').addEventListener('click', addPost);
document.getElementById('close-popup').addEventListener('click', closePopup);
document.getElementById('comment-button').addEventListener('click', addComment);
document.getElementById('like-button').addEventListener('click', likePost);
document.getElementById('toggle-board-list').addEventListener('click', openBoardList);
document.getElementById('close-board-list').addEventListener('click', closeBoardList);

// 初始化板塊
loadBoards();
