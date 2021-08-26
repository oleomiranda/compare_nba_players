import * as cheerio from "cheerio"
import axios from "axios"
import { Request, Response } from "express"
import makeObject from "../helper/makeObject"
import playerInfo from "../helper/playerInfo"
class controller {
	public async comparator(req: Request, res: Response) {
	
		var stats //evita type error na hora de passar para o regex.test 
		let name1 = req.query.name1.toString().toUpperCase()
		let name2 = req.query.name2.toString().toUpperCase()
		let year = req.query.year.toString()
		stats = req.query.stats.toString().split(",")


		if (isNaN(parseInt(year))) { //verifica se o parametro year pode ser convertido para numero
			return res.status(401).json({ "Error": "Year need to be a number" })
		}

		const regex = /[\"\>\<\\\|\.\/\]\[\{\}\!\@\#\$\%\"\`]/i //regex para evitar caracteres especiais
		if (regex.test(name1) == true || regex.test(name2) == true || regex.test(year) == true || regex.test(stats) == true) {
			return res.status(401).json({ "Error": "Some input is invalid" })
		}
		//passa nome e ano para a funçao que faz request para o site e retorna o resultado do axios 
		let player1Data = await playerInfo(name1, year)
		let player2Data = await playerInfo(name2, year)

		//verifica se algum dos nomes não foi encontrado e retorna qual não foi encontrado
		if (player1Data.data == undefined) {
			return res.status(404).json({ "Error": `The player ${name1} could not be found or doesn't have stats for this year` })
		}
		if (player2Data.data == undefined) {
			return res.status(404).json({ "Error": `The player ${name2} could not be found or doesn't have stats for this year` })
		}
		

		let player1 = cheerio.load(player1Data.data) 
		let player2 = cheerio.load(player2Data.data)
		
		//passa os dados para criar o json que sera retornado para o usuario
		makeObject(name1, name2, player1, player2, stats, year)
			.then((Object) => res.status(200).json(Object))
			.catch((err) => res.status(500).json(err))

	
		
	};

	public index(req: Request, res: Response) {
		res.sendFile("./index.html", { root: "./src" })
	}
}


export default new controller()