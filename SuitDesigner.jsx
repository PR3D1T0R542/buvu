
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { Vector2, Shape, DoubleSide } from 'three'

const suitColors = [
  { name: 'Navy Blue', value: '#26364b' },
  { name: 'Black', value: '#171717' },
  { name: 'Charcoal', value: '#454545' },
  { name: 'Brown', value: '#654321' },
  { name: 'Burgundy', value: '#702c3b' },
  { name: 'Beige', value: '#b9a17c' }
]

const lapelStyles = ['Notch', 'Peak', 'Shawl']

function createLapelShape(style) {
  const shape = new Shape()

  if (style === 'Peak') {
    shape.moveTo(0.015, 0.28)
    shape.lineTo(0.17, 0.36)
    shape.lineTo(0.12, 0.19)
    shape.lineTo(0.18, 0.12)
    shape.lineTo(0.12, 0.07)
    shape.lineTo(0.055, -0.27)
    shape.lineTo(0.015, -0.14)
  } else if (style === 'Shawl') {
    shape.moveTo(0.015, 0.28)
    shape.quadraticCurveTo(0.17, 0.32, 0.14, 0.18)
    shape.quadraticCurveTo(0.12, 0.12, 0.17, 0.08)
    shape.lineTo(0.12, 0.04)
    shape.lineTo(0.055, -0.27)
    shape.lineTo(0.015, -0.14)
  } else {
    shape.moveTo(0.015, 0.28)
    shape.lineTo(0.145, 0.31)
    shape.lineTo(0.105, 0.20)
    shape.lineTo(0.17, 0.13)
    shape.lineTo(0.12, 0.07)
    shape.lineTo(0.055, -0.27)
    shape.lineTo(0.015, -0.14)
  }

  shape.closePath()
  return shape
}

function LapelPiece({ jacketColor, lapelStyle, side }) {
  const shape = createLapelShape(lapelStyle)

  return (
    <mesh
      scale={[side, 1, 1]}
    >
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial
        color={jacketColor}
        roughness={0.7}
        side={DoubleSide}
      />
    </mesh>
  )
}

function Lapels({ jacketColor, lapelStyle }) {
  return (
    <group position={[0, 1.28, 0.415]}>
      <LapelPiece
        jacketColor={jacketColor}
        lapelStyle={lapelStyle}
        side={-1}
      />

      <LapelPiece
        jacketColor={jacketColor}
        lapelStyle={lapelStyle}
        side={1}
      />
    </group>
  )
}

function Mannequin({ jacketColor, lapelStyle }) {
  const bodyPoints = [
    new Vector2(0.30, 0.25),
    new Vector2(0.33, 0.34),
    new Vector2(0.34, 0.50),
    new Vector2(0.37, 0.72),
    new Vector2(0.40, 0.95),
    new Vector2(0.43, 1.12),
    new Vector2(0.41, 1.22),
    new Vector2(0.34, 1.32),
    new Vector2(0.13, 1.38)
  ]

  return (
    <group position={[0, -0.15, 0]}>

      {/* Head */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.23, 32, 32]} />
        <meshStandardMaterial color="#c9b59b" roughness={0.8} />
      </mesh>

      {/* Shorter Neck */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.09, 0.105, 0.17, 32]} />
        <meshStandardMaterial color="#c9b59b" />
      </mesh>

      {/* Jacket Body */}
      <mesh>
        <latheGeometry args={[bodyPoints, 48]} />
        <meshStandardMaterial
          color={jacketColor}
          roughness={0.75}
        />
      </mesh>

      {/* Jacket Lower Section */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.34, 0.35, 0.18, 32]} />
        <meshStandardMaterial color={jacketColor} roughness={0.75} />
      </mesh>

      {/* Left Shoulder */}
      <mesh position={[-0.34, 1.20, 0]} rotation={[0, 0, -0.25]}>
        <sphereGeometry args={[0.145, 32, 32]} />
        <meshStandardMaterial color={jacketColor} roughness={0.75} />
      </mesh>

      {/* Right Shoulder */}
      <mesh position={[0.34, 1.20, 0]} rotation={[0, 0, 0.25]}>
        <sphereGeometry args={[0.145, 32, 32]} />
        <meshStandardMaterial color={jacketColor} roughness={0.75} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.48, 0.78, 0]} rotation={[0, 0, -0.10]}>
        <cylinderGeometry args={[0.12, 0.105, 0.85, 32]} />
        <meshStandardMaterial color={jacketColor} roughness={0.75} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.48, 0.78, 0]} rotation={[0, 0, 0.10]}>
        <cylinderGeometry args={[0.12, 0.105, 0.85, 32]} />
        <meshStandardMaterial color={jacketColor} roughness={0.75} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.51, 0.30, 0]}>
        <sphereGeometry args={[0.10, 24, 24]} />
        <meshStandardMaterial color="#c9b59b" />
      </mesh>

      <mesh position={[0.51, 0.30, 0]}>
        <sphereGeometry args={[0.10, 24, 24]} />
        <meshStandardMaterial color="#c9b59b" />
      </mesh>

      {/* Trousers */}
      <mesh position={[-0.19, -0.55, 0]}>
        <cylinderGeometry args={[0.17, 0.13, 1.45, 32]} />
        <meshStandardMaterial color="#202a38" roughness={0.8} />
      </mesh>

      <mesh position={[0.19, -0.55, 0]}>
        <cylinderGeometry args={[0.17, 0.13, 1.45, 32]} />
        <meshStandardMaterial color="#202a38" roughness={0.8} />
      </mesh>

      {/* Shoes */}
      <mesh position={[-0.19, -1.32, 0.08]}>
        <boxGeometry args={[0.25, 0.13, 0.42]} />
        <meshStandardMaterial color="#171717" roughness={0.5} />
      </mesh>

      <mesh position={[0.19, -1.32, 0.08]}>
        <boxGeometry args={[0.25, 0.13, 0.42]} />
        <meshStandardMaterial color="#171717" roughness={0.5} />
      </mesh>

      {/* Lapels */}
      <Lapels
        jacketColor={jacketColor}
        lapelStyle={lapelStyle}
      />

    </group>
  )
}

