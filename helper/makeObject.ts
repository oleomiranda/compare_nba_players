
export default async function makeObject(name1: string, name2: string, player1Data: cheerio.Root, player2Data: cheerio.Root, stats: string[], year: string) {
	try {
		var object = {
			"Player 1": {
				"Name": "name"

			},
			"Player 2": {
				"Name": "name"
			}
		}
		//Pega o nome da pagina e passa para o objeto
		object["Player 1"]["Name"] = player1Data(`#meta > div:nth-child(2) > h1 > span`).text()
		object["Player 2"]["Name"] = player2Data(`#meta > div:nth-child(2) > h1 > span`).text()

		 
		player1Data(`#per_game\\.${year}`).children().each((i, el) => {
			let index = stats.indexOf(player1Data(el).attr("data-stat")) //checa se o valor do attribute data-stat esta nos stats que o usuario passou 
			if (index > -1) {
				object['Player 1'][stats[index]] = player1Data(el).text() //se tiver adiciona no objeto 
			}
		})

		player2Data(`#per_game\\.${year}`).children().each((i, el) => {
			let index = stats.indexOf(player2Data(el).attr("data-stat"))
			if (index > -1) {
				object['Player 2'][stats[index]] = player2Data(el).text()
			}
		})
		return object

	} catch (error) {
		return  {"Status":"An error have occurred try again later"}
	}



}




