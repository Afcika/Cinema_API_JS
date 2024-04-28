const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
// https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=batman&page=3

const main= document.getElementById("main");
const SubSearch= document.getElementById("SubSearch");
const search= document.getElementById("search");
const home = document.getElementById("home");
let subSearchClicked = false;
let newsearchapi= '';

let currentPage = 1; 
let SearchPage = 1; 
getMovies(APIURL+1);




async function getMovies(url){
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);
}


function showMovies(movies){
  main.innerHTML = '';
  movies.forEach(movie => {
    
    const {poster_path,title,vote_average,release_date,vote_count,overview,} = movie; 

    const movieEl = document.createElement("div");
    movieEl.classList.add("moviecard");
    movieEl.innerHTML = `
  
    <img src="${IMGPATH +poster_path}" alt="${title}">
    <div class="apibox">

      <div><h3>${title}</h3> <span class="rate"><span class="${getclassbyrate(vote_average)}">${vote_average.toFixed(1)}</span>/10</span> </div>
      <div class="date"><h3>Release Date</h3> <span>${release_date}</span> </div>
      <div ><h3>Votes</h3> <span>${vote_count}</span> </div>
    </div>
    <div class="overview">
    <h3>Overview:</h3>
    ${overview}
 </div>
    
    
    `


    main.appendChild(movieEl);
   });
  
}

function getclassbyrate(vote){
  if (vote >= 8){
    return 'green';
  }
  else if( vote >= 5){
    return 'orange';
  }
  else{
    return 'red'
  }

}



  SubSearch.addEventListener('click', (e)=>{
    e.preventDefault();

    const searchMovie = search.value;
    

    if(searchMovie) {
      newsearchapi = SEARCHAPI+searchMovie+'&page=';
      getMovies(newsearchapi+SearchPage);
      search.value =''
      subSearchClicked = true;
    }

  })

  home.addEventListener('click', (e)=>{
    e.preventDefault();

     currentPage = 1; 
      SearchPage = 1; 

      subSearchClicked = false;
      getMovies(APIURL + currentPage);

  })
   

function pageScroll(move){  

  if (subSearchClicked) {
    let SeachNewPage= '';
    if( move === 'previous' && SearchPage === 1){
      SearchPage= 2;
      SeachNewPage=newsearchapi+SearchPage
      getMovies(SeachNewPage);


    }

    main.innerHTML = '';
   
    if(move === 'next'){
    SearchPage++;
    SeachNewPage = newsearchapi +SearchPage; 
  
    getMovies(SeachNewPage);
  }
  else if(move === 'previous'){
    SearchPage--;
    SeachNewPage = newsearchapi +SearchPage;
    getMovies(SeachNewPage);
  }

  }


  else{
    let newapi =''
    if( move === 'previous' && currentPage ===1){
      currentPage= 2;
      newapi = APIURL+currentPage;
      getMovies(newapi);
      
    }
    main.innerHTML = '';

    if(move === 'next'){ 
      currentPage++;
      newapi = APIURL+currentPage;
    }
    else if(move === 'previous'){
      currentPage--;
      newapi = APIURL+currentPage;
    }
   getMovies(newapi);
  }





}