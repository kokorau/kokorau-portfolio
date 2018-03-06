import * as THREE from 'three'

function generateTexture () {
  const canvas = document.createElement('canvas')
  canvas.width = 2
  canvas.height = 2
  const context = canvas.getContext('2d')
  context.fillStyle = 'white'
  context.fillRect(0, 1, 2, 1)
  return canvas
}

const getLightObj = (color) => {
  const intensity = 1.5

  const pointLightObj = new THREE.PointLight(color, intensity, 20)
  pointLightObj.castShadow = true
  pointLightObj.shadow.camera.near = 1
  pointLightObj.shadow.camera.far = 60
  pointLightObj.shadow.bias = -0.005 // reduces self-shadowing on double-sided objects

  let geometry = new THREE.SphereGeometry(0.3, 12, 6)
  let material = new THREE.MeshBasicMaterial({color: color})
  material.color.multiplyScalar(intensity)
  let sphere = new THREE.Mesh(geometry, material)
  pointLightObj.add(sphere)

  const texture = new THREE.CanvasTexture(generateTexture())
  texture.magFilter = THREE.NearestFilter
  texture.wrapT = THREE.RepeatWrapping
  texture.wrapS = THREE.RepeatWrapping
  texture.repeat.set(1, 3.5)
  geometry = new THREE.SphereGeometry(2, 32, 8)
  material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    alphaMap: texture,
    alphaTest: 0.5
  })
  sphere = new THREE.Mesh(geometry, material)
  sphere.castShadow = true
  sphere.receiveShadow = true
  pointLightObj.add(sphere)

  // custom distance material
  const distanceMaterial = new THREE.MeshDistanceMaterial({
    alphaMap: material.alphaMap,
    alphaTest: material.alphaTest
  })
  sphere.customDistanceMaterial = distanceMaterial

  return pointLightObj
}

export default getLightObj
