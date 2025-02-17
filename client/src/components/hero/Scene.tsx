import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { Noise } from 'noisejs';

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vec3 color = vec3(0.6, 0.4, 1.0);
    vec3 glowColor = vec3(0.8, 0.5, 1.0);

    float strength = distance(gl.PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);

    vec3 finalColor = mix(color, glowColor, sin(time * 0.5) * 0.5 + 0.5);
    gl_FragColor = vec4(finalColor * strength, strength);
  }
`;

const vertexShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normal;
    vec3 pos = position;

    float displacement = sin(time * 2.0 + position.x * 2.0) * 0.1 +
                        cos(time * 1.5 + position.y * 2.0) * 0.1;

    pos += normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0;
  }
`;

export default function Scene() {
  const prismRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const noise = new Noise(Math.random());

  useEffect(() => {
    // Initialize prism with enhanced material
    if (prismRef.current) {
      const material = new THREE.MeshPhongMaterial({
        color: 0x9d6dff,
        emissive: 0x5c1eff,
        emissiveIntensity: 0.5,
        shininess: 50,
      });
      prismRef.current.material = material;
    }

    // Initialize particle system
    if (particlesRef.current) {
      const particleCount = 3000;
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 1] = (Math.random() - 0.5) * 15;
        positions[i + 2] = (Math.random() - 0.5) * 15;

        velocities[i] = (Math.random() - 0.5) * 0.02;
        velocities[i + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i + 2] = (Math.random() - 0.5) * 0.02;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      if (particlesRef.current) {
        particlesRef.current.geometry = geometry;
        particlesRef.current.material = material;
      }
    }
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    try {
      if (prismRef.current && groupRef.current) {
        // Smooth prism animation
        prismRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
        prismRef.current.rotation.y = Math.cos(time * 0.2) * 0.2;
        prismRef.current.position.y = Math.sin(time * 0.5) * 0.1;

        // Smooth group rotation
        groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.3;
      }

      // Particle system animation
      if (particlesRef.current?.geometry && particlesRef.current.material instanceof THREE.ShaderMaterial) {
        particlesRef.current.material.uniforms.time.value = time;

        const positions = particlesRef.current.geometry.attributes.position;
        const velocities = particlesRef.current.geometry.attributes.velocity;

        if (positions && velocities && positions.array && velocities.array) {
          for (let i = 0; i < positions.count * 3; i += 3) {
            positions.array[i] += velocities.array[i] + noise.perlin3(time * 0.1, positions.array[i] * 0.1, positions.array[i + 1] * 0.1) * 0.02;
            positions.array[i + 1] += velocities.array[i + 1] + noise.perlin3(positions.array[i] * 0.1, time * 0.1, positions.array[i + 2] * 0.1) * 0.02;
            positions.array[i + 2] += velocities.array[i + 2] + noise.perlin3(positions.array[i + 2] * 0.1, positions.array[i] * 0.1, time * 0.1) * 0.02;

            for (let j = 0; j < 3; j++) {
              if (Math.abs(positions.array[i + j]) > 7) {
                positions.array[i + j] *= -0.95;
                velocities.array[i + j] *= -0.95;
              }
            }
          }
          positions.needsUpdate = true;
        }
      }
    } catch (error) {
      console.error('Animation error:', error);
    }
  });

  return (
    <>
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.5} luminanceSmoothing={0.9} />
        <ChromaticAberration offset={[0.002, 0.002]} />
      </EffectComposer>
      <group ref={groupRef}>
        <mesh ref={prismRef}>
          <coneGeometry args={[1, 2, 6]} />
        </mesh>
        <points ref={particlesRef}>
          <pointsMaterial />
        </points>
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="purple" />
        <ambientLight intensity={0.5} />
      </group>
    </>
  );
}