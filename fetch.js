
const SEARCH = document.querySelector('#search')
const SEARCH_BTN = document.querySelector('#search_btn')
SEARCH_BTN.addEventListener('click',function(){
   getMovie()
    .then(responce => responce.json())
    .then(DATA => render(DATA))
    .catch(err => console.log(err))
})

function getMovie(){
    const URL_movie = `http://www.omdbapi.com/?s=${SEARCH.value}&apikey=afe587fa`
    return fetch(URL_movie)
}



function render(list){
    document.querySelector('.moovie_block').innerHTML = ''
    for(let i = 0;i<list.Search.length;i++){
        document.querySelector('.moovie_block').innerHTML += ` <div class='moovie' id='${list.Search[i].imdbID}'>
        <img src="${list.Search[i].Poster}" alt="">
        <div id="moovie_name">${list.Search[i].Title}</div>
        <div id="moovie_type">${list.Search[i].Type}</div>
        <div id="moovie_year">${list.Search[i].Year}</div>
        <button class="more_details">More details</button>
    </div>`
    }

    $('.more_details').click(function(event){
        details($(event.target).parent()[0].id)
    });
}

function details(id){
    $('.details').css('display','flex')
    $('.details').css('cursor','pointer')
    $('.details').click(function(){
        $('.details').css('display','none')
        $('.details').off()
    })

    document.querySelector('#detail-poster').src = '';

        getDetail(id)  
            .then(responce => responce.json())
            .then(DATA => renderDetail(DATA))
            .catch(err => console.log(err))

        function renderDetail(DATA){
            document.querySelector('#detail-poster').src = `${DATA.Poster}`;
            document.querySelector('.language').textContent = `${DATA.Language}`
            document.querySelector('.discribe').textContent = `${DATA.Plot}`
            document.querySelector('.box-office').textContent = `${DATA.BoxOffice}`
            document.querySelector('.detail_title').textContent = `${DATA.Title}`
        }

}

function getDetail(id){
    const URL = `http://www.omdbapi.com/?i=${id}&apikey=afe587fa`
    return fetch(URL)
}



window.addEventListener("scroll", dealWithScrolling, false);
 
function dealWithScrolling(e) {

    $('.details').css('top',`${window.pageYOffset}px`)
}


