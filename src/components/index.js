import initLodding from '@c/initLodding' // 引入的组建

const components = [
    initLodding
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