function SuitDesigner() {
  const [jacketColor, setJacketColor] = useState('#26364b')
  const [selectedColor, setSelectedColor] = useState('Navy Blue')
  const [lapelStyle, setLapelStyle] = useState('Notch')

  return (
    <div className="page-content">
      <p className="eyebrow">DESIGN STUDIO</p>
      <h1>Suit Designer</h1>
      <p>Explore and customize your customer's suit in 3D.</p>

      {/* 3D Preview */}
      <div style={{
        marginTop: '30px',
        background: '#1b2230',
        border: '1px solid #303747',
        borderRadius: '14px',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '18px 22px',
          borderBottom: '1px solid #303747',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ color: '#e5c58d' }}>3D Preview</h3>
          <span style={{ color: '#8993a4', fontSize: '13px' }}>
            Drag to rotate • Scroll to zoom
          </span>
        </div>

        <div style={{ height: '560px' }}>
          <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[3, 5, 4]} intensity={2} />
            <directionalLight position={[-3, 2, -2]} intensity={1} />

            <Mannequin
              jacketColor={jacketColor}
              lapelStyle={lapelStyle}
            />

            <ContactShadows
              position={[0, -1.45, 0]}
              opacity={0.4}
              scale={5}
              blur={2}
            />

            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              target={[0, 0.3, 0]}
            />
          </Canvas>
        </div>
      </div>

      {/* Jacket Colours */}
      <div style={{
        marginTop: '25px',
        padding: '25px',
        background: '#1b2230',
        border: '1px solid #303747',
        borderRadius: '14px'
      }}>
        <h2 style={{ fontSize: '19px', marginBottom: '8px' }}>
          Jacket Colour
        </h2>

        <p style={{ color: '#8993a4', fontSize: '14px', marginBottom: '22px' }}>
          Choose a colour for your jacket.
        </p>

        <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
          {suitColors.map((color) => (
            <button
              key={color.name}
              onClick={() => {
                setJacketColor(color.value)
                setSelectedColor(color.name)
              }}
              style={{
                background: 'transparent',
                border: selectedColor === color.name
                  ? '2px solid #e5c58d'
                  : '2px solid transparent',
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                color: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '9px'
              }}
            >
              <span style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: color.value,
                border: '2px solid #8993a4',
                display: 'block'
              }} />
              <span style={{ fontSize: '12px' }}>{color.name}</span>
            </button>
          ))}
        </div>

        <p style={{ color: '#d8b77a', marginTop: '20px', fontSize: '14px' }}>
          Selected: {selectedColor}
        </p>
      </div>

      {/* Lapel Styles */}
      <div style={{
        marginTop: '20px',
        padding: '25px',
        background: '#1b2230',
        border: '1px solid #303747',
        borderRadius: '14px'
      }}>
        <h2 style={{ fontSize: '19px', marginBottom: '8px' }}>
          Lapel Style
        </h2>

        <p style={{ color: '#8993a4', fontSize: '14px', marginBottom: '20px' }}>
          Choose the style of your jacket lapels.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {lapelStyles.map((style) => (
            <button
              key={style}
              onClick={() => setLapelStyle(style)}
              style={{
                padding: '13px 25px',
                borderRadius: '8px',
                border: lapelStyle === style
                  ? '1px solid #d8b77a'
                  : '1px solid #394355',
                background: lapelStyle === style
                  ? '#d8b77a'
                  : '#10141d',
                color: lapelStyle === style
                  ? '#171d29'
                  : '#aeb6c5',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {style}
            </button>
          ))}
        </div>

        <p style={{ color: '#d8b77a', marginTop: '20px', fontSize: '14px' }}>
          Selected: {lapelStyle} Lapel
        </p>
      </div>
    </div>
  )
}

export default SuitDesigner
