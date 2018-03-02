import * as THREE from 'three'

const getBox = (w, h, d) => {
  const boxGeometry = new THREE.BoxBufferGeometry(w, h, d)

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
      vec2 position = - 1.0 + 2.0 * vUv;
      float red = abs( sin( position.x * position.y + time / 5.0 ) );
      float green = abs( sin( position.x * position.y + time / 4.0 ) );
      float blue = abs( sin( position.x * position.y + time / 3.0 ) );
      gl_FragColor = vec4( red, green, blue, 1.0 );
    }
    `

  const boxMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  })

  const box = new THREE.Mesh(boxGeometry, boxMaterial)

  return box
}

export default getBox
