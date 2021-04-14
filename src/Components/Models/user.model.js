import { Model } from 'react-axiom'

export class User extends Model {
    static defaultState() {
        return {
            id: null,
            name: null,
            roles: null
        }
    }
}