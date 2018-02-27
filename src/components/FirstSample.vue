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
    renderer.setPixelRatio( window.devicePixelRatio)

    // === camera ===
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000)
    camera.position.z = 4

    // === light ===
    const light1 = new THREE.DirectionalLight(0xffffff)
    light1.position.set(0, 0, 10)

    // === model ===
    const geometry = new THREE.BoxBufferGeometry(0.75, 0.75, 0.75)

    const uniforms = {
      time: { value: 1.0 }
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
    void main(void) {
      vec2 p = - 1.0 + 2.0 * vUv;
      float a = time * 40.0;
      float d, e, f, g = 1.0 / 40.0 ,h ,i ,r ,q;
      e = 400.0 * ( p.x * 0.5 + 0.5 );
      f = 400.0 * ( p.y * 0.5 + 0.5 );
      i = 200.0 + sin( e * g + a / 150.0 ) * 20.0;
      d = 200.0 + cos( f * g / 2.0 ) * 18.0 + cos( e * g ) * 7.0;
      r = sqrt( pow( abs( i - e ), 2.0 ) + pow( abs( d - f ), 2.0 ) );
      q = f / r;
      e = ( r * cos( q ) ) - a / 2.0;
      f = ( r * sin( q ) ) - a / 2.0;
      d = sin( e * g ) * 176.0 + sin( e * g ) * 164.0 + r;
      h = ( ( f + d ) + a / 2.0 ) * g;
      i = cos( h + r * p.x / 1.3 ) * ( e + e + a ) + cos( q * g * 6.0 ) * ( r + h / 3.0 );
      h = sin( f * g ) * 144.0 - sin( e * g ) * 212.0 * p.x;
      h = ( h + ( f - e ) * q + sin( r - ( a + h ) / 7.0 ) * 10.0 + i / 4.0 ) * g;
      i += cos( h * 2.3 * sin( a / 350.0 - q ) ) * 184.0 * sin( q - ( r * 4.3 + a / 12.0 ) * g ) + tan( r * g + h ) * 184.0 * cos( r * g + h );
      i = mod( i / 5.6, 256.0 ) / 64.0;
      if ( i < 0.0 ) i += 4.0;
      if ( i >= 2.0 ) i = 4.0 - i;
      d = r / 350.0;
      d += sin( d * d * 8.0 ) * 0.52;
      f = ( sin( a * g ) + 1.0 ) / 2.0;
      gl_FragColor = vec4( vec3( f * i / 1.6, i / 2.0 + d / 13.0, i ) * d * p.x + vec3( i / 1.3 + d / 8.0, i / 2.0 + d / 18.0, i ) * d * ( 1.0 - p.x ), 1.0 );
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
