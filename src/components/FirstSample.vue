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
    scene.background = new THREE.Color(0x000000)

    // === renderer ===
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    // === light ===
    const light1 = new THREE.DirectionalLight(0xffffff)
    light1.position.set(0, 0, 10)

    // === model ===
    const amount = 20

    const geometry = new THREE.BoxBufferGeometry(0.6, 0.6, 0.6)

    const vertexShader = `
    varying vec2 vUv;
    void main()
    {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }
    `
    const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    void main( void ) {
      vec2 position = - 1.0 + 2.0 * vUv;
      float red = abs( sin( position.x * position.y + time / 5.0 ) );
      float green = abs( sin( position.x * position.y + time / 4.0 ) );
      float blue = abs( sin( position.x * position.y + time / 3.0 ) );
      gl_FragColor = vec4( red, green, blue, 1.0 );
    }
    `

    const cubes = []
    for (let i = 0; i < amount; i++) {
      for (let j = 0; j < amount; j++) {
        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: {value: (i ^ 2 + j ^ 2) ^ 0.5}
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(i, 0.4 * Math.cos(i * Math.PI * 0.3) + j, 0)
        mesh.rotation.set((i ^ 2 + j ^ 2) ^ 0.5, (i ^ 2 + j ^ 2) ^ 0.5, 0)

        cubes.push(mesh)
      }
    }

    // === camera ===
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000)
    camera.position.set(amount / 2, amount / 2, 20)

    // === clock ===
    const clock = new THREE.Clock()

    return {
      scene: scene,
      renderer: renderer,
      camera: camera,
      lights: {
        // light1
      },
      objects: cubes,
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
    this.objects.forEach((object) => {
      this.scene.add(object)
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

      // this.uniforms.time.value += delta * 10

      this.objects.forEach((object, index) => {
        object.rotation.x += delta * Math.random()
        object.rotation.y += delta * Math.random()

        const time = object.material.uniforms.time
        time.value += delta * 10
      })

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
