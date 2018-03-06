import * as THREE from 'three'

import rainbowMaterial from './RainbowShader'

const getBox = (w, h, d) => {
  const boxGeometry = new THREE.BoxBufferGeometry(w, h, d)

  const boxMaterial = rainbowMaterial

  const box = new THREE.Mesh(boxGeometry, boxMaterial)

  return box
}

export default getBox
