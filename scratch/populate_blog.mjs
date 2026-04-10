import fs from 'fs';

const API_URL = 'http://localhost:5000/api';
const email = 'admin@couponsfeast.com';
const password = 'admin123';

async function main() {
  try {
    console.log('Logging in...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error('Login failed: ' + JSON.stringify(loginData));
    const token = loginData.token;
    console.log('Got token');

    // Fetch existing articles
    const blogsRes = await fetch(`${API_URL}/admin/blog`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const blogsData = await blogsRes.json();
    let articles = blogsData.data || [];

    console.log(`\nFound ${articles.length} blogs. Linking them dynamically to each other as Related Posts...`);

    // For each article, update its Related Posts to physically be the other 10 articles.
    for (let index = 0; index < articles.length; index++) {
        const articleToUpdate = articles[index];

        const relatedPosts = [];
        // We want 10 related posts dynamically pulled from the EXACT blogs we created
        for (let i = 0; i < 10; i++) {
            // cycle through the articles array starting from the next article
            const linkedArticle = articles[(index + 1 + i) % articles.length];
            
            relatedPosts.push({
                title: linkedArticle.title,
                slug: linkedArticle.slug,
                category: linkedArticle.category || 'General',
                date: linkedArticle.dateLabel || `April ${10 + i}, 2026`,
                image: linkedArticle.image || 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1000'
            });
        }

        const updatePayload = {
            ...articleToUpdate,
            author: { 
                name: 'Admin Expert Writer', 
                bio: 'A passionate expert writer sharing insights on savings, deals, and much more.', 
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200', 
                website: 'https://couponsfeast.com' 
            },
            relatedPosts: relatedPosts
        };

        const updateRes = await fetch(`${API_URL}/admin/blog/update/${articleToUpdate._id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatePayload)
        });

        if (updateRes.ok) {
            console.log(`  ✓ Dynamically linked 10 real blogs to: ${articleToUpdate.title}`);
        } else {
            console.error(`  ✗ Failed to update article: ${articleToUpdate.title}`);
        }
    }

    console.log('\nTask Completed! All blogs now use each other securely as dynamic Related Posts.');

  } catch (err) {
      console.error(err);
  }
}

main();
