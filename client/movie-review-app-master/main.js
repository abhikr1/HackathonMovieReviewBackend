const API_KEY = 'c4532ec243ac17d342a9ade8e64582b1';
const endpoint = 'https://api.themoviedb.org/3/search/movie?api_key=c4532ec243ac17d342a9ade8e64582b1';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=c4532ec243ac17d342a9ade8e64582b1&page=1';
const movieContainer = document.querySelector('#container');
const movieInfoBox = document.querySelector('#container1');
console.log(window.location.href);

function displayMovie(movies) {
    movieContainer.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <div class="movie-group">
            <a onclick="movieSelected('${movie.id}')"  href="#"> <img src = ${
            IMG_URL + movie.poster_path
        } data_movie_id = ${movie.id}/></a>
            
                <div class="movie-info">
                <h3>${title}</h3>
                
                <span class="${vote_average}">${vote_average}</span>
                </div>
               
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
            </div>
        `;
        movieContainer.appendChild(movieElement);
    });
}

function getMovies() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.results);
            displayMovie(data.results);
        })
        .catch((error) => {
            console.log(error);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location.href = 'movieInfo.html';
    return false;
}

function getaveragerating(title) {
    const request = new Request(`http://localhost:3000/api/reviews/${title}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        mode: 'cors',
    });
    const r = fetch(request)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.ratingavg === 0) {
                document.getElementsByClassName('rating')[0].innerHTML = `Avergae Rating : No Ratings Yet!`;
            } else {
                document.getElementsByClassName('rating')[0].innerHTML = `Avergae Rating : ${data.ratingavg}`;
            }
            if (data.reviewcount === 0) {
                document.getElementsByClassName('count')[0].innerHTML = `Rating Count : No Users have rated this movie`;
            } else {
                document.getElementsByClassName('count')[0].innerHTML = `Rating Count : ${data.reviewcount}`;
            }
        });
}

function getMovie() {
    const movieId = sessionStorage.getItem('movieId');
    console.log('hi there');
    console.log(movieId);
    movieInfoBox.innerHTML = '';
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie1');
    moviesInfo.forEach((movie) => {
        console.log('inarrayfunction');
        if (movie.id === movieId) {
            movieElement.innerHTML = `
        <div class="movie-group1">
        <div class ="title-bar">
        <h3>${movie.Title}</h3>
        <div class='span-d'>
        <span>${movie.Runtime}</span>
        <span>|</span>   
        <span>${movie.Genre}</span>
        <span>|</span> 
        <span>${movie.Released}(${movie.Country})</span>
        </div>
        </div>
        <div class ="img"><img src = ${IMG_URL + movie.poster_path} data_movie_id = ${movie.id}/></div>
        <div class="movie-info1">
        <h3>Storyline</h3>
        <h4>${movie.Plot}
        <hr>
        </h4>
        <div>
       
        <h4>Director: ${movie.Director}</h4>
        <h4>Writer: ${movie.Writer}</h4>
        <h4>Actors: ${movie.Actors}</h4>
        <hr>
        </div>
        <div>
        <h3>Details</h3>
        <h4>Country: ${movie.Country}</h4>
        <h4>Language: ${movie.Language}</h4>
        <h4>Released Date: ${movie.Released}</h4>
        <h4>Runtime: ${movie.Runtime}</h4>
        </div>   
        <h4 class = "rating">Average Rating: </h4>
        <h4 class = "count">Rating Count: </h4> 
        <a onclick= "return openForm()" href="#"><h4>Review this title<h4></a>   
        
      
        </div>
        </div>
        `;
            movieInfoBox.appendChild(movieElement);
            getaveragerating(movie.Title);
            localStorage.setItem('moviename', movie.Title);
        }
    });
}

function openForm() {
    document.getElementById('myForm').style.display = 'block';
}

