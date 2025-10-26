import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Simple Three.js rotating textured cube (serves as a stylish 3D accent)
export default function ThreeScene(){
  const ref = useRef()

  useEffect(() => {
    const el = ref.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 1000)
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3)
    const loader = new THREE.TextureLoader()
    const texture = loader.load('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80')
    const material = new THREE.MeshStandardMaterial({ map: texture })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2)
    scene.add(light)

    function animate(){
      cube.rotation.y += 0.01
      cube.rotation.x += 0.005
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    function handleResize(){
      renderer.setSize(el.clientWidth, el.clientHeight)
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={ref} style={{ width: '100%', height: '320px' }} />
}
