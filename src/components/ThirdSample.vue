<template lang="pug">
  #stage
</template>

<script>
import * as THREE from 'three'
import getLightObj from '@/models/lightObj'

export default {
  name: 'ThirdSample',
  data () {
    // === camera ===
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(0, 10, 40)

    // === scene ===
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // === renderer ===
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap

    // === light ===
    const light1 = new THREE.AmbientLight(0x111122)

    // === model ===
    const lightObj1 = getLightObj(0x00ff55)
    const lightObj2 = getLightObj(0xff8888)

    const boxGeometry = new THREE.BoxGeometry(30, 30, 30)
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      specular: 0x11111,
      side: THREE.BackSide
    })

    const boxObj = new THREE.Mesh(boxGeometry, boxMaterial)
    boxObj.position.set(0, 10, 0)
    boxObj.receiveShadow = true

    // === controls ===
    // const controls = new THREE.OrbitControls(camera, renderer.domElement)
    // controls.target.set(0, 10, 0)
    // controls.update()

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
        lightObj1,
        lightObj2,
        boxObj
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
    window.addEventListener('resize', this.onWindowResize, false)

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
      let time = this.clock.getElapsedTime()

      const obj1 = this.objects['lightObj1']
      obj1.position.x = Math.sin(time * 0.6) * 9
      obj1.position.y = Math.sin(time * 0.7) * 9 + 5
      obj1.position.z = Math.sin(time * 0.8) * 9

      obj1.rotation.x = time
      obj1.rotation.z = time

      obj1.color.r = 1 * (1 - Math.sin(time * 1.5))
      obj1.color.g = 1 * (1 - Math.sin(time * 2.4))
      obj1.color.b = 1 * (1 - Math.sin(time * 0.7))

      const obj2 = this.objects['lightObj2']
      time += 100
      obj2.position.x = Math.sin(time * 0.6) * 9
      obj2.position.y = Math.sin(time * 0.7) * 9 + 5
      obj2.position.z = Math.sin(time * 0.8) * 9

      obj2.rotation.x = time
      obj2.rotation.z = time

      obj2.color.r = 1 * (1 - Math.sin(time * 2.5))
      obj2.color.g = 1 * (1 - Math.sin(time * 1.4))
      obj2.color.b = 1 * (1 - Math.sin(time * 1.7))

      this.renderer.render(this.scene, this.camera)
    },

    onWindowResize (event) {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

  }
}
</script>

<style lang="sass"></style>
