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
    scene.background = new THREE.Color(0x8888ff)

    // === renderer ===
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    // === camera ===
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000)
    camera.position.z = 4

    // === light ===
    const light1 = new THREE.DirectionalLight(0xffffff)
    light1.position.set(0, 0, 10)

    // === model ===
    const geometry = new THREE.SphereBufferGeometry(0.75, 50, 50)

    const uniforms = {
      time: { value: 0 }
    }

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
      vec2 position = vUv;
      float color = 0.0;
      color += sin( position.x * cos( time / 15.0 ) * 80.0 ) + cos( position.y * cos( time / 15.0 ) * 10.0 );
      color += sin( position.y * sin( time / 10.0 ) * 40.0 ) + cos( position.x * sin( time / 25.0 ) * 40.0 );
      color += sin( position.x * sin( time / 5.0 ) * 10.0 ) + sin( position.y * sin( time / 35.0 ) * 80.0 );
      color *= sin( time / 10.0 ) * 0.5;
      gl_FragColor = vec4( vec3( color, color * 0.5, sin( color + time / 3.0 ) * 0.75 ), 1.0 );
    }
    `

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    })

    const cube = new THREE.Mesh(geometry, material)

    // === clock ===
    const clock = new THREE.Clock()

    return {
      scene: scene,
      renderer: renderer,
      camera: camera,
      lights: {
        // light1
      },
      objects: {
        cube: cube
      },
      clock: clock,

      uniforms: uniforms
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

      this.uniforms.time.value += delta * 10

      Object.keys(this.objects).forEach((key) => {
        this.objects[key].rotation.x += delta * 1.2
        this.objects[key].rotation.y += delta * 1.2
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
