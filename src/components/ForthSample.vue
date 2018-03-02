<template lang="pug">
  #stage
</template>

<script>
import * as THREE from 'three'
import * as CANNON from 'cannon'
import getBox from '@/models/ShaderBox.js'

export default {
  name: 'ForthSample',
  data () {
    // === scene ===
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffff88)

    // === world ===
    const world = new CANNON.World()
    world.gravity.set(0, -9.81 * 2, 0)
    world.broadphase = new CANNON.NaiveBroadphase()
    world.solver.iterations = 8
    world.solver.tolerance = 0.1

    // === renderer ===
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    // === camera ===
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000)
    camera.position.set(0, 10, 100)

    // === light ===
    const light1 = new THREE.DirectionalLight(0xffffff)
    light1.position.set(0, 0, 10)

    // === model: box ===
    const boxMass = 1
    const boxShape = new CANNON.Box(new CANNON.Vec3(5, 5, 5))
    const phyBox = new CANNON.Body({mass: boxMass, shape: boxShape})
    phyBox.position.set(0, 20, 0)
    phyBox.angularVelocity.set(0.1, 0.1, 0.1)
    phyBox.angularDamping = 0.1
    world.addBody(phyBox)

    const box = getBox(10, 10, 10)

    // === model plane ===
    const planeMass = 0
    const planeShape = new CANNON.Plane()
    const phyPlane = new CANNON.Body({mass: planeMass, shape: planeShape})
    phyPlane.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
    phyPlane.position.set(0, 0, 0)
    world.addBody(phyPlane)

    const planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1)
    const planeMaterial = new THREE.MeshPhongMaterial({color: 0xdddddd})
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)

    // === clock ===
    const clock = new THREE.Clock()

    return {
      scene: scene,
      world: world,
      renderer: renderer,
      camera: camera,
      lights: {
        // light1
      },
      phyObjects: {
        box: phyBox,
        plane: phyPlane
      },
      objects: {
        box: box,
        plane: plane
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
    window.addEventListener('resize', this.onWindowResize)

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

      this.world.step(delta)

      this.objects['box'].position.copy(this.phyObjects['box'].position)
      this.objects['box'].quaternion.copy(this.phyObjects['box'].quaternion)
      this.objects['plane'].position.copy(this.phyObjects['plane'].position)
      this.objects['plane'].quaternion.copy(this.phyObjects['plane'].quaternion)

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
