/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import './blogs.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const _categories = [
    'ThoughtCircle',
    'World',
    'Technology',
    'Design',
    'Culture',
    'Business',
    'Politics',
    'Opinion',
    'Science',
    'Health',
    'Style',
    'Travel'
  ];
  const [state, setState] = useState({ categories: _categories, selectedCategory: 'ThoughtCircle', blogs: [] })

  const getBlogData = (category) => {
    axios.get('https://thoughtcircleapis.azurewebsites.net/api/blog-posts/' + category).then(
      (response) => {
        var result = response.data;
        setState({ ...state, blogs: response.data.value });
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  useEffect(() => {
    getBlogData(state.selectedCategory);
  }, [state.selectedCategory])

  const submitNewBlogData = () => {
    const _data = {
      blog: document.getElementById('blogCategory').value,
      title: document.getElementById('blogTitle').value,
      content: document.getElementById('blogContent').value
    }
    axios.post('https://thoughtcircleapis.azurewebsites.net/api/blog-post', _data).then(
      (response) => {
        var result = response.data;
        console.log(result);
        alert('Details saved successfully');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
        <a href="#" className="navbar-brand">TC</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Blogs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Profile</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search blogs" aria-label="Search" />
            <button className="btn btn-outline-info" type="submit">Search</button>
          </form>
          <form className="d-flex m-1">
            <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#newBlogModal">
              New Blog
            </button>
          </form>
        </div>
      </nav>

      {/* New Blog Modal */}
      <div className="modal fade" id="newBlogModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new blog</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="blogCategory" className="form-label">Blog Category</label>
                <select className="form-select" id="blogCategory">
                  {
                    state.categories.map((item) => {
                      return (
                        <option key={item} value={item}>{item}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="blogTitle" className="form-label">Blog Title</label>
                <input className="form-control" id="blogTitle" />
              </div>
              <div className="mb-3">
                <label htmlFor="blogContent" className="form-label">Blog Content</label>
                <textarea className="form-control" id="blogContent" rows="3"></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-info" onClick={() => { submitNewBlogData() }}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {/* Blog posts */}
      <header className="blog-header py-1">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 px-3">
            <a className="link-secondary" href="#">Subscribe</a>
          </div>
          <div className="col-4 text-center">
            <a className="blog-header-logo text-dark" href="#">ThoughtCircle</a>
          </div>
          <div className="col-4 text-center">
          </div>
        </div>
      </header>
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          {state.categories.map((item) => {
            return (
              <a key={item} className="p-2 link-secondary" onClick={() => { setState({ ...state, selectedCategory: item }) }} style={{cursor: 'pointer'}}>{item}</a>
            )
          })
          }
        </nav>
      </div>
      <main className="container">
        <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
          <div className="col-md-6 px-0">
            <h1 className="display-4 fst-italic">Title of a longer featured blog post</h1>
            <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
            <p className="lead mb-0"><a href="#" className="text-white fw-bold">Continue reading...</a></p>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">World</strong>
                <h3 className="mb-0">Featured post</h3>
                <div className="mb-1 text-muted">Nov 12</div>
                <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="stretched-link">Continue reading</a>
              </div>
              <div className="col-auto d-none d-lg-block">
                <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /></svg>

              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-success">Design</strong>
                <h3 className="mb-0">Post title</h3>
                <div className="mb-1 text-muted">Nov 11</div>
                <p className="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="stretched-link">Continue reading</a>
              </div>
              <div className="col-auto d-none d-lg-block">
                <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /></svg>

              </div>
            </div>
          </div>
        </div>

        <div className="row g-5">
          <div className="col-md-8">
            <h3 className="pb-4 mb-4 fst-italic border-bottom">
              Featured blog of the month
            </h3>
            {
              state.blogs.map((item) => {
                return (
                  <article key={item.RowKey} className="blog-post">
                    <h2 className="blog-post-title">{item.title}</h2>
                    <p className="blog-post-meta">{new Date(item.Timestamp).toLocaleString()} by <a href="#">Yash</a></p>
                    {item.content}
                  </article>
                );
              })
            }
            <hr />
            <nav aria-label="Pagination">
              <a className="btn btn-outline-primary mx-2" href="#">Older</a>
              <a className="btn btn-outline-secondary disabled" href="#" tabIndex="-1" aria-disabled="true">Newer</a>
            </nav>
            <hr />
          </div>
          <div className="col-md-4">
            <div className="position-sticky" style={{ top: "2rem" }}>
              <div className="p-4 mb-3 bg-light rounded">
                <h4 className="fst-italic">About</h4>
                <p className="mb-0">We are here to listen to your thoughts and share them with a wide audience. <br /><br />Share your thoughts and win a chance to get featured on ThoughtCircle if your post crosses 1000 upvotes.</p>
              </div>
              <div className="p-4">
                <h4 className="fst-italic">Archives</h4>
                <ol className="list-unstyled mb-0">
                  <li><a href="#">March 2022</a></li>
                  <li><a href="#">February 2022</a></li>
                  <li><a href="#">January 2022</a></li>
                  <li><a href="#">December 2021</a></li>
                  <li><a href="#">November 2021</a></li>
                  <li><a href="#">October 2021</a></li>
                  <li><a href="#">September 2021</a></li>
                  <li><a href="#">August 2021</a></li>
                  <li><a href="#">July 2021</a></li>
                  <li><a href="#">June 2021</a></li>
                  <li><a href="#">May 2021</a></li>
                  <li><a href="#">April 2021</a></li>
                </ol>
              </div>
              <div className="p-4">
                <h4 className="fst-italic">Connect with us</h4>
                <ol className="list-unstyled">
                  <li><a href="#">GitHub</a></li>
                  <li><a href="#">Twitter</a></li>
                  <li><a href="#">Facebook</a></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;