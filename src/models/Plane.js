import * as THREE from 'three'

const planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1)
const planeMaterial = new THREE.MeshPhongMaterial()
planeMaterial.color = new THREE.Color(0xff00ff)
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

export default plane
