import initLodding from '@c/initLodding' // 引入的组建
import linker from '@c/linker'
import messageBox from '@c/messageBox'

const components = [
    initLodding,
    linker,
    messageBox

]
export default{
    install (Vue) {
        components.map((component) => {
            if (component.noTag) {
                Vue.prototype[`$${component.names}`] = component
            } else {
                Vue.component(component.name, component)
            }
        })
    }
}
