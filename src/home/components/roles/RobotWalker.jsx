import { useEffect, useRef } from 'react'

/*
 * Bosh sahifaning pastida yuradigan 3D robot (public/models/robot.glb: "walk", "run", "dance" animatsiyalari).
 * Robot ekran bo'ylab chapdan o'ngga va o'ngdan chapga harakatlanadi; har safar tasodifiy ravishda
 * oddiy yuradi yoki yugurib o'tadi, ba'zan to'xtab raqsga tushadi.
 * Animatsiyalardagi oldinga siljish (root motion) olib tashlanadi — siljishni shu kod boshqaradi,
 * tezlik esa animatsiyadagi qadam tezligidan olinadi (oyoqlar yerda sirpanmasin).
 */

const MODEL_URL = '/models/robot.glb'
const FADE = 0.35 // animatsiyalar orasidagi silliq o'tish (soniya)

const random = (min, max) => min + Math.random() * (max - min)

/** Hips'ning oldinga siljishini (root motion) nolga tenglaydi va tezligini (birlik/soniya) qaytaradi */
const stripRootMotion = (clip) => {
  const track = clip.tracks.find((t) => /Hips\.position$/.test(t.name))
  if (!track) return 0
  const v = track.values
  const n = v.length / 3
  // Eng ko'p o'zgargan o'q — oldinga harakat o'qi
  let axis = 0
  let best = 0
  for (let a = 0; a < 3; a++) {
    const d = Math.abs(v[(n - 1) * 3 + a] - v[a])
    if (d > best) {
      best = d
      axis = a
    }
  }
  const start = v[axis]
  for (let i = 0; i < n; i++) v[i * 3 + axis] = start
  return best / clip.duration
}

const RobotWalker = ({ height = 170 }) => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined
    // Kichik ekranda va "harakatni kamaytirish" yoqilgan bo'lsa — robot yuklanmaydi
    if (window.innerWidth < 1024) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    let disposed = false
    let cleanup = () => {}

    // three.js faqat shu yerda (clientda) yuklanadi — sahifaning asosiy JS'i og'irlashmasin
    Promise.all([import('three'), import('three/examples/jsm/loaders/GLTFLoader.js')]).then(
      ([THREE, { GLTFLoader }]) => {
        if (disposed) return

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        scene.add(new THREE.HemisphereLight(0xffffff, 0xb8c6ff, 2.2))
        const sun = new THREE.DirectionalLight(0xffffff, 2)
        sun.position.set(2, 4, 5)
        scene.add(sun)

        // Ortografik kamera: 1 birlik = 1 piksel, kenglik — konteyner eni
        const camera = new THREE.OrthographicCamera()
        camera.position.set(0, 0, 1000)

        let width = 0
        let viewHeight = 0
        const resize = () => {
          width = mount.clientWidth
          viewHeight = mount.clientHeight
          renderer.setSize(width, viewHeight)
          camera.left = -width / 2
          camera.right = width / 2
          camera.top = viewHeight
          camera.bottom = 0
          camera.near = 0.1
          camera.far = 3000
          camera.updateProjectionMatrix()
        }
        resize()
        window.addEventListener('resize', resize)

        let frame = 0
        let mixer = null
        const clock = new THREE.Clock()

        new GLTFLoader().load(MODEL_URL, (gltf) => {
          if (disposed) return
          const robot = gltf.scene

          // O'lcham: modelni berilgan balandlikka (px) keltirish, oyoqlari yerda
          const box = new THREE.Box3().setFromObject(robot)
          const size = box.getSize(new THREE.Vector3())
          const scale = height / size.y
          const pivot = new THREE.Group()
          robot.scale.setScalar(scale)
          robot.position.y = -box.min.y * scale
          pivot.add(robot)
          scene.add(pivot)

          mixer = new THREE.AnimationMixer(robot)
          const clips = Object.fromEntries(gltf.animations.map((c) => [c.name, c]))
          // Animatsiya birligidagi tezlik → piksel/soniya (Hips ota-tugunining umumiy masshtabi bilan)
          robot.updateMatrixWorld(true)
          let unit = scale
          robot.traverse((obj) => {
            if (/Hips$/.test(obj.name) && obj.parent) unit = obj.parent.getWorldScale(new THREE.Vector3()).x
          })
          const speeds = {
            walk: stripRootMotion(clips.walk) * unit,
            run: stripRootMotion(clips.run) * unit
          }
          const actions = Object.fromEntries(Object.entries(clips).map(([name, clip]) => [name, mixer.clipAction(clip)]))

          let current = null
          const play = (name) => {
            const next = actions[name]
            if (current === next) return
            next.reset().play()
            if (current) next.crossFadeFrom(current, FADE, true)
            current = next
          }

          // Holat: qaysi tomonga, qanday (walk/run/dance), qancha davom etadi
          const margin = height
          let dir = Math.random() < 0.5 ? 1 : -1
          let x = dir > 0 ? -width / 2 - margin : width / 2 + margin
          let mode = 'walk'
          let danceLeft = 0
          let pickedThisLap = false

          const startLap = () => {
            mode = Math.random() < 0.45 ? 'run' : 'walk'
            pickedThisLap = Math.random() < 0.4 // bu safar yo'lda to'xtab raqsga tushadimi
            play(mode)
          }
          startLap()

          const danceAt = () => random(-width * 0.25, width * 0.25)
          let danceSpot = danceAt()

          const tick = () => {
            frame = requestAnimationFrame(tick)
            const dt = Math.min(clock.getDelta(), 0.05)

            if (mode === 'dance') {
              danceLeft -= dt
              if (danceLeft <= 0) {
                mode = Math.random() < 0.5 ? 'run' : 'walk'
                play(mode)
              }
            } else {
              x += dir * speeds[mode] * dt
              // Yo'l o'rtasida tasodifiy joyda raqs
              if (pickedThisLap && Math.abs(x - danceSpot) < speeds[mode] * dt * 1.5) {
                pickedThisLap = false
                mode = 'dance'
                danceLeft = random(4, 7)
                play('dance')
              }
              // Ekrandan chiqib ketdi — orqaga qaytadi, yangi tasodifiy rejim bilan
              if ((dir > 0 && x > width / 2 + margin) || (dir < 0 && x < -width / 2 - margin)) {
                dir = -dir
                danceSpot = danceAt()
                startLap()
              }
            }

            pivot.position.x = x
            // Yurish tomoniga qaraydi; raqsda tomoshabinga qaraydi
            const targetRot = mode === 'dance' ? 0 : (dir * Math.PI) / 2.4
            pivot.rotation.y += (targetRot - pivot.rotation.y) * Math.min(1, dt * 8)

            mixer.update(dt)
            renderer.render(scene, camera)
          }
          tick()
        })

        cleanup = () => {
          cancelAnimationFrame(frame)
          window.removeEventListener('resize', resize)
          mixer?.stopAllAction()
          scene.traverse((obj) => {
            obj.geometry?.dispose()
            const materials = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : []
            materials.forEach((m) => {
              Object.values(m).forEach((v) => v?.isTexture && v.dispose())
              m.dispose()
            })
          })
          renderer.dispose()
          renderer.domElement.remove()
        }
      }
    )

    return () => {
      disposed = true
      cleanup()
    }
  }, [height])

  return <div ref={mountRef} className="pointer-events-none absolute inset-x-0 bottom-0 z-20" style={{ height: height + 20 }} aria-hidden="true" />
}

export default RobotWalker
