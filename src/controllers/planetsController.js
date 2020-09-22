import axios from "axios"

const varController = async function Start()
{
    const api = await returnJson('Tatooine')
    const nom = api.data.results[0].name;
    const film = api.data.results[0].films;
    console.log(api.data.results[0]);
    console.log(nom + "  " + film.length) 

}
async function SeturnJson(planetName)
{
    const res = await axios.get(`https://swapi.dev/api/planets/?search=${planetName}`);
    return res;
}