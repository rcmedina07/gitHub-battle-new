import axios from 'axios'

const id = "CLIENT_ID"
const sec = "SECRET"
const param = "?client_id=" + id + "&client_secret=" + sec;

const getProfile = (username) => {
  return axios.get('https://api.github.com/users/' + username + param)
    .then((user) => {
      return user.data;
    });
}

const getRepos = (username) => {
  return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100')
}

const getTotalStarts = (repos) => {
  return repos.data.reduce((prev, current) => {
    return prev + current.stargazers_count;
  }, 0)
}

const calculateScore = (profile, repos) => {
  let followers = profile.followers;
  let totalStars = getTotalStarts(repos);
  return (followers * 3) + totalStars;
}

const handleError = (error) => {
  console.warn(error);
  return null;
}

const getUserData = (player) => {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    let profile = data[0];
    let repos = data[1];
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

const sortPlayers = (players) => {
  return players.sort((a, b) => {
    return b.score - a.score;
  });
}

const api = {
  battle: (players) => {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularrepos: (language) => {
    const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
      .then((respose) => {
        return respose.data.items;
      })
  }
}


export default api;