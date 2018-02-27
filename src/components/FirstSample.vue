<template lang="pug">
  #stage
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'FirstSample',
  data () {
    // === scene ===
    const scene = new THREE.Scene()

    // === renderer ===
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    // === camera ===
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // === light ===
    const light1 = new THREE.DirectionalLight(0xffffff)
    light1.position.set(0, 0, 10)

    // === model ===
    const geometry = new THREE.BoxBufferGeometry(0.75, 0.75, 0.75)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: {value: 1.0},
        vertexShader: require('./vertexShader.glsl'),
        // vertexShader: require('./vertexShader.txt'),
        fragmentShader: require('./fragmentShader.glsl')
        // fragmentShader: require('./fragmentShader.txt')
      }
    })

    const cube = new THREE.Mesh(geometry, material)

    // === clock ===
    const clock = new THREE.Clock()

    return {
      scene: scene,
      renderer: renderer,
      camera: camera,
      lights: {
        light1
      },
      objects: {
        cube: cube
      },
      clock: clock
    }
  },

  created () {
    // === sceneにmodel,light, cameraを追加 ===
    this.scene.add(this.camera)

    // === add light ===
    Object.keys(this.lights).forEach((key) => {
      const lgt = this.lights[key]
      this.scene.add(lgt)
    })

    // === add object ===
    Object.keys(this.objects).forEach((key) => {
      const obj = this.objects[key]
      this.scene.add(obj)
    })
  },

  mounted () {
    // === DOMを追加, animate ===
    const stage = document.getElementById('stage')
    stage.appendChild(this.renderer.domElement)
    this.animate()
  },

  methods: {

    animate () {
      requestAnimationFrame(this.animate)

      this.render()
    },

    render () {
      const delta = this.clock.getDelta()

      Object.keys(this.objects).forEach((key) => {
        this.objects[key].rotation.x += delta * 1.2
        this.objects[key].rotation.y += delta * 1.2
      })

      this.renderer.render(this.scene, this.camera)
    }

  }
}
</script>

<style lang="sass">

</style>