function closeForm() {
    document.getElementById('myForm').style.display = 'none';
}
const moviesInfo = [
    {
        id: '791373',
        poster_path: 'tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg',
        Title: "Zack Snyder's Justice League",
        Year: '2021',
        Rated: 'R',
        Released: '18 Mar 2021',
        Runtime: '240 min',
        Genre: 'Action, Adventure, Fantasy, Sci-Fi',
        Director: 'Zack Snyder',
        Writer:
            'Chris Terrio (screenplay by), Zack Snyder (story by), Chris Terrio (story by), Will Beall (story by), Jerry Siegel (Superman created by), Joe Shuster (Superman created by)',
        Actors: 'Jared Leto, Henry Cavill, Amber Heard, Gal Gadot',
        Plot:
            "Zack Snyder's definitive director's cut of Justice League. Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
        Language: 'English',
        Country: 'USA',
        Awards: 'N/A',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BYjI3NDg0ZTEtMDEwYS00YWMyLThjYjktMTNlM2NmYjc1OGRiXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg',
        Ratings: [],
        Metascore: 'N/A',
        imdbRating: 'N/A',
        imdbVotes: 'N/A',
        imdbID: 'tt12361974',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '19404',
        poster_path: '2CAL2433ZeIihfX1Hb2139CX0pW.jpg',
        Title: 'Dilwale Dulhania Le Jayenge',
        Year: '1995',
        Rated: 'Not Rated',
        Released: '20 Oct 1995',
        Runtime: '181 min',
        Genre: 'Drama, Romance',
        Director: 'Aditya Chopra',
        Writer:
            'Aditya Chopra (dialogue), Aditya Chopra (screenplay), Aditya Chopra (story), Javed Siddiqui (dialogue)',
        Actors: 'Shah Rukh Khan, Kajol, Amrish Puri, Farida Jalal',
        Plot:
            "When Raj meets Simran in Europe, it isn't love at first sight but when Simran moves to India for an arranged marriage, love makes its presence felt.",
        Language: 'Hindi',
        Country: 'India',
        Awards: '15 wins & 3 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BOTViNjQ3MzctOGU2MC00NGY4LWIyZWYtYzkzMmIzMzgwZTIyXkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.1/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '95%',
            },
        ],
        Metascore: 'N/A',
        imdbRating: '8.1',
        imdbVotes: '63,702',
        imdbID: 'tt0112870',
        Type: 'movie',
        DVD: '23 Mar 2017',
        BoxOffice: 'N/A',
        Production: 'Yash Raj Films',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '278',
        poster_path: 'q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
        Title: 'The Shawshank Redemption',
        Year: '1994',
        Rated: 'R',
        Released: '14 Oct 1994',
        Runtime: '142 min',
        Genre: 'Drama',
        Director: 'Frank Darabont',
        Writer: 'Stephen King (short story "Rita Hayworth and Shawshank Redemption"), Frank Darabont (screenplay)',
        Actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
        Plot:
            'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        Language: 'English',
        Country: 'USA',
        Awards: 'Nominated for 7 Oscars. Another 21 wins & 36 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '9.3/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '91%',
            },
            {
                Source: 'Metacritic',
                Value: '80/100',
            },
        ],
        Metascore: '80',
        imdbRating: '9.3',
        imdbVotes: '2,354,197',
        imdbID: 'tt0111161',
        Type: 'movie',
        DVD: '15 Aug 2008',
        BoxOffice: '$28,699,976',
        Production: 'Columbia Pictures, Castle Rock Entertainment',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '696374',
        poster_path: 'oyG9TL7FcRP4EZ9Vid6uKzwdndz.jpg',
        Title: "Gabriel's Inferno: Part One",
        Year: '2020',
        Rated: 'Not Rated',
        Released: '29 May 2020',
        Runtime: '124 min',
        Genre: 'Romance',
        Director: 'Tosca Musk',
        Writer: 'Mary Pocrnic (screenplay)',
        Actors: 'Melanie Zanetti, Giulio Berruti, James Andrew Fraser, Margaux Brooke',
        Plot:
            "An intriguing exploration of seduction, forbidden love, and redemption, a captivating and passionate tale of one man's escape from his own personal hell as he tries to earn the impossible: forgiveness and love.",
        Language: 'English',
        Country: 'USA',
        Awards: 'N/A',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BZTEwZDYwZDgtOWFiNi00YThhLTk4MjMtNDg4ZmJjYTU0M2RiXkEyXkFqcGdeQXVyMTA4ODQyNDYx._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '6.2/10',
            },
        ],
        Metascore: 'N/A',
        imdbRating: '6.2',
        imdbVotes: '2,241',
        imdbID: 'tt11316854',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '724089',
        poster_path: 'pci1ArYW7oJ2eyTo2NMYEKHHiCP.jpg',
        Title: "Gabriel's Inferno: Part Two",
        Year: '2020',
        Rated: 'TV-14',
        Released: '31 Jul 2020',
        Runtime: '106 min',
        Genre: 'Romance',
        Director: 'Tosca Musk',
        Writer: 'Mary Pocrnic (screenplay)',
        Actors: 'Giulio Berruti, James Andrew Fraser, Rhett Wellington Ramirez, Melanie Zanetti',
        Plot:
            "Professor Emerson learns the truth about Julia but his realization comes too late. Julia is done waiting for him to remember her and wants nothing more to do with him. Can Gabriel win back her heart before she finds love in another's arms?",
        Language: 'English',
        Country: 'USA',
        Awards: 'N/A',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BMzk3NzEwMWItYmVhMS00ODRiLWEyNDUtOTNmZTBhMDNjMjFmXkEyXkFqcGdeQXVyMTY1NjM1Nzc@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '6.7/10',
            },
        ],
        Metascore: 'N/A',
        imdbRating: '6.7',
        imdbVotes: '323',
        imdbID: 'tt13535454',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '761053',
        poster_path: 'fYtHxTxlhzD4QWfEbrC1rypysSD.jpg',
        Title: "Gabriel's Inferno: Part Three",
        Year: '2020',
        Rated: 'R',
        Released: '19 Nov 2020',
        Runtime: '102 min',
        Genre: 'Romance',
        Director: 'Tosca Musk',
        Writer: 'Mary Pocrnic (screenplay)',
        Actors: 'Melanie Zanetti, Giulio Berruti, Rhett Wellington, James Andrew Fraser',
        Plot:
            "Someone dark returns from Julia's past with bad intentions. Gabriel has secrets he needs to share, but worries that he'll lose everything if he does. Will their relationship weather the test of secrets revealed?",
        Language: 'English',
        Country: 'USA',
        Awards: 'N/A',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BNjJmNTZjZTUtYzllMS00NzBhLTlhMjgtNTkxNGQ4ZjI0YzI4XkEyXkFqcGdeQXVyMTY1NjM1Nzc@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '6.8/10',
            },
        ],
        Metascore: 'N/A',
        imdbRating: '6.8',
        imdbVotes: '275',
        imdbID: 'tt13535456',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '238',
        poster_path: '3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        Title: 'The Godfather',
        Year: '1972',
        Rated: 'R',
        Released: '24 Mar 1972',
        Runtime: '175 min',
        Genre: 'Crime, Drama',
        Director: 'Francis Ford Coppola',
        Writer: 'Mario Puzo (screenplay by), Francis Ford Coppola (screenplay by), Mario Puzo (based on the novel by)',
        Actors: 'Marlon Brando, Al Pacino, James Caan, Richard S. Castellano',
        Plot:
            "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
        Language: 'English, Italian, Latin',
        Country: 'USA',
        Awards: 'Won 3 Oscars. Another 26 wins & 30 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '9.2/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '98%',
            },
            {
                Source: 'Metacritic',
                Value: '100/100',
            },
        ],
        Metascore: '100',
        imdbRating: '9.2',
        imdbVotes: '1,635,913',
        imdbID: 'tt0068646',
        Type: 'movie',
        DVD: '01 Aug 2013',
        BoxOffice: '$134,966,411',
        Production: 'Paramount Pictures',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '441130',
        poster_path: 'ehAKuE48okTuonq6TpsNQj8vFTC.jpg',
        Title: 'Wolfwalkers',
        Year: '2020',
        Rated: 'PG',
        Released: '13 Nov 2020',
        Runtime: '103 min',
        Genre: 'Animation, Adventure, Family, Fantasy',
        Director: 'Tomm Moore, Ross Stewart',
        Writer:
            'Will Collins (screenplay), Tomm Moore (story), Ross Stewart (story), Jericca Cleland (story and script consultant)',
        Actors: 'Honor Kneafsey, Eva Whittaker, Sean Bean, Simon McBurney',
        Plot:
            'A young apprentice hunter and her father journey to Ireland to help wipe out the last wolf pack. But everything changes when she befriends a free-spirited girl from a mysterious tribe rumored to transform into wolves by night.',
        Language: 'English',
        Country: 'Ireland, UK, France',
        Awards: 'Nominated for 1 Oscar. Another 20 wins & 62 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BNTA4MWQ4NGUtOGQ0MS00M2QyLWE5MDItZWM2YzA0ZDgxZTA2XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.1/10',
            },
            {
                Source: 'Metacritic',
                Value: '87/100',
            },
        ],
        Metascore: '87',
        imdbRating: '8.1',
        imdbVotes: '15,438',
        imdbID: 'tt5198068',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '424',
        poster_path: 'sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
        Title: "Schindler's List",
        Year: '1993',
        Rated: 'R',
        Released: '04 Feb 1994',
        Runtime: '195 min',
        Genre: 'Biography, Drama, History',
        Director: 'Steven Spielberg',
        Writer: 'Thomas Keneally (book), Steven Zaillian (screenplay)',
        Actors: 'Liam Neeson, Ben Kingsley, Ralph Fiennes, Caroline Goodall',
        Plot:
            'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
        Language: 'English, Hebrew, German, Polish, Latin',
        Country: 'USA',
        Awards: 'Won 7 Oscars. Another 83 wins & 49 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.9/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '97%',
            },
            {
                Source: 'Metacritic',
                Value: '94/100',
            },
        ],
        Metascore: '94',
        imdbRating: '8.9',
        imdbVotes: '1,222,642',
        imdbID: 'tt0108052',
        Type: 'movie',
        DVD: '05 Mar 2013',
        BoxOffice: '$96,898,818',
        Production: 'Universal Pictures, Amblin Entertainment',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '372058',
        poster_path: 'q719jXXEzOoYaps6babgKnONONX.jpg',
        Title: 'Your Name.',
        Year: '2016',
        Rated: 'PG',
        Released: '07 Apr 2017',
        Runtime: '106 min',
        Genre: 'Animation, Drama, Fantasy, Romance',
        Director: 'Makoto Shinkai',
        Writer: 'Makoto Shinkai (based on his novel), Makoto Shinkai (screenplay), Clark Cheng (english script)',
        Actors: 'Ryûnosuke Kamiki, Mone Kamishiraishi, Ryô Narita, Aoi Yûki',
        Plot:
            'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?',
        Language: 'Japanese',
        Country: 'Japan',
        Awards: '16 wins & 25 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.4/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '98%',
            },
            {
                Source: 'Metacritic',
                Value: '79/100',
            },
        ],
        Metascore: '79',
        imdbRating: '8.4',
        imdbVotes: '197,791',
        imdbID: 'tt5311514',
        Type: 'movie',
        DVD: '31 Jan 2018',
        BoxOffice: '$5,017,246',
        Production: 'Toho Company Ltd.',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '240',
        poster_path: 'hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
        Title: 'The Godfather: Part II',
        Year: '1974',
        Rated: 'R',
        Released: '18 Dec 1974',
        Runtime: '202 min',
        Genre: 'Crime, Drama',
        Director: 'Francis Ford Coppola',
        Writer: 'Francis Ford Coppola (screenplay by), Mario Puzo (screenplay by), Mario Puzo (based on the novel by)',
        Actors: 'Al Pacino, Robert Duvall, Diane Keaton, Robert De Niro',
        Plot:
            'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
        Language: 'English, Italian, Spanish, Latin, Sicilian',
        Country: 'USA',
        Awards: 'Won 6 Oscars. Another 11 wins & 20 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '9.0/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '98%',
            },
            {
                Source: 'Metacritic',
                Value: '90/100',
            },
        ],
        Metascore: '90',
        imdbRating: '9.0',
        imdbVotes: '1,139,838',
        imdbID: 'tt0071562',
        Type: 'movie',
        DVD: '01 Aug 2013',
        BoxOffice: '$47,834,595',
        Production: 'Paramount Pictures, Coppola Company',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '572154',
        poster_path: '7Ai8vNEv4zEveh12JViGikoVPVV.jpg',
        Title: 'Rascal Does Not Dream of Bunny Girl Senpai The Movie',
        Year: '2019',
        Rated: 'N/A',
        Released: '02 Oct 2019',
        Runtime: '89 min',
        Genre: 'Animation, Drama, Family, Fantasy, Mystery, Romance',
        Director: 'Sôichi Masui',
        Writer: 'Kamoshida Hajime (light novel), Masahiro Yokotani (screenplay)',
        Actors: 'Kaito Ishikawa, Asami Seto, Inori Minase, Nao Tôyama',
        Plot:
            "A high school student's blissful days with his girlfriend are interrupted when his first crush returns in two forms.",
        Language: 'Japanese',
        Country: 'Japan',
        Awards: 'N/A',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BYjJmZGUyYmItNzBmNi00MTc0LTljNmUtNWU0NGYxZjVmYTUxXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.1/10',
            },
        ],
        Metascore: 'N/A',
        imdbRating: '8.1',
        imdbVotes: '2,031',
        imdbID: 'tt10472884',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '129',
        poster_path: '39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
        Title: 'Spirited Away',
        Year: '2001',
        Rated: 'PG',
        Released: '28 Mar 2003',
        Runtime: '125 min',
        Genre: 'Animation, Adventure, Family, Fantasy, Mystery',
        Director: 'Hayao Miyazaki',
        Writer: 'Hayao Miyazaki',
        Actors: 'Rumi Hiiragi, Miyu Irino, Mari Natsuki, Takashi Naitô',
        Plot:
            "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
        Language: 'Japanese',
        Country: 'Japan, USA',
        Awards: 'Won 1 Oscar. Another 57 wins & 31 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.6/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '97%',
            },
            {
                Source: 'Metacritic',
                Value: '96/100',
            },
        ],
        Metascore: '96',
        imdbRating: '8.6',
        imdbVotes: '659,506',
        imdbID: 'tt0245429',
        Type: 'movie',
        DVD: '19 Dec 2019',
        BoxOffice: '$13,750,644',
        Production: 'Walt Disney Pictures, Tokuma Shoten, Studio Ghibli',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '496243',
        poster_path: '7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
        Title: 'Parasite',
        Year: '2019',
        Rated: 'R',
        Released: '08 Nov 2019',
        Runtime: '132 min',
        Genre: 'Comedy, Drama, Thriller',
        Director: 'Bong Joon Ho',
        Writer: 'Bong Joon Ho (story by), Bong Joon Ho (screenplay by), Jin-won Han (screenplay by)',
        Actors: 'Kang-ho Song, Lee Sun-kyun, Yeo-jeong Cho, Choi Woo-sik',
        Plot:
            'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
        Language: 'Korean, English',
        Country: 'South Korea',
        Awards: 'Won 4 Oscars. Another 296 wins & 262 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.6/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '98%',
            },
            {
                Source: 'Metacritic',
                Value: '96/100',
            },
        ],
        Metascore: '96',
        imdbRating: '8.6',
        imdbVotes: '566,337',
        imdbID: 'tt6751668',
        Type: 'movie',
        DVD: '11 Oct 2019',
        BoxOffice: '$53,369,749',
        Production: 'CJ Entertainment, TMS Entertainment',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '556574',
        poster_path: 'h1B7tW0t399VDjAcWJh8m87469b.jpg',
        Title: 'Hamilton',
        Year: '2020',
        Rated: 'PG-13',
        Released: '03 Jul 2020',
        Runtime: '160 min',
        Genre: 'Biography, Drama, History, Musical',
        Director: 'Thomas Kail',
        Writer: 'Lin-Manuel Miranda (book), Ron Chernow (inspired by the book Alexander Hamilton by)',
        Actors: 'Daveed Diggs, Renée Elise Goldsberry, Jonathan Groff, Chris Jackson',
        Plot:
            "The real life of one of America's foremost founding fathers and first Secretary of the Treasury, Alexander Hamilton. Captured live on Broadway from the Richard Rodgers Theater with the original Broadway cast.",
        Language: 'English',
        Country: 'USA',
        Awards: 'Nominated for 2 Golden Globes. Another 3 wins & 14 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.5/10',
            },
            {
                Source: 'Metacritic',
                Value: '90/100',
            },
        ],
        Metascore: '90',
        imdbRating: '8.5',
        imdbVotes: '57,007',
        imdbID: 'tt8503618',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '644479',
        poster_path: 'riAooJrFvVhotyaOgoI0WR7okSe.jpg',
        Title: 'Dedicada a mi Ex',
        Year: '2019',
        Rated: 'N/A',
        Released: '07 Nov 2019',
        Runtime: '94 min',
        Genre: 'Comedy',
        Director: 'Jorge Ulloa',
        Writer: 'Julio Pañi, Diego Ulloa, Jorge Ulloa, Nataly Valencia',
        Actors: 'Mariana Treviño, Biassini Segura, Carlos Alcántara, Erika Toa Russo',
        Plot:
            "A band of misfits enter a music video contest in order to win a cash prize, but don't realize they actually have to be good at playing music.",
        Language: 'Spanish',
        Country: 'Colombia, Ecuador',
        Awards: 'N/A',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BMzlkNzE2YTctYzk4ZC00ZjMwLTk3YjgtNzA2ZWRhNzczMjQ1XkEyXkFqcGdeQXVyMTAyMDQ2ODcz._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '7.4/10',
            },
        ],
        Metascore: 'N/A',
        imdbRating: '7.4',
        imdbVotes: '417',
        imdbID: 'tt5869370',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '497',
        poster_path: 'velWPhVMQeQKcxggNEU8YmIo52R.jpg',
        Title: 'The Green Mile',
        Year: '1999',
        Rated: 'R',
        Released: '10 Dec 1999',
        Runtime: '189 min',
        Genre: 'Crime, Drama, Fantasy, Mystery',
        Director: 'Frank Darabont',
        Writer: 'Stephen King (novel), Frank Darabont (screenplay)',
        Actors: 'Tom Hanks, David Morse, Bonnie Hunt, Michael Clarke Duncan',
        Plot:
            'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
        Language: 'English, French',
        Country: 'USA',
        Awards: 'Nominated for 4 Oscars. Another 15 wins & 33 nominations.',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.6/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '78%',
            },
            {
                Source: 'Metacritic',
                Value: '61/100',
            },
        ],
        Metascore: '61',
        imdbRating: '8.6',
        imdbVotes: '1,158,803',
        imdbID: 'tt0120689',
        Type: 'movie',
        DVD: '15 Aug 2008',
        BoxOffice: '$136,801,374',
        Production: 'Castle Rock Entertainment, Darkwoods Productions, Warner Brothers',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '527774',
        poster_path: 'lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg',
        Title: 'Raya and the Last Dragon',
        Year: '2021',
        Rated: 'PG',
        Released: '05 Mar 2021',
        Runtime: 'N/A',
        Genre: 'Animation, Action, Adventure, Comedy, Family, Fantasy',
        Director: 'Don Hall, Carlos López Estrada, John Ripa(co-director), Paul Briggs(co-director)',
        Writer:
            'Qui Nguyen (screenplay by), Adele Lim (screenplay by), Paul Briggs (story by), Don Hall (story by), Adele Lim (story by), Carlos López Estrada (story by), Kiel Murray (story by), Qui Nguyen (story by), John Ripa (story by), Dean Wellins (story by)',
        Actors: 'Kelly Marie Tran, Awkwafina, Izaac Wang, Gemma Chan',
        Plot:
            'In a realm known as Kumandra, a re-imagined Earth inhabited by an ancient civilization, a warrior named Raya is determined to find the last dragon.',
        Language: 'English',
        Country: 'USA',
        Awards: 'N/A',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BZWNiOTc4NGItNGY4YS00ZGNkLThkOWEtMDE2ODcxODEwNjkwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
        Ratings: [],
        Metascore: 'N/A',
        imdbRating: 'N/A',
        imdbVotes: 'N/A',
        imdbID: 'tt5109280',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '680',
        poster_path: 'plnlrtBUULT0rh3Xsjmpubiso3L.jpg',
        Title: 'Pulp Fiction',
        Year: '1994',
        Rated: 'R',
        Released: '14 Oct 1994',
        Runtime: '154 min',
        Genre: 'Crime, Drama',
        Director: 'Quentin Tarantino',
        Writer: 'Quentin Tarantino (stories), Roger Avary (stories), Quentin Tarantino',
        Actors: 'Tim Roth, Amanda Plummer, Laura Lovelace, John Travolta',
        Plot:
            'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        Language: 'English, Spanish, French',
        Country: 'USA',
        Awards: 'Won 1 Oscar. Another 69 wins & 75 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.9/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '92%',
            },
            {
                Source: 'Metacritic',
                Value: '94/100',
            },
        ],
        Metascore: '94',
        imdbRating: '8.9',
        imdbVotes: '1,841,574',
        imdbID: 'tt0110912',
        Type: 'movie',
        DVD: '21 Apr 2016',
        BoxOffice: '$107,928,762',
        Production: 'Miramax Films, A Band Apart, Jersey Films',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '389',
        poster_path: 'wh0f80G6GZvYBNiYmvqFngt3IYq.jpg',
        Title: '12 Angry Men',
        Year: '1957',
        Rated: 'Approved',
        Released: '10 Apr 1957',
        Runtime: '96 min',
        Genre: 'Crime, Drama',
        Director: 'Sidney Lumet',
        Writer: 'Reginald Rose (story), Reginald Rose (screenplay)',
        Actors: 'Martin Balsam, John Fiedler, Lee J. Cobb, E.G. Marshall',
        Plot:
            'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
        Language: 'English',
        Country: 'USA',
        Awards: 'Nominated for 3 Oscars. Another 17 wins & 10 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '9.0/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '100%',
            },
            {
                Source: 'Metacritic',
                Value: '96/100',
            },
        ],
        Metascore: '96',
        imdbRating: '9.0',
        imdbVotes: '693,477',
        imdbID: 'tt0050083',
        Type: 'movie',
        DVD: 'N/A',
        BoxOffice: 'N/A',
        Production: 'Orion-Nova Pictures',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '13',
        poster_path: 'h5J4W4veyxMXDMjeNxZI46TsHOb.jpg',
        Title: 'Forrest Gump',
        Year: '1994',
        Rated: 'PG-13',
        Released: '06 Jul 1994',
        Runtime: '142 min',
        Genre: 'Drama, Romance',
        Director: 'Robert Zemeckis',
        Writer: 'Winston Groom (novel), Eric Roth (screenplay)',
        Actors: 'Tom Hanks, Rebecca Williams, Sally Field, Michael Conner Humphreys',
        Plot:
            'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
        Language: 'English',
        Country: 'USA',
        Awards: 'Won 6 Oscars. Another 44 wins & 75 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.8/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '71%',
            },
            {
                Source: 'Metacritic',
                Value: '82/100',
            },
        ],
        Metascore: '82',
        imdbRating: '8.8',
        imdbVotes: '1,826,575',
        imdbID: 'tt0109830',
        Type: 'movie',
        DVD: '01 Aug 2013',
        BoxOffice: '$330,455,270',
        Production: 'Paramount Pictures',
        Website: 'N/A',
        Response: 'True',
    },
    {
        id: '13',
        poster_path: 'h5J4W4veyxMXDMjeNxZI46TsHOb.jpg',
        Title: 'Forrest Gump',
        Year: '1994',
        Rated: 'PG-13',
        Released: '06 Jul 1994',
        Runtime: '142 min',
        Genre: 'Drama, Romance',
        Director: 'Robert Zemeckis',
        Writer: 'Winston Groom (novel), Eric Roth (screenplay)',
        Actors: 'Tom Hanks, Rebecca Williams, Sally Field, Michael Conner Humphreys',
        Plot:
            'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
        Language: 'English',
        Country: 'USA',
        Awards: 'Won 6 Oscars. Another 44 wins & 75 nominations.',
        Poster:
            'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        Ratings: [
            {
                Source: 'Internet Movie Database',
                Value: '8.8/10',
            },
            {
                Source: 'Rotten Tomatoes',
                Value: '71%',
            },
            {
                Source: 'Metacritic',
                Value: '82/100',
            },
        ],
        Metascore: '82',
        imdbRating: '8.8',
        imdbVotes: '1,826,575',
        imdbID: 'tt0109830',
        Type: 'movie',
        DVD: '01 Aug 2013',
        BoxOffice: '$330,455,270',
        Production: 'Paramount Pictures',
        Website: 'N/A',
        Response: 'True',
    }
];

