const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  beforeMount () {
    console.log(body, WIDTH, RATIO)
  }
}
