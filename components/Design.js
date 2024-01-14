import React, { useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine} from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particles from "@/components/particles.json";
import { tsParticles } from "tsparticles-engine";
import { loadFirePreset } from "@tsparticles/preset-fire";

const Design = () => {
	const [init, setInit] = useState(false);
	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadFirePreset(tsParticles);
			await loadFull(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	const particlesLoaded = (container) => {
		console.log(container);
	};

	return (
		<div>
			{init && <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={particles} />} 
		</div>
	);
};

export default Design;
