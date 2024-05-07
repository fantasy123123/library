import * as components from "@element-plus/icons-vue"
//element-plus的图标
export default {
    install:(app)=> {
        for (const key in components) {
            const component = components[key];
            app.component(component.name, component);
        }
    },
}