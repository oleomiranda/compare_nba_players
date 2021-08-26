import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";


export default async function playerData(name: string, year: string): Promise<any> {
	try {
		let playerPage = await axios(`https://www.basketball-reference.com/search/search.fcgi?search=${name}`)
		let $ = cheerio.load(playerPage.data)
		let result = $(`#per_game\\.${year}`).html() //Se o link levar direto para pagina do jogador verifica se existe o id com o ano passado

		if (result == null) {
			let playerPageLink = $(`#players > div.search-item > div.search-item-name > strong > a`).attr('href') // se nao for direto para a pagina verifica se existe um link 
			playerPage = await axios(`https://www.basketball-reference.com${playerPageLink}`)
			
		}

		return playerPage //retorna a variavel com resultado da pesquisa
	} catch (error) {
		return {"Status":"An error have occurred try again later"}
	}

}



