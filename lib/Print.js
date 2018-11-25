import {DataStore} from './DataStore'
export class Print{
    constructor(){
        this.debug = DataStore.getInstance().get('debug')
        if(this.debug){
            console.warn('调试模式开启')
        }
    }
    // 工厂方法
    static getInstance() {
        if (!Print.instance) {
            Print.instance = new Print();
        }
        return Print.instance;
    }

    printDebug(params){
        console.warn(params)
    }
    throwError(params){
        throw new Error(params)
    }
}