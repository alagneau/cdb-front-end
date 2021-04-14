import { Model } from 'react-axiom'

export class Computer extends Model {
    static defaultState() {
        return {
            id: null,
            name: "",
            introduced: null,
            discontinued: null,
            company: null,
        }
    }
}