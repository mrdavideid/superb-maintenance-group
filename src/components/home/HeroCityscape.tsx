'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroCityscape() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clean up any existing renderer before creating new one
    if (rendererRef.current) {
      rendererRef.current.dispose()
      rendererRef.current.domElement.remove()
      rendererRef.current = null
    }

    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.008)

    // Narrower FOV = buildings fill frame, no empty edges
    const cam = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 500)
    cam.position.set(0, 70, 50)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)) // Capped for performance
    renderer.setClearColor(0x000000)
    // Shadows disabled — massive perf gain, barely visible in dark scene
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights — simplified, no shadow casting
    const aL = new THREE.AmbientLight(0xffffff, 0.18)
    scene.add(aL)

    const dL = new THREE.DirectionalLight(0xffffff, 0.85)
    dL.position.set(40, 80, 50)
    scene.add(dL)

    const rL = new THREE.DirectionalLight(0x8899bb, 0.3)
    rL.position.set(-30, 40, -40)
    scene.add(rL)

    // Materials
    function mkBody() {
      const s = 0.35 + Math.random() * 0.25
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(s, s, s + 0.01),
        roughness: 0.6 + Math.random() * 0.25,
      })
    }
    const spMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.6 })

    // Building generator
    const SH = 5.5
    const bldgs: THREE.Group[] = []

    function mkBld(x: number, z: number) {
      const dist = Math.sqrt(x * x + z * z)
      const hf = Math.max(0, 1 - dist / 55)
      const sf = Math.max(0, 1 - (Math.abs(x) - SH) / 14)
      const ht = (3 + sf * 10) + Math.random() * (10 + hf * 35 + sf * 40)
      const w = 2 + Math.random() * 2.5
      const d = 2 + Math.random() * 2.5

      const g = new THREE.Group()
      const bm = mkBody()

      const st = Math.random()
      if (st < 0.45) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, ht, d), bm)
        m.position.y = ht / 2
        g.add(m)
      } else if (st < 0.75) {
        const sp = 0.5 + Math.random() * 0.2
        const bH = ht * sp
        const tH = ht - bH
        const tW = w * (0.6 + Math.random() * 0.2)
        const tD = d * (0.6 + Math.random() * 0.2)
        const ba = new THREE.Mesh(new THREE.BoxGeometry(w, bH, d), bm)
        ba.position.y = bH / 2
        g.add(ba)
        const tp = new THREE.Mesh(new THREE.BoxGeometry(tW, tH, tD), bm)
        tp.position.y = bH + tH / 2
        g.add(tp)
        const lg = new THREE.Mesh(new THREE.BoxGeometry(tW + 0.06, 0.03, tD + 0.06), spMat)
        lg.position.y = bH
        g.add(lg)
      } else {
        const h1 = ht * (0.35 + Math.random() * 0.1)
        const h2 = ht * (0.25 + Math.random() * 0.1)
        const h3 = ht - h1 - h2
        const w2 = w * (0.7 + Math.random() * 0.1)
        const d2 = d * (0.7 + Math.random() * 0.1)
        const w3 = w2 * (0.65 + Math.random() * 0.1)
        const d3 = d2 * (0.65 + Math.random() * 0.1)
        const a = new THREE.Mesh(new THREE.BoxGeometry(w, h1, d), bm)
        a.position.y = h1 / 2; g.add(a)
        const b = new THREE.Mesh(new THREE.BoxGeometry(w2, h2, d2), bm)
        b.position.y = h1 + h2 / 2; g.add(b)
        const c = new THREE.Mesh(new THREE.BoxGeometry(w3, h3, d3), bm)
        c.position.y = h1 + h2 + h3 / 2; g.add(c)
      }

      // Spandrel bands
      const bc = Math.max(2, Math.min(7, Math.floor(ht / 4)))
      const bg = ht / (bc + 1)
      for (let i = 1; i <= bc; i++) {
        const band = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, 0.04, d + 0.04), spMat)
        band.position.y = i * bg
        g.add(band)
      }

      // Window strips — reduced to 2 sides (front + right) for performance
      const winMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
      const floorStep = 1.8
      const nFloors = Math.floor((ht - 1) / floorStep)
      const stripH = 0.22

      for (let fl = 0; fl < nFloors; fl++) {
        const fy = 1 + fl * floorStep
        const sr = new THREE.Mesh(new THREE.BoxGeometry(0.04, stripH, d * 0.92), winMat)
        sr.position.set(w / 2 + 0.04, fy, 0)
        g.add(sr)
        const sf = new THREE.Mesh(new THREE.BoxGeometry(w * 0.92, stripH, 0.04), winMat)
        sf.position.set(0, fy, d / 2 + 0.04)
        g.add(sf)
      }

      g.position.set(x, 0, z)
      g.userData = { by: 0, ht, ph: Math.random() * 6.28, sp: 0.3 + Math.random() * 0.5, wm: winMat }
      return g
    }

    // Place buildings — tighter grid for zoomed-in camera
    const GS = 100, SP = 4, SW = 2.2
    for (let gx = -GS / 2; gx < GS / 2; gx += SP) {
      for (let gz = -GS / 2; gz < GS / 2; gz += SP) {
        if (Math.abs(gx % (SP * 4)) < SW) continue
        if (Math.abs(gz % (SP * 4)) < SW) continue
        if (Math.abs(gx) < SH) continue
        bldgs.push(mkBld(gx + (Math.random() - 0.5) * 0.8, gz + (Math.random() - 0.5) * 1.2))
      }
    }
    bldgs.forEach((b) => scene.add(b))

    // Ground — extended to hide edges
    const gnd = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      new THREE.MeshStandardMaterial({ color: 0x060606, roughness: 0.95 })
    )
    gnd.rotation.x = -Math.PI / 2
    scene.add(gnd)

    // Sort front to back
    bldgs.sort((a, b) => b.position.z - a.position.z)
    const zMax = bldgs[0].position.z
    const zMin = bldgs[bldgs.length - 1].position.z

    // Scroll tracking
    const HERO_HEIGHT = window.innerHeight * 4
    let curS = 0, tarS = 0
    const handleScroll = () => {
      tarS = Math.min(1, window.scrollY / HERO_HEIGHT)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Camera path — starts closer, buildings fill frame
    function camAt(t: number) {
      const p = new THREE.Vector3()
      const l = new THREE.Vector3()
      if (t < 0.15) {
        // Closer aerial — buildings fill the frame
        let e = t / 0.15; e = e * e * (3 - 2 * e)
        p.set(0, 70 - e * 20, 50 - e * 20)
        l.set(0, 0, -15)
      } else if (t < 0.35) {
        // Descend into the city
        let e = (t - 0.15) / 0.2; e = e * e * (3 - 2 * e)
        p.set(0, 50 - e * 44, 30 - e * 20)
        l.set(0, 8 - e * 4, -20)
      } else {
        // Street level — fly through lit buildings
        let e = (t - 0.35) / 0.65; e = e * e * (3 - 2 * e)
        p.set(Math.sin(e * Math.PI * 2) * 0.8, 5 + Math.sin(e * Math.PI) * 3, 10 - e * 60)
        l.set(0, 6 + Math.sin(e * Math.PI * 1.5) * 2, 10 - e * 60 - 20)
      }
      return { p, l }
    }

    // Animation loop
    const offCol = new THREE.Color(0x000000)
    const onCol = new THREE.Color(0xffffff)
    const tmp = new THREE.Color()
    let animId: number

    function animate() {
      animId = requestAnimationFrame(animate)

      // Faster lerp when scrolling back UP so animation returns quickly
      const lerpSpeed = tarS < curS ? 0.14 : 0.06
      curS += (tarS - curS) * lerpSpeed

      // Skip rendering when fully past hero AND target is also past
      if (curS > 0.995 && tarS > 0.995) return

      const scrollP = curS
      const cp = camAt(scrollP)
      cam.position.lerp(cp.p, 0.08)
      const cl = new THREE.Vector3()
      cam.getWorldDirection(cl)
      cl.multiplyScalar(50).add(cam.position)
      cl.lerp(cp.l, 0.06)
      cam.lookAt(cl)

      // Wave lighting
      const wP = Math.min(1, scrollP / 0.58)
      const wCurve = wP * (1.7 - wP * 0.7)
      const waveZ = (zMax + 3) - wCurve * ((zMax + 3) - (zMin - 3))
      const time = performance.now() * 0.001

      for (let i = 0; i < bldgs.length; i++) {
        const bl = bldgs[i], u = bl.userData
        // Subtle wobble — only for nearby buildings (performance)
        if (Math.abs(bl.position.z - cam.position.z) < 40) {
          bl.position.y = u.by + Math.sin(time * u.sp + u.ph) * 0.06
        }
        const diff = bl.position.z - waveZ
        const stag = (u.ph / 6.28) * 1.2
        const val = diff - stag
        if (val > 0) {
          const glow = Math.min(1, val / 3)
          tmp.lerpColors(offCol, onCol, glow)
          u.wm.color.copy(tmp)
        } else {
          u.wm.color.copy(offCol)
        }
      }

      // Fog and lighting respond directly to scroll position
      ;(scene.fog as THREE.FogExp2).density = 0.008 + scrollP * 0.004
      const dm = Math.max(0.5, 1 - scrollP * 0.4)
      dL.intensity = 0.85 * dm
      rL.intensity = 0.3 * dm
      aL.intensity = Math.max(0.12, 0.18 * dm)
      dL.position.x = 40 + Math.sin(scrollP * Math.PI) * 25
      dL.position.z = 50 - scrollP * 70

      renderer.render(scene, cam)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      cam.aspect = innerWidth / innerHeight
      cam.updateProjectionMatrix()
      renderer.setSize(innerWidth, innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      renderer.domElement.remove()
      rendererRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
    />
  )
}
