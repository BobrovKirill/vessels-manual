import {defineComponent, h, Component} from 'vue'

const SvgIcon = defineComponent({
  name: 'SvgIcon',

  props: {
    name: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    let component: any

    try {
      component = require(`~/assets/icons/${props.name}.svg`).default
    } catch (error) {
      console.error('SvgIcon', error)
    }

    return () => h(component)
  },
})

Component(SvgIcon.name, SvgIcon)
