export function slugify (text) {
  return text
    .toString()                   // Cast to string (optional)
    .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase()                // Convert the string to lowercase letters
    .trim()                       // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
    .replace(/\_/g,'-')           // Replace _ with -
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .replace(/\-$/g, '');         // Remove trailing -
}

export function formatDate(date){
  return new Date(date).toLocaleDateString('en-GB', {
    timeZone: "UTC",
  })
}

export function formatBlogPosts(posts, {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined
} = {}){
  const filteredPosts = posts.reduce((acc,post) => {
    const { date, draft } = post.frontmatter;
    if (filterOutDrafts && draft) return acc;
    if (filterOutFuturePosts && new Date(date) > new Date ()) 
    return acc;
    acc.push(post)
    return acc;
  },[])

  if(sortByDate){
    filteredPosts.sort((a,b) => new Date(b.frontmatter.date - new Date(a.frontmatter.date)))
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  if(typeof limit === "number"){
    return filteredPosts.slice(0,limit)
  }
  return filteredPosts
}