// const forElement = document.querySelector("#form1");
// formElement.addEventListener('submit', e => {
//   e.preventDefault();
//   const formData = new FormData(formElement);
//   const request = new Request('http://localhost:3000/api/reviews/myratings', {
//       method: 'POST',
//       headers: new Headers({
//           'Content-Type': 'application/json'
//       }),
//       body: formData
//   });

//   fetch(request).then(res => {res.send()});
// });

// //sign up
// // {
// //     "email" : "anonymous123@gmail.com",
// //     "password" : "123",
// //     "firstName" : "Abhinav",
// //     "lastName" : "Kumar"
// // }
// const formElement = document.querySelector("#form2");
// formElement.addEventListener('submit', e => {
//   e.preventDefault();
//   const formData = new FormData(formElement);
//   const request = new Request('http://localhost:3000/api/users/', {
//       method: 'POST',
//       headers: new Headers({
//           'Content-Type': 'application/json'
//       }),
//       body: formData
//   });

//   fetch(request).then(res => {res.send()});
// });

// //login
// // {
// //     "email" : "anonymous123@gmail.com",
// //     "password" : "123"
// // }
// const formElement = document.querySelector("#form3");
// formElement.addEventListener('submit', e => {
//   e.preventDefault();
//   const formData = new FormData(formElement);
//   const request = new Request('http://localhost:3000/api/users/', {
//       method: 'POST',
//       headers: new Headers({
//           'Content-Type': 'application/json'
//       }),
//       body: formData
//   });

//   fetch(request).then(res => {res.send()});
// });