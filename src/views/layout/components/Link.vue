<template>
  <div class="my-link" v-bind="linkProps(to)">
    <slot/>
  </div>
</template>

<script>
import { isExternal } from '@/utils'

export default {
  name: 'mylink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    isExternalLink (routePath) {
      return isExternal(routePath)
    },
    linkProps (url) {
      if (this.isExternalLink(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
