// import { monsterList } from './data/monsterList';
// import { Monster } from './modles/monster';
// import { MonsterBuilder } from './modles/builders/monsterBuilder';
// export const MonsterLocator = {
//
// 	findMonsterById: function(id) {
// 		const foundMonster = monsterList.find(monster => {
// 			return id === monster.id;
// 		});
// 		if (foundMonster) {
// 			return MonsterBuilder.buildMonster(foundMonster);
// 		} else {
// 			throw new Error('monster not found');
// 		}
// 	},
//
// 	monsterListLength: function() {
// 		return monsterList.length;
// 	},
//
// 	findRandomMonster: function() {
// 		let index = Math.floor(Math.random() * this.monsterListLength());
// 		return MonsterBuilder.buildMonster(this.findMonsterByIndex(index));
// 	},
//

// };

import { generateRandomIndex } from './utils';
import { MonsterBuilder } from './modles/builders/monsterBuilder';
import { MoveLocator } from './moveLocator';

export class MonsterLocator {
	constructor(api) {
		var self = this;
		this.options = {
			protocol: 'https',
			versionPath: '/api/v2/',
			cache: false,
			timeout: 5 * 1000 // 5s
		};
		this.pokemonApi = api;
		this.pokemonCount = 807;
	}

	api() {
		return this.pokemonApi;
	}

	async getPokemonCount() {
		console.log('running');
		if (!Number.isInteger(this.pokemonCount)) {
			await this.pokemonApi
				.getPokemonSpeciesList({ limit: 1, offset: 0 })
				.then(response => {
					this.pokemonCount = response.count;
				});
			return this.pokemonCount;
		} else {
			return this.pokemonCount;
		}
	}

	async locateRandomPokemon() {
		console.log('locate random');
		let monster;
		await this.getPokemonCount().then(res => {
			let index = generateRandomIndex(res);
			this.findMonsterByIndex(index, res).then(response => {
				monster = MonsterBuilder.buildMonster(response);
			});
			return monster;
		});
	}

	async findMonsterByIndex(index, count) {
		console.log(index);
		var test;
		if (index < count && index >= 0) {
			await this.pokemonApi.getPokemonByName(index).then(res => {
				test = res;
			});
			return test;
		} else {
			throw new Error('bad Index');
		}
	}
}
