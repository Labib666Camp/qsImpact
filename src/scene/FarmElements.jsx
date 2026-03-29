import { useMemo } from 'react'
import { Instances, Instance } from '@react-three/drei'

// Procedural Soil Rows (Tilled land)
export const TilledSoil = ({ width = 30, depth = 30, rowCount = 15, color = '#613c24', tillScale = 1 }) => {
  const spacing = width / rowCount
  return (
    <group position={[0, -0.3, 0]}>
      {Array.from({ length: rowCount }).map((_, i) => (
        <mesh 
          key={`row-${i}`} 
          position={[-width/2 + (i * spacing) + spacing/2, 0, 0]} 
          rotation={[Math.PI/2, 0, 0]}
          receiveShadow 
          castShadow
        >
          <cylinderGeometry args={[0.3 * tillScale, 0.4 * tillScale, depth, 5]} />
          <meshStandardMaterial color={color} roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

// Procedural Wooden Fence
export const Fence = ({ size = 30 }) => {
  const posts = 12
  const spacing = size / posts
  const half = size / 2

  const generateFenceLine = (axis, position) => {
    return (
      <group position={position}>
        {/* Horizontal rails */}
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={axis === 'x' ? [size, 0.1, 0.05] : [0.05, 0.1, size]} />
          <meshStandardMaterial color="#8B5A2B" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={axis === 'x' ? [size, 0.1, 0.05] : [0.05, 0.1, size]} />
          <meshStandardMaterial color="#8B5A2B" roughness={0.9} />
        </mesh>
        
        {/* Vertical Posts */}
        {Array.from({ length: posts + 1 }).map((_, i) => (
          <mesh 
            key={`post-${i}`} 
            position={axis === 'x' ? [-half + i*spacing, 0.5, 0] : [0, 0.5, -half + i*spacing]} 
            castShadow receiveShadow
          >
            <boxGeometry args={[0.2, 1.2, 0.2]} />
            <meshStandardMaterial color="#6E4225" roughness={1} />
          </mesh>
        ))}
      </group>
    )
  }

  return (
    <group>
      {generateFenceLine('x', [0, 0, -half])}
      {generateFenceLine('x', [0, 0, half])}
      {generateFenceLine('z', [-half, 0, 0])}
      {generateFenceLine('z', [half, 0, 0])}
    </group>
  )
}

const DetailedCornField = ({ count, type }) => {
  const maxRadius = 13 // fit inside the fence

  // We pre-generate consistent positions so we can layer multiple instance meshes perfectly aligned
  const seeds = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
       x: (Math.random() - 0.5) * maxRadius * 2,
       z: (Math.random() - 0.5) * maxRadius * 2,
       rotY: Math.random() * Math.PI,
       scale: Math.random() * 0.3 + 0.8
    }))
  }, [count])

  if (type === 'sprouts') {
    return (
      <Instances range={count} castShadow receiveShadow>
        <coneGeometry args={[0.15, 0.4, 4]} />
        <meshStandardMaterial color="#88F965" />
        {seeds.map((s, i) => (
           <Instance 
             key={i} 
             position={[s.x, 0.2, s.z]}
             rotation={[0, s.rotY, 0]}
             scale={s.scale * 0.8}
           />
        ))}
      </Instances>
    )
  }

  if (type === 'growing') {
    return (
      <group>
        {/* Main short Stalk */}
        <Instances range={count} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.12, 1.2, 5]} />
          <meshStandardMaterial color="#32CD32" />
          {seeds.map((s, i) => (
            <Instance key={`stalk-${i}`} position={[s.x, 0.6, s.z]} rotation={[0, s.rotY, 0]} scale={s.scale} />
          ))}
        </Instances>
        {/* Leaf Blades */}
        <Instances range={count} castShadow receiveShadow>
          <coneGeometry args={[0.15, 0.6, 3]} />
          <meshStandardMaterial color="#2E8B57" />
          {seeds.map((s, i) => (
            <Instance key={`leaf-${i}`} position={[s.x, 0.5, s.z]} rotation={[Math.PI/4, s.rotY, 0]} scale={s.scale} />
          ))}
        </Instances>
      </group>
    )
  }

  if (type === 'tall') {
    return (
      <group>
        {/* Tall Stalk */}
        <Instances range={count} castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.15, 2.8, 6]} />
          <meshStandardMaterial color="#228B22" />
          {seeds.map((s, i) => (
            <Instance key={`stalk-${i}`} position={[s.x, 1.4, s.z]} rotation={[0, s.rotY, 0]} scale={s.scale} />
          ))}
        </Instances>
        {/* Large Leaf Blades */}
        <Instances range={count} castShadow receiveShadow>
          <coneGeometry args={[0.2, 1.0, 3]} />
          <meshStandardMaterial color="#006400" />
          {seeds.map((s, i) => (
            <Instance key={`leaf1-${i}`} position={[s.x, 1.0, s.z]} rotation={[Math.PI/3, s.rotY, 0]} scale={s.scale} />
          ))}
        </Instances>
        {/* Lower Leaves */}
        <Instances range={count} castShadow receiveShadow>
          <coneGeometry args={[0.2, 0.8, 3]} />
          <meshStandardMaterial color="#228B22" />
          {seeds.map((s, i) => (
            <Instance key={`leaf2-${i}`} position={[s.x, 1.5, s.z]} rotation={[Math.PI/2.5, s.rotY + Math.PI, 0]} scale={s.scale} />
          ))}
        </Instances>
        {/* Early Corn Ear */}
        <Instances range={count} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.4, 6]} />
          <meshStandardMaterial color="#9E9D24" />
          {seeds.map((s, i) => (
            <Instance key={`ear-${i}`} position={[s.x + 0.1, 1.8, s.z + 0.1]} rotation={[0, s.rotY, Math.PI/8]} scale={s.scale} />
          ))}
        </Instances>
      </group>
    )
  }

  if (type === 'golden') {
    return (
      <group>
        {/* Dying Golden Stalk */}
        <Instances range={count} castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.15, 2.8, 6]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.8} />
          {seeds.map((s, i) => (
            <Instance key={`stalk-${i}`} position={[s.x, 1.4, s.z]} rotation={[0, s.rotY, 0]} scale={s.scale} />
          ))}
        </Instances>
        {/* Shriveled Leaves */}
        <Instances range={count} castShadow receiveShadow>
          <coneGeometry args={[0.15, 0.8, 3]} />
          <meshStandardMaterial color="#BDB76B" roughness={0.9} />
          {seeds.map((s, i) => (
            <Instance key={`leaf-${i}`} position={[s.x, 1.2, s.z]} rotation={[Math.PI/2.2, s.rotY, 0]} scale={s.scale} />
          ))}
        </Instances>
        {/* Ripe Corn Ear */}
        <Instances range={count} castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.5, 6]} />
          <meshStandardMaterial color="#FFD700" />
          {seeds.map((s, i) => (
            <Instance key={`ear-${i}`} position={[s.x + 0.12, 1.8, s.z + 0.12]} rotation={[0, s.rotY, Math.PI/6]} scale={s.scale} />
          ))}
        </Instances>
      </group>
    )
  }

  return null
}

export const CropField = ({ piValue, environmentType }) => {
  if (environmentType === 'baren') return null
  
  // Base off Production Index
  const count = Math.max(10, Math.floor(piValue * 2.5)) // up to 250 instances
  
  return <DetailedCornField count={count} type={environmentType} />
}
