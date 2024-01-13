import React, { useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine} from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { loadTrailEffect } from "@tsparticles/effect-trail";
import { loadPolygonPath } from "tsparticles-path-polygon";
import particles from "@/components/particles.json";
import { tsParticles } from "tsparticles-engine";
const Design = () => {
	const [init, setInit] = useState(false);
	useEffect(() => {
		initParticlesEngine(async (engine) => {
            await loadPolygonPath(tsParticles);
            await loadTrailEffect(tsParticles);
			await loadFull(engine);
			//await loadBasic(engine);
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
