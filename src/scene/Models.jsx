import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Sphere, Plane } from '@react-three/drei'

// A classic red barn
export const Barn = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Box args={[6, 4, 8]} position={[0, 2, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#8B0000" />
    </Box>
    <Box args={[6.5, 0.2, 8.5]} position={[0, 4, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#2d2d2d" />
    </Box>
    <Box args={[4.4, 0.2, 8.5]} position={[1.5, 4.8, 0]} rotation={[0, 0, Math.PI/6]} castShadow receiveShadow>
       <meshStandardMaterial color="#2d2d2d" />
    </Box>
    <Box args={[4.4, 0.2, 8.5]} position={[-1.5, 4.8, 0]} rotation={[0, 0, -Math.PI/6]} castShadow receiveShadow>
       <meshStandardMaterial color="#2d2d2d" />
    </Box>
    <Box args={[2, 3, 0.1]} position={[0, 1.5, 4.01]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" />
    </Box>
    <Box args={[0.2, 3, 0.1]} position={[0, 1.5, 4.02]} castShadow receiveShadow>
      <meshStandardMaterial color="#000000" />
    </Box>
  </group>
)

// A silver grain silo
export const Silo = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Cylinder args={[2, 2, 10, 16]} position={[0, 5, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#b0c4de" metalness={0.6} roughness={0.3} />
    </Cylinder>
    <Sphere args={[2, 16, 16, 0, Math.PI*2, 0, Math.PI/2]} position={[0, 10, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#a0b4ce" metalness={0.6} roughness={0.3} />
    </Sphere>
  </group>
)

// Dynamic Generic Tractor capable of holding multiple attachments 
// attachments: 'tiller' | 'planter' | 'sprayer' | null
export const Tractor = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, attachment = 'tiller' }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // Drive back and forth along the X axis
    const moveRange = 8
    const speed = 1.5
    const xPos = Math.sin(t * speed) * moveRange
    
    // Bounce slightly
    const yPos = Math.abs(Math.sin(t * speed * 4)) * 0.1
    
    // Rotate to face travel direction
    const travelDir = Math.cos(t * speed) > 0 ? 0 : Math.PI
    const rotationY = travelDir + rotation[1] 
    
    groupRef.current.position.set(position[0] + xPos, position[1] + yPos, position[2])
    groupRef.current.rotation.set(rotation[0], rotationY, rotation[2])
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Box args={[1.5, 1, 3]} position={[0, 1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#d32f2f" />
      </Box>
      <Box args={[1.3, 0.8, 1.5]} position={[0, 1.4, 0.5]} castShadow receiveShadow>
        <meshStandardMaterial color="#c62828" />
      </Box>
      <Box args={[1.5, 1.5, 1.2]} position={[0, 2, -0.9]} castShadow receiveShadow>
        <meshStandardMaterial color="#111" transparent opacity={0.3} />
      </Box>
      <Box args={[1.4, 0.1, 1.2]} position={[0, 2.75, -0.9]} castShadow receiveShadow>
        <meshStandardMaterial color="#fff" />
      </Box>
      <Cylinder args={[0.1, 0.1, 1.2]} position={[0.4, 2.4, 1.1]} castShadow receiveShadow>
        <meshStandardMaterial color="#424242" />
      </Cylinder>
      <Cylinder args={[0.8, 0.8, 0.4, 16]} position={[-0.9, 0.8, -1]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
        <meshStandardMaterial color="#212121" />
      </Cylinder>
      <Cylinder args={[0.8, 0.8, 0.4, 16]} position={[0.9, 0.8, -1]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
        <meshStandardMaterial color="#212121" />
      </Cylinder>
      <Cylinder args={[0.5, 0.5, 0.3, 16]} position={[-0.7, 0.5, 1.2]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
        <meshStandardMaterial color="#212121" />
      </Cylinder>
      <Cylinder args={[0.5, 0.5, 0.3, 16]} position={[0.7, 0.5, 1.2]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
        <meshStandardMaterial color="#212121" />
      </Cylinder>
      
      {/* Tiller Attachment */}
      {attachment === 'tiller' && (
        <group position={[0, 0.4, -2]}>
           <Box args={[2, 0.2, 0.2]} castShadow receiveShadow>
             <meshStandardMaterial color="#616161" />
           </Box>
           {Array.from({length: 5}).map((_, i) => (
             <Box key={i} args={[0.1, 0.6, 0.1]} position={[-0.8 + (i * 0.4), -0.2, -0.1]} castShadow receiveShadow>
               <meshStandardMaterial color="#9e9e9e" />
             </Box>
           ))}
        </group>
      )}

      {/* Planter / Seed Drill Attachment */}
      {attachment === 'planter' && (
        <group position={[0, 0.5, -2]}>
          <Box args={[3, 0.5, 0.6]} castShadow receiveShadow>
             <meshStandardMaterial color="#1976d2" />
          </Box>
          <Box args={[3, 0.2, 0.2]} position={[0, 0.5, 0]} castShadow receiveShadow>
             <meshStandardMaterial color="#ffff00" />
          </Box>
          {Array.from({length: 8}).map((_, i) => (
             <Cylinder key={i} args={[0.03, 0.03, 0.8]} position={[-1.4 + (i * 0.4), -0.4, 0]} castShadow receiveShadow>
               <meshStandardMaterial color="#9e9e9e" />
             </Cylinder>
          ))}
        </group>
      )}

      {/* Fertilizer Sprayer Boom */}
      {attachment === 'sprayer' && (
        <group position={[0, 0.5, -2]}>
          {/* Main tank */}
          <Cylinder args={[0.6, 0.6, 1.5, 12]} rotation={[0, 0, Math.PI/2]} position={[0, 0.5, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#fdd835" />
          </Cylinder>
          {/* Wide booms */}
          <Box args={[12, 0.1, 0.1]} position={[0, 0.2, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#212121" />
          </Box>
        </group>
      )}
    </group>
  )
}

// Animated Farmer Character (can appear multiple times passing different offset variables to loop naturally)
export const Farmer = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, moveRange = 3, offset = 0 }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime() + offset
    
    // Farmer paces in a small circle / back and forth
    const xPos = Math.sin(t * 0.8) * moveRange
    const zPos = Math.cos(t * 0.8) * (moveRange * 0.6)
    
    // Bobbing walk animation
    const yPos = Math.abs(Math.sin(t * 4)) * 0.15
    
    // Look ahead of the path
    const targetYRot = Math.atan2(Math.sin((t+0.1)*0.8), Math.cos((t+0.1)*0.8))
    
    groupRef.current.position.set(position[0] + xPos, position[1] + yPos, position[2] + zPos)
    groupRef.current.rotation.set(0, targetYRot + Math.PI/2, 0)
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Box args={[0.3, 0.5, 0.2]} position={[-0.2, 0.25, 0]} castShadow receiveShadow>
         <meshStandardMaterial color="#1976d2" />
      </Box>
      <Box args={[0.3, 0.5, 0.2]} position={[0.2, 0.25, 0]} castShadow receiveShadow>
         <meshStandardMaterial color="#1976d2" />
      </Box>
      <Box args={[0.7, 0.7, 0.3]} position={[0, 0.8, 0]} castShadow receiveShadow>
         <meshStandardMaterial color="#d32f2f" />
      </Box>
      <Box args={[0.4, 0.4, 0.4]} position={[0, 1.35, 0]} castShadow receiveShadow>
         <meshStandardMaterial color="#ffccbc" />
      </Box>
      <Cylinder args={[0.6, 0.6, 0.1, 12]} position={[0, 1.6, 0]} castShadow receiveShadow>
         <meshStandardMaterial color="#fdd835" />
      </Cylinder>
      <Cylinder args={[0.3, 0.4, 0.2, 12]} position={[0, 1.7, 0]} castShadow receiveShadow>
         <meshStandardMaterial color="#fbc02d" />
      </Cylinder>
    </group>
  )
}

// Animated Combine Harvester
export const Harvester = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef()
  const headerRef = useRef()

  useFrame((state) => {
    if (!groupRef.current || !headerRef.current) return
    const t = state.clock.getElapsedTime()
    
    // Heavy slow drive forward
    const moveRange = 10
    const speed = 0.8
    const zPos = Math.sin(t * speed) * moveRange
    
    // Bouncing
    const yPos = Math.abs(Math.sin(t * speed * 4)) * 0.05
    
    // Travel direction
    const travelDir = Math.cos(t * speed) > 0 ? 0 : Math.PI
    
    groupRef.current.position.set(position[0], position[1] + yPos, position[2] + zPos)
    groupRef.current.rotation.set(rotation[0], travelDir, rotation[2])

    // Spin the header reel intensely
    headerRef.current.rotation.x = t * 5
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Box args={[2.5, 2, 4]} position={[0, 1.5, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#2e7d32" />
      </Box>
      {/* Animated front header reel */}
      <group position={[0, 0.8, 2.2]}>
        <Cylinder ref={headerRef} args={[0.5, 0.5, 4.5, 12]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
           <meshStandardMaterial color="#eeeeee" metalness={0.5} roughness={0.5} wireframe />
        </Cylinder>
      </group>
      <Box args={[2.2, 0.5, 2]} position={[0, 2.7, -0.5]} castShadow receiveShadow>
         <meshStandardMaterial color="#1b5e20" />
      </Box>
      <Cylinder args={[1, 1, 0.6, 16]} position={[-1.4, 1, 1]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
        <meshStandardMaterial color="#212121" />
      </Cylinder>
      <Cylinder args={[1, 1, 0.6, 16]} position={[1.4, 1, 1]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
        <meshStandardMaterial color="#212121" />
      </Cylinder>
      <Cylinder args={[0.6, 0.6, 0.5, 16]} position={[-1.2, 0.6, -1.5]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
        <meshStandardMaterial color="#212121" />
      </Cylinder>
      <Cylinder args={[0.6, 0.6, 0.5, 16]} position={[1.2, 0.6, -1.5]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
        <meshStandardMaterial color="#212121" />
      </Cylinder>
      <Cylinder args={[0.15, 0.15, 3, 8]} position={[-1.5, 3, 0]} rotation={[0, 0, Math.PI/4]} castShadow receiveShadow>
         <meshStandardMaterial color="#eeeeee" metalness={0.5} roughness={0.5} />
      </Cylinder>
    </group>
  )
}

// Center Pivot Irrigation System
export const CenterPivot = ({ position = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // Slowly spins 360 degrees around the field
    groupRef.current.rotation.y = -(t * 0.2)
  })

  return (
    <group position={position} scale={scale}>
      {/* Center anchor / pump station */}
      <Cylinder args={[0.4, 0.4, 2]} position={[0, 1, 0]} castShadow receiveShadow>
         <meshStandardMaterial color="#bdbdbd" />
      </Cylinder>
      
      {/* Massive rotating arm structure */}
      <group ref={groupRef} position={[0, 2, 0]}>
         {/* Main Pipe spanning 12 units */}
         <Cylinder args={[0.1, 0.1, 14]} position={[0, 0, -7]} rotation={[Math.PI/2, 0, 0]} castShadow receiveShadow>
           <meshStandardMaterial color="#e0e0e0" />
         </Cylinder>
         
         {/* A-frame wheeled supports spaced along pipe */}
         {[3, 7, 11].map(zPos => (
           <group key={zPos} position={[0, -1, -zPos]}>
             <Cylinder args={[0.05, 0.05, 2.5]} position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI/8]} castShadow>
               <meshStandardMaterial color="#757575" />
             </Cylinder>
             <Cylinder args={[0.05, 0.05, 2.5]} position={[0.8, 0, 0]} rotation={[0, 0, -Math.PI/8]} castShadow>
               <meshStandardMaterial color="#757575" />
             </Cylinder>
             {/* Small rotating wheels */}
             <Cylinder args={[0.3, 0.3, 0.1, 12]} position={[-1.2, -1, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
               <meshStandardMaterial color="#212121" />
             </Cylinder>
             <Cylinder args={[0.3, 0.3, 0.1, 12]} position={[1.2, -1, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
               <meshStandardMaterial color="#212121" />
             </Cylinder>
           </group>
         ))}

         {/* Dropper pipes (simulating water spraying) */}
         {Array.from({length: 12}).map((_, i) => (
           <Cylinder key={i} args={[0.02, 0.02, 1.5]} position={[0, -0.75, -(i+1)]}>
             <meshStandardMaterial color="#81d4fa" transparent opacity={0.6} />
           </Cylinder>
         ))}
      </group>
    </group>
  )
}

// Rising Flood Water Plane
export const FloodPlane = ({ position = [0, 0, 0], scale = 1 }) => {
  const planeRef = useRef()

  useFrame((state) => {
    if (!planeRef.current) return
    const t = state.clock.getElapsedTime()
    // Slowly rises and bobs representing flooded furrows
    const yPos = Math.min(0.2, -0.5 + (t * 0.1)) + (Math.sin(t * 2) * 0.02)
    planeRef.current.position.y = yPos
  })

  return (
    <group position={position} scale={scale}>
      <Plane ref={planeRef} args={[26, 26]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#1e88e5" transparent opacity={0.7} metalness={0.8} roughness={0.1} />
      </Plane>
    </group>
  )
}

// Drifting Volumetric Cloud
export const Cloud = ({ position = [0, 0, 0], scale = 1, speed = 0.2 }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // Slow massive drift in sky
    groupRef.current.position.set(
      position[0] - (t * speed) % 60, 
      position[1] + Math.sin(t * 0.2) * 2, 
      position[2]
    )
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Sphere args={[2, 8, 8]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
      </Sphere>
      <Sphere args={[1.5, 8, 8]} position={[1.5, -0.5, 0.5]} castShadow>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
      </Sphere>
      <Sphere args={[1.8, 8, 8]} position={[-1.5, -0.2, -0.2]} castShadow>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
      </Sphere>
      <Sphere args={[1.2, 8, 8]} position={[0.5, 0.5, -1.2]} castShadow>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
      </Sphere>
    </group>
  )
}
