import { MonsterDom } from './monster/monsterDom';
import { MonsterLocator } from './monster/monsterLocators';
import { MoveLocator } from './monster/moveLocator';
const PokemonApi = require('pokeapi-js-wrapper');
import { shapeshiftInit } from './monster/shifterSettings';

const options = {
	protocol: 'https',
	versionPath: '/api/v2/',
	cache: true,
	timeout: 5 * 1000 // 5s
};

var monsterLocator = new MonsterLocator(new PokemonApi.Pokedex(options));
var moveLocator = new MoveLocator(monsterLocator.api());
const pokeballBtn = document.getElementsByClassName('ball-btn');

shapeshiftInit();
initPokeballs();

function initPokeballs() {
	for (let i = 0; i < pokeballBtn.length; i++) {
		pokeballBtn[i].addEventListener('click', placePokemonInBall);
	}

	function placePokemonInBall() {
		this.removeEventListener('click', placePokemonInBall);
		getCurrentPokeBall(this).classList.add('opened');
		let currentImgNode = getClosest(this, '.poke-img');
		let currentNameNode = getClosest(this, '.name-wrapper');
		let currentTypeNode = getClosest(this, '.poke-types');
		let currentMoveNode = getClosest(this, '.moves');
		monsterLocator.locateRandomPokemon().then(monster => {
			moveLocator.locateRandomMoveSet(4, monster.learnableMoves).then(res => {
				Promise.all(res)
					.then(res => {
						monster.setMovePool(res);
					})
					.then(() => {
						MonsterDom.setNameNode(monster, currentNameNode);
						MonsterDom.setTypeNodes(monster, currentTypeNode);
						MonsterDom.setMoveNodes(monster.movePool, currentMoveNode);
						MonsterDom.setImageNode(monster.img, currentImgNode);
						initNodes([currentNameNode, currentTypeNode, currentMoveNode]);
						getClosest(this, '.wrapper').classList.add('flip');
						currentImgNode.classList.add('opened');
					});
			});
		});
	}

	function getClosest(node, className) {
		if (className === '.wrapper') {
			return node.closest('.wrapper');
		}
		return node.closest('.wrapper').querySelector(className);
	}

	function getCurrentPokeBall(node) {
		return node.closest('.ball');
	}

	function initNodes(nodeArr) {
		nodeArr.forEach(node => {
			node.classList.add('loaded');
		});
	}
}

//HTML based functions
