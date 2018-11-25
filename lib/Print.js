import {DataStore} from './DataStore'
export class Pring{
    constructor(){
        this.debug = DataStore.getInstance.get('debug')
        console.log(this.debug, 'debug')
    }
    // 工厂方法
    static getInstance() {
        if (!Pring.instance) {
            Pring.instance = new Pring();
        }
        return Pring.instance;
    }

    printDebug(params){
        console.log(params)
    }
}