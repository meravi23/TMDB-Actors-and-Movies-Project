app.controller("moviesCtrl", function ($scope, $http, convert, movies) {

    $scope.movies = [];

    movies.getMovies().then(function (movies) {
        $scope.movies = movies;
    }, function (err) {
        $log.error(err);
    })


    // updating search results using TMDB
    $scope.updateSearchResults = function () {
        if ($scope.movieUserQuery) {

            var searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=0ddbf460202c4472e408048059e3a16d&query="
                + $scope.movieUserQuery;

            $http.get(searchUrl).then(function (res) {
                $scope.searchResults = res.data.results;
            }, function (err) {
                console.error(err);
            })
        } else {
            $scope.searchResults = [];  // create a new empty array
        }
    }

    //    Adding Movies (from TMDB key  0ddbf460202c4472e408048059e3a16d)
    //first add search box and get user's choice (id)

    $scope.addMovie = function (searchResult) {
        var movieDetailsUrl = "https://api.themoviedb.org/3/movie/" +
            searchResult.id +
            "?api_key=0ddbf460202c4472e408048059e3a16d&append_to_response=credits";

        $http.get(movieDetailsUrl).then(function (res) {
            var movie = new Movie(res.data.title,
                res.data.release_date,
                res.data.runtime,
                res.data.poster_path,
                [res.data.credits.cast[0].name, res.data.credits.cast[1].name, res.data.credits.cast[2].name],
                res.data.credits.crew[0].name);

            movies.push(movie);

        }, function (err) {
            console.error(err);
        })

        // clear search box
        $scope.movieUserQuery = "";
        $scope.searchResults = [];

    };


});

