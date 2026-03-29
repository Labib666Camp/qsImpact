import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Sky, Plane, SoftShadows, Cylinder } from '@react-three/drei'
import { useGameStore } from '../store/gameStore'
import stagesData from '../content/stages.json'
import { TilledSoil, Fence, CropField } from './FarmElements'
import { Barn, Silo, Tractor, Farmer, Harvester, Cloud, CenterPivot, FloodPlane } from './Models'

export const SceneManager = () => {
  const { stage, PI, SI, SH, WT, history } = useGameStore()
  
  const currentStageData = stagesData.stages.find(s => s.id === getStageId(stage))
  const environmentType = currentStageData?.environment || "baren"

  // Check history selections
  const choiceIdIncludes = (choiceIdStr) => history.some(h => h.choice === choiceIdStr)

  const isNoTill = choiceIdIncludes('no_till')
  const hasTilling = choiceIdIncludes('deep_tilling')

  // Stage 2: Cropping
  const hasPlanter = choiceIdIncludes('monoculture') || choiceIdIncludes('high_yield_seeds')
  const hasFarmerPlanter = choiceIdIncludes('crop_rotation')

  // Stage 3: Fertilizer
  const hasSprayer = choiceIdIncludes('synthetic_npk')
  const hasFarmerFertilizer = choiceIdIncludes('organic_compost') || choiceIdIncludes('precision_drip')

  // Stage 4: Irrigation
  const hasFlood = choiceIdIncludes('flood_irrigation')
  const hasPivot = choiceIdIncludes('smart_irrigation') || choiceIdIncludes('rainwater_harvest')

  // Stage 5: Harvest
  const hasMachineHarvest = choiceIdIncludes('machine_harvest')
  const hasManualHarvest = choiceIdIncludes('manual_harvest')

  // Base colors mapped to state
  const soilColor = SH < 20 ? '#d2a679' : SH < 40 ? '#A0522D' : SH > 70 ? '#261b17' : '#8B4513'
  // More or less tilled volume
  const tillScale = isNoTill ? 0.2 : 1.0
  
  // Decide which animation to show based strictly on the current stage
  // Stage 1
  const renderStage1 = environmentType === 'baren' && stage === 1
  // Stage 2
  const renderStage2 = environmentType === 'sprouts' && stage === 2
  // Stage 3
  const renderStage3 = environmentType === 'growing' && stage === 3
  // Stage 4
  const renderStage4 = environmentType === 'tall' && stage === 4
  // Stage 5
  const renderStage5 = environmentType === 'golden' && stage === 5

  return (
    <div className="absolute inset-0 z-0 bg-sky-200 cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [20, 18, 25], fov: 40 }}>
        <SoftShadows size={30} samples={15} focus={0.5} />
        <fog attach="fog" args={['#a2c2e0', 25, 90]} />
        <Sky sunPosition={[80, 20, 100]} turbidity={0.4} rayleigh={1.0} />
        <Environment preset="sunset" />
        
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[15, 25, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={2048}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
          shadow-bias={-0.0005}
        />
        
        <group>
          {/* Main Ground */}
          <Plane args={[120, 120]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.6, 0]}>
            <meshStandardMaterial color={isNoTill ? "#4c6e3b" : "#3E4F32"} roughness={1} />
          </Plane>
          
          {/* Background Scenery Elements */}
          <Barn position={[-15, -0.5, -20]} rotation={[0, Math.PI/4, 0]} />
          <Silo position={[-22, -0.5, -15]} />
          
          <Cloud position={[10, 15, -30]} scale={1.5} />
          <Cloud position={[-20, 18, -10]} scale={1.2} />
          <Cloud position={[25, 14, 10]} scale={2.0} />

          {/* Farm Grid Framework */}
          <Fence size={28} />
          
          {/* Tilled lines and Crops */}
          <TilledSoil width={26} depth={26} rowCount={18} color={soilColor} tillScale={tillScale} />
          <CropField piValue={PI} environmentType={environmentType} />
          
          {/* ---- Stage 1: Land Prep ---- */}
          {renderStage1 && hasTilling && <Tractor position={[4, 0, 0]} rotation={[0, -Math.PI/6, 0]} attachment="tiller" />}
          {renderStage1 && isNoTill && <Farmer position={[0, -0.2, 0]} rotation={[0, Math.PI/4, 0]} />}
          {renderStage1 && !hasTilling && !isNoTill && PI === 0 && (
             <Farmer position={[14, -0.2, 14]} rotation={[0, -Math.PI/4, 0]} />
          )}

          {/* ---- Stage 2: Cropping ---- */}
          {renderStage2 && hasPlanter && (
             <Tractor position={[0, 0, 4]} rotation={[0, Math.PI/2, 0]} attachment="planter" />
          )}
          {renderStage2 && hasFarmerPlanter && (
             <group>
               <Farmer position={[-6, -0.2, 5]} moveRange={4} offset={0} />
               <Farmer position={[6, -0.2, -5]} moveRange={3} offset={3.14} />
             </group>
          )}

          {/* ---- Stage 3: Fertilizer ---- */}
          {renderStage3 && hasSprayer && (
             <Tractor position={[-5, 0, 0]} rotation={[0, Math.PI, 0]} attachment="sprayer" />
          )}
          {renderStage3 && hasFarmerFertilizer && (
             <Farmer position={[0, -0.2, 0]} moveRange={6} offset={1.5} />
          )}

          {/* ---- Stage 4: Irrigation ---- */}
          {renderStage4 && hasFlood && <FloodPlane />}
          {renderStage4 && hasPivot && <CenterPivot position={[0, -0.5, 0]} />}

          {/* ---- Stage 5: Harvest ---- */}
          {renderStage5 && hasMachineHarvest && (
             <Harvester position={[-5, -0.2, 0]} rotation={[0, Math.PI/2.5, 0]} />
          )}
          {renderStage5 && hasManualHarvest && (
             <group>
               <Farmer position={[-8, -0.2, -8]} moveRange={2} offset={0} />
               <Farmer position={[8, -0.2, 8]} moveRange={3} offset={2.1} />
               <Farmer position={[-5, -0.2, 5]} moveRange={2} offset={4.5} />
             </group>
          )}

          {/* Water Table Indicator */}
          <group position={[18, -0.5, -18]}>
            <Cylinder args={[3, 3, 3, 32]} position={[0, 0.5, 0]} receiveShadow castShadow>
               <meshStandardMaterial color="#8a7c73" roughness={0.9} />
            </Cylinder>
            <Cylinder args={[2.5, 2.5, 0.2, 32]} position={[0, 1.5 + (-1 + WT/50), 0]}>
               <meshStandardMaterial color={WT < 30 ? "#b0c4de" : "#4169E1"} transparent opacity={0.8} />
            </Cylinder>
          </group>

        </group>

        <OrbitControls 
          enablePan={false}
          maxPolarAngle={Math.PI / 2.3}
          minPolarAngle={Math.PI / 8}
          minDistance={15}
          maxDistance={50}
        />
      </Canvas>
    </div>
  )
}

// Map numeral stage to ID string for JSON lookup
function getStageId(num) {
  const map = {1: 'land_prep', 2: 'cropping', 3: 'fertilizer', 4: 'irrigation', 5: 'harvest'}
  return map[num]
}
