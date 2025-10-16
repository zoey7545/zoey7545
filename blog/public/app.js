async function fetchPosts() {
  const res = await fetch('/api/posts');
  const posts = await res.json();
  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';
  posts.reverse().forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
    postsDiv.appendChild(div);
  });
}

document.getElementById('postForm').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  await fetch('/api/posts', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title, content})
  });
  document.getElementById('postForm').reset();
  fetchPosts();
});

fetchPosts();
