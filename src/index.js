import '../src/styles/main.scss';

// Helper function to create a DOM element
const createNode = element => {
  return document.createElement(element)
}

// Helper function to append a child element to a parent element
const append = (parent, el) => {
  return parent.appendChild(el)
}

const articlesContainer = document.getElementById('articles');

// Fetch data and create DOM elements with content
fetch('data/news.json')
  .then(response => response.json())
  .then(data => {
    const articles = data.articles
  
    return articles.map(article => {
      // Create DOM elements
      const articleWrapper = createNode('div')
      const articleHeading = createNode('h2')
      const articleHeadingLink = createNode('a')
      const articleDetailWrapper = createNode('div')
      const articleStandfirst = createNode('p')
      const articleImage = createNode('img')
      const articleCategory = createNode('span')

      // Add custom classes to created DOM elements for styling purposes
      articleWrapper.classList.add('article')
      articleHeading.classList.add('article-heading')
      articleHeadingLink.classList.add('article-heading-link')
      articleDetailWrapper.classList.add('article-detail-container')
      articleStandfirst.classList.add('article-standfirst')
      articleImage.classList.add('article-image')
      articleCategory.classList.add('article-category')

      // Feed created DOM elements with respective content
      articleHeadingLink.innerHTML = `${article.headline}`
      articleHeadingLink.setAttribute('href', `${article.link}`)
      articleStandfirst.innerHTML = `${article.standfirst}`
      articleImage.src = article.thumbnail.src
      articleImage.setAttribute('alt', `${article.thumbnail.title}`)
      articleCategory.innerHTML = `${article.primarySectionRouteName}`
      
      // Append elements to their relevant parents
      append(articleWrapper, articleCategory)
      append(articleHeading, articleHeadingLink)
      append(articleWrapper, articleHeading)
      append(articleDetailWrapper, articleImage)
      append(articleDetailWrapper, articleStandfirst)
      append(articleWrapper, articleDetailWrapper)
      append(articlesContainer, articleWrapper)
    })
  })
  .catch(error => {
    console.log(error);
  });