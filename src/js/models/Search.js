// export default 'I am an exported string';
import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        // const proxy = 'https://cors-anywhere.herokuapp.com/';
        // const key = '002f709ab8051692b265aadd1402cb51';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log("getResults of search query");
            console.log(res);
        } catch(error) {
            alert(error);
        }
        
    }    
}
