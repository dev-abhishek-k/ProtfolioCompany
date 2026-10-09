document.getElementById('year').textContent = new Date().getFullYear();

const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = '☰';
}));

const caseStudies = {
  forma: {
    number: '01 / 03', title: 'Forma', type: 'Identity · Digital',
    description: 'A visual identity concept for a creative platform built around fluid ideas and unexpected connections.',
    approach: 'Warm gradients, sculptural forms, and expressive typography create an identity that feels in motion.'
  },
  sonder: {
    number: '02 / 03', title: 'Sonder', type: 'Art direction · Web experience',
    description: 'An editorial digital concept that gives space to stories, people, and the moments between them.',
    approach: 'Layered circular forms and a restrained palette make the experience calm, curious, and easy to explore.'
  },
  mono: {
    number: '03 / 03', title: 'Monograph', type: 'Strategy · Commerce',
    description: 'A commerce concept for considered everyday objects, presented with the clarity of a design journal.',
    approach: 'A simple visual system puts material, shape, and purpose at the center of each product story.'
  }
};
const dialog = document.querySelector('#case-study');
document.querySelectorAll('[data-project]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const key = link.dataset.project;
  const study = caseStudies[key];
  document.querySelector('#case-number').textContent = study.number;
  document.querySelector('#case-title').textContent = study.title;
  document.querySelector('#case-type').textContent = study.type;
  document.querySelector('#case-description').textContent = study.description;
  document.querySelector('#case-approach').textContent = study.approach;
  document.querySelector('#case-art').className = `dialog-art ${key}`;
  document.querySelector('#case-art').textContent = study.title;
  dialog.showModal();
}));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.1 });
  document.querySelectorAll('.intro h2,.intro p,.work h2,.project,.service-grid,.contact h2').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

const motionToggle = document.querySelector('#motion-toggle');
const formToggle = document.querySelector('#form-toggle');
if (reducedMotion) { motionToggle.hidden = true; formToggle.hidden = true; }

if (!reducedMotion) {
  try {
    const THREE = await import('./node_modules/three/build/three.module.js');
    const holder = document.querySelector('#scene');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 8.5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 700 ? 1.25 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    holder.appendChild(renderer.domElement);

    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const knotGeometry = new THREE.TorusKnotGeometry(1.34, 0.38, 230, 32, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xbaff37, metalness: 0.48, roughness: 0.18,
      clearcoat: 1, clearcoatRoughness: 0.12, side: THREE.DoubleSide
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    sculpture.add(knot);
    const forms = [
      { geometry: knotGeometry, color: 0xbaff37, scale: 1 },
      { geometry: new THREE.IcosahedronGeometry(1.7, 5), color: 0xcaf586, scale: 0.94 },
      { geometry: new THREE.TorusGeometry(1.5, 0.48, 32, 150), color: 0xedffac, scale: 1.05 }
    ];
    let formIndex = 0;
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.35, 2), 24),
      new THREE.LineBasicMaterial({ color: 0xaaff52, transparent: true, opacity: 0.16 })
    );
    sculpture.add(wire);
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.68, 0.012, 8, 160),
      new THREE.MeshBasicMaterial({ color: 0xcaff76, transparent: true, opacity: 0.4 })
    );
    orbit.rotation.set(0.9, 0.35, 0.1);
    sculpture.add(orbit);
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.28, 2),
      new THREE.MeshBasicMaterial({ color: 0xe7ffbd, wireframe: true, transparent: true, opacity: 0.45 })
    );
    sculpture.add(core);

    const count = innerWidth < 700 ? 85 : 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 9;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(particleGeometry, new THREE.PointsMaterial({
      color: 0xd6ff99, size: 0.025, transparent: true, opacity: 0.65, sizeAttenuation: true
    }));
    scene.add(stars);
    scene.add(new THREE.AmbientLight(0xd4e9bd, 1.5));
    const key = new THREE.PointLight(0xffffff, 75);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x9eff25, 95);
    rim.position.set(4, -2, 2);
    scene.add(rim);

    let pointerX = 0, pointerY = 0, scroll = 0, visible = true, paused = false;
    let frame = 0, last = 0, elapsed = 0, formScale = 1;
    addEventListener('pointermove', event => {
      pointerX = (event.clientX / innerWidth - 0.5) * 0.55;
      pointerY = (event.clientY / innerHeight - 0.5) * 0.42;
    }, { passive: true });
    addEventListener('scroll', () => { scroll = Math.min(scrollY / Math.max(holder.clientHeight, 1), 1); }, { passive: true });

    const layout = () => {
      const width = holder.clientWidth, height = holder.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      sculpture.position.x = width < 700 ? 0.65 : width < 1000 ? 1.55 : 2.35;
      sculpture.position.y = width < 700 ? -1.28 : width < 1000 ? -0.48 : 0;
      sculpture.scale.setScalar(width < 550 ? 0.62 : width < 1000 ? 0.78 : 1);
      renderer.render(scene, camera);
    };
    addEventListener('resize', layout, { passive: true });
    layout();

    const render = time => {
      frame = 0;
      if (!visible || paused) return;
      const delta = Math.min((time - (last || time)) / 1000, 0.05);
      last = time;
      elapsed += delta;
      sculpture.rotation.x += (pointerY * 0.28 + elapsed * 0.14 - sculpture.rotation.x) * 0.04;
      sculpture.rotation.y += (pointerX * 0.28 + elapsed * 0.22 + scroll * 0.6 - sculpture.rotation.y) * 0.04;
      knot.rotation.z = Math.sin(elapsed * 0.34) * 0.16;
      knot.scale.setScalar(THREE.MathUtils.lerp(knot.scale.x, formScale, 0.08));
      wire.rotation.set(elapsed * -0.055, elapsed * 0.085, elapsed * 0.035);
      orbit.rotation.z = elapsed * 0.12;
      stars.rotation.y = elapsed * 0.008;
      camera.position.y += (-scroll * 0.28 - camera.position.y) * 0.04;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    const start = () => { if (!frame && visible && !paused) { last = 0; frame = requestAnimationFrame(render); } };
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else { cancelAnimationFrame(frame); frame = 0; }
    }).observe(holder);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else start();
    });
    motionToggle.addEventListener('click', () => {
      paused = !paused;
      motionToggle.setAttribute('aria-pressed', String(paused));
      motionToggle.setAttribute('aria-label', paused ? 'Play 3D animation' : 'Pause 3D animation');
      motionToggle.innerHTML = paused ? 'PLAY MOTION <span aria-hidden="true">▶</span>' : 'PAUSE MOTION <span aria-hidden="true">Ⅱ</span>';
      if (paused) { cancelAnimationFrame(frame); frame = 0; }
      else start();
    });
    formToggle.addEventListener('click', () => {
      formIndex = (formIndex + 1) % forms.length;
      const form = forms[formIndex];
      knot.geometry = form.geometry;
      knotMaterial.color.setHex(form.color);
      formScale = form.scale;
      if (paused) renderer.render(scene, camera);
    });
    start();
  } catch (error) {
    motionToggle.hidden = true;
    formToggle.hidden = true;
    console.info('3D scene unavailable; portfolio remains usable.', error);
  }
}
