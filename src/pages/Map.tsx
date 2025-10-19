"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import PlanetCanvas from "@/components/ui/PlanetCanvas";

// Solar system data
const SOLAR_SYSTEM = [
  {
    name: "Sun",
    modelPath: "./models/solar_system/sun.glb",
    size: 20.0,
    distance: 0,
    color: "#FFD700",
    description: "The center of our solar system",
    scale: 1.5,
  },
  {
    name: "Mercury",
    modelPath: "./models/solar_system/mercury.glb",
    size: 0.38,
    distance: 0.3,
    color: "#8C7853",
    description: "The smallest planet, closest to the Sun",
    scale: 0.5,
  },
  {
    name: "Venus",
    modelPath: "./models/solar_system/venus.glb",
    size: 0.95,
    distance: 0.45,
    color: "#FFC649",
    description: "The hottest planet in our solar system",
    scale: 0.6,
  },
  {
    name: "Earth",
    modelPath: "./models/solar_system/earth.glb",
    size: 1.0,
    distance: 0.6,
    color: "#6B93D6",
    description: "Our home planet",
    scale: 0.6,
  },
  {
    name: "Mars",
    modelPath: "./models/solar_system/mars.glb",
    size: 0.53,
    distance: 0.75,
    color: "#CD5C5C",
    description: "The red planet",
    scale: 0.5,
  },
  {
    name: "Jupiter",
    modelPath: "./models/solar_system/jupiter.glb",
    size: 11.2,
    distance: 1.05,
    color: "#D8CA9D",
    description: "The largest planet in our solar system",
    scale: 0.4,
  },
  {
    name: "Saturn",
    modelPath: "./models/solar_system/saturn.glb",
    size: 2,
    distance: 1.05,
    color: "#D8CA9D",
    description: "Known for its beautiful rings",
    scale: 0.7,
  },
  {
    name: "Uranus",
    modelPath: "./models/solar_system/uranus.glb",
    size: 4.0,
    distance: 1.65,
    color: "#4FD0E7",
    description: "The ice giant",
    scale: 0.5,
  },
  {
    name: "Neptune",
    modelPath: "./models/solar_system/neptune.glb",
    size: 3.9,
    distance: 1.95,
    color: "#4B70DD",
    description: "The windiest planet",
    scale: 0.5,
  },
  {
    name: "Pluto",
    modelPath: "./models/solar_system/pluto.glb",
    size: 0.18,
    distance: 2.25,
    color: "#C0C0C0",
    description: "A dwarf planet",
    scale: 0.4,
  },
];

const Map: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] =
    useState<typeof SOLAR_SYSTEM[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background layer */}
      <BackgroundBeams />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-24 mb-12 pb-8 relative z-50"
      >
        <h1 className="text-3xl md:text-6xl font-semibold">
          Solar Literacy Map
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto font-light mt-4">
          Click on each planet to learn more about financial literacy.
        </p>
      </motion.div>

      {/* 🌍 Planets Layer (Full width, over sidebar) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-[60%] left-0 right-0 z-10 -translate-y-1/2 w-screen pointer-events-none"
      >
        <div
          ref={containerRef}
          className="relative w-full h-[900px] flex items-center justify-center overflow-x-auto overflow-y-hidden px-16 pointer-events-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex items-center justify-start h-full min-w-max space-x-1">
            {SOLAR_SYSTEM.map((planet, index) => (
              <motion.div
                key={planet.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center cursor-pointer group relative"
                onClick={() => setSelectedPlanet(planet)}
              >
                <div className="relative mb-4">
                  <div
                    className="relative transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          width: `${
                            planet.name === "Sun"
                              ? Math.max(planet.size * 18, 350)
                              : Math.max(planet.size * 80, 300)
                          }px`,
                          height: `${
                            planet.name === "Sun"
                              ? Math.max(planet.size * 18, 350)
                              : Math.max(planet.size * 80, 300)
                          }px`,
                          overflow: "visible"
                    }}
                  >
                    <PlanetCanvas
                      modelPath={planet.modelPath}
                      scale={planet.scale}
                      rotationSpeed={0.01}
                      unlocked={true}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Hover Glow */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${planet.color}40 0%, transparent 70%)`,
                      filter: "blur(8px)",
                      transform: "scale(1.5)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 🪐 Planet Information Modal */}
      {selectedPlanet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => setSelectedPlanet(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full h-full flex items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content based on planet */}
            {selectedPlanet.name === "Sun" ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Lys4EVugJmk?si=omlH4KoAQRHuGNur"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="max-w-6xl max-h-[80vh]"
                />
              </div>
            ) : selectedPlanet.name === "Mercury" ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/LKxOamnP8J4?si=B1YDFTvY5viZmqQe"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="max-w-6xl max-h-[80vh]"
                />
              </div>
            ) : selectedPlanet.name === "Venus" ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/qQLLDPAEzT0?si=umD0PO6brxuv6deg"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="max-w-6xl max-h-[80vh]"
                />
              </div>
            ) : selectedPlanet.name === "Earth" ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/-Qf3XU6prss?si=VElvI_yGnpfg2gEw"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="max-w-6xl max-h-[80vh]"
                />
              </div>
            ) : selectedPlanet.name === "Mars" ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ZhMEUikbVIk?si=f0bilumbGKS7ChFT"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="max-w-6xl max-h-[80vh]"
                />
              </div>
            ) : selectedPlanet.name === "Jupiter" ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/cnW_HDIBmz4?si=2dD72s73AG3U6jS3"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="max-w-6xl max-h-[80vh]"
                />
              </div>
            ) : selectedPlanet.name === "Saturn" ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/n4YoZDQs6VA?si=E9avk83rEB-i_L1X"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="max-w-6xl max-h-[80vh]"
                />
              </div>
            ) : selectedPlanet.name === "Uranus" ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/k-RTEIaYvAg?si=huZMSvNdKT80VE6h"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="max-w-6xl max-h-[80vh]"
                />
              </div>
            ) : selectedPlanet.name === "Neptune" ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/YoOsvcxLy40?si=aA56yIzkKmeLeWLo"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="max-w-6xl max-h-[80vh]"
                />
              </div>
            ) : selectedPlanet.name === "Pluto" ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/jwML94IOW0s?si=3pa5V_L7dQWvUPW_"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="max-w-6xl max-h-[80vh]"
                />
              </div>
            ) : (
              <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl max-w-md w-full relative">
                {/* Planet Preview */}
                <div className="text-center mb-6">
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    <PlanetCanvas
                      modelPath={selectedPlanet.modelPath}
                      scale={selectedPlanet.scale}
                      rotationSpeed={0.02}
                      unlocked={true}
                      className="w-24 h-24"
                    />
                  </div>

                  <h2
                    className="text-2xl font-light text-white mb-2"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {selectedPlanet.name}
                  </h2>
                  <p className="text-white/60 mb-4">{selectedPlanet.description}</p>
                </div>

                {/* Planet Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Relative Size:</span>
                    <span className="text-white">{selectedPlanet.size}x Earth</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Distance from Sun:</span>
                    <span className="text-white">{selectedPlanet.distance} AU</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Color:</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: selectedPlanet.color }}
                      />
                      <span className="text-white">{selectedPlanet.color}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Map;
