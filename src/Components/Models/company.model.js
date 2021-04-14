import { Model } from 'react-axiom'

export class Company extends Model {
    static defaultState() {
        return {
            id: null,
            name: null
        }
    }
}