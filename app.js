// Function to fetch posts from the "posts" folder and display them
async function fetchPosts() {
    try {
      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = ''; // Clear any existing posts
  
      let postNumber = 1;
      let postFile = `p${postNumber}.txt`;
      let postExists = true;
  
      // Loop to fetch post files p1.txt, p2.txt, p3.txt, ..., until a 404 is encountered
      while (postExists) {
        const post = await fetchPost(postFile);
  
        if (post) {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          postElement.innerHTML = `
            <h2>${post.title}</h2>
            <div class="metadata">${post.metadata}</div>
            <div class="post-preview">${post.preview}</div><br>
            <button class="nt-button" sonclick="location.href='post.html?p=${postNumber}'">Read more</button>
          `;
          postsContainer.appendChild(postElement);
  
          postNumber++;
          postFile = `p${postNumber}.txt`;  // Increment to the next post
        } else {
          postExists = false;  // Stop if no more posts are found
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  
  // Function to fetch and parse an individual post
  async function fetchPost(postFile) {
    try {
      // Fetch the text file from the public/posts folder
      const response = await fetch(`posts/${postFile}`);
  
      // If the file doesn't exist (404), return null
      if (!response.ok) {
        return null;  // Returning null to stop fetching
      }
  
      const text = await response.text();
  
      // Split the text file content by line breaks
      const content = text.split('\n');
  
      // First line is the title
      const title = content[0];
  
      // Second line is the metadata
      const metadata = content[1];
  
      // Third line (first line of the body) is the preview text
      const preview = content[2];
  
      return { title, metadata, preview };
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  }
  
  // Call fetchPosts to load posts when the page is ready
  fetchPosts();
  