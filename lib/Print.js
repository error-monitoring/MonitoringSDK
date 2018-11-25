import {DataStore} from './DataStore'
export class Print{
    constructor(){
        this.debug = DataStore.getInstance().get('debug')
        console.log(this.debug, 'debug')
    }
    // 工厂方法
    static getInstance() {
        if (!Print.instance) {
            Print.instance = new Print();
        }
        return Print.instance;
    }

    printDebug(params){
        console.log(params)
    }
}