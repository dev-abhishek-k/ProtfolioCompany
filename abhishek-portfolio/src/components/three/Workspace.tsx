'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Workspace(){
  const mount=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const host=mount.current;if(!host)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(0,1.2,8.8);
    let renderer:THREE.WebGLRenderer;
    try {renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});} catch {return;}
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));renderer.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0x7f9ccc,2.2));
    const key=new THREE.PointLight(0x00e5ff,38,15);key.position.set(-3,3,4);scene.add(key);
    const fill=new THREE.PointLight(0x8b5cf6,32,12);fill.position.set(4,-1,3);scene.add(fill);
    const rig=new THREE.Group();scene.add(rig);
    const dark=new THREE.MeshStandardMaterial({color:0x161e35,metalness:.68,roughness:.25});
    const edge=new THREE.MeshStandardMaterial({color:0x35415b,metalness:.8,roughness:.2});
    const cyan=new THREE.MeshBasicMaterial({color:0x00e5ff});
    const base=new THREE.Mesh(new THREE.BoxGeometry(4.3,.13,2.55),dark);base.position.set(0,-1.18,.72);rig.add(base);
    const rim=new THREE.Mesh(new THREE.BoxGeometry(4.35,.035,2.59),edge);rim.position.set(0,-1.1,.72);rig.add(rim);
    const keys=new THREE.Group();for(let row=0;row<4;row++)for(let col=0;col<13;col++){const k=new THREE.Mesh(new THREE.BoxGeometry(.23,.012,.15),new THREE.MeshStandardMaterial({color:(row+col)%9===0?0x0f6e83:0x283347,metalness:.2}));k.position.set((col-6)*.295,-1.077,-.05+row*.32);keys.add(k);}rig.add(keys);
    const lid=new THREE.Group();lid.position.set(0,-1.08,-.55);lid.rotation.x=-.17;rig.add(lid);
    const shell=new THREE.Mesh(new THREE.BoxGeometry(4.3,2.7,.13),dark);shell.position.y=1.35;lid.add(shell);
    const display=new THREE.Mesh(new THREE.PlaneGeometry(4.03,2.43),new THREE.MeshBasicMaterial({color:0x071322,side:THREE.DoubleSide}));display.position.set(0,1.35,.075);lid.add(display);
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=620;const ctx=canvas.getContext('2d');
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
    const code=new THREE.Mesh(new THREE.PlaneGeometry(3.98,2.39),new THREE.MeshBasicMaterial({map:texture,transparent:true}));code.position.set(0,1.35,.085);lid.add(code);
    const lines=['const developer = {','  name: "Abhishek",','  focus: "Full Stack",','  craft: [','    "interfaces",','    "systems",','    "experiences"','  ]','};','','buildSomethingAmazing();'];
    function draw(t:number){if(!ctx)return;ctx.fillStyle='#071322';ctx.fillRect(0,0,1024,620);ctx.fillStyle='#0c1f33';ctx.fillRect(26,25,972,570);ctx.fillStyle='#102c44';ctx.fillRect(26,25,972,51);['#fb7185','#fbbf24','#34d399'].forEach((c,i)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(58+i*27,50,7,0,Math.PI*2);ctx.fill();});ctx.font='24px monospace';ctx.fillStyle='#4b6b82';ctx.fillText('abhishek / workspace.ts',145,58);ctx.font='32px monospace';lines.forEach((line,i)=>{ctx.fillStyle=i===0||i===10?'#6ce8ee':i===1||i===2?'#d1b4ff':'#b7c8da';ctx.fillText(line,95,125+i*40);});ctx.fillStyle='#00e5ff';if(Math.floor(t/500)%2===0)ctx.fillRect(95+ctx.measureText(lines[10]).width,125+10*40-27,17,31);texture.needsUpdate=true;}
    const orbit=new THREE.Group();scene.add(orbit);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.62,.036,10,80),new THREE.MeshBasicMaterial({color:0x00e5ff}));ring.position.set(2.6,1.45,.4);ring.rotation.y=.45;orbit.add(ring);
    const atom=new THREE.Group();const ball=new THREE.Mesh(new THREE.IcosahedronGeometry(.11),cyan);atom.add(ball);for(let i=0;i<3;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(.43,.015,6,60),new THREE.MeshBasicMaterial({color:0x5ce8ff}));r.rotation.set(i*.9,i*.8,i*.5);atom.add(r);}atom.position.set(2.6,1.45,.4);orbit.add(atom);
    const db=new THREE.Group();const dbMat=new THREE.MeshBasicMaterial({color:0x9d7aff,wireframe:true});for(let i=0;i<3;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.22,24),dbMat);c.position.y=i*.24;db.add(c);}db.position.set(-2.65,.35,.4);orbit.add(db);
    const particleGeo=new THREE.BufferGeometry();const count=window.innerWidth<700?45:115;const positions=new Float32Array(count*3);for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*12;positions[i*3+1]=(Math.random()-.5)*8;positions[i*3+2]=(Math.random()-.5)*5;}particleGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));const particles=new THREE.Points(particleGeo,new THREE.PointsMaterial({color:0x70a9c9,size:.025,transparent:true,opacity:.72}));scene.add(particles);
    let mouseX=0,mouseY=0,scroll=0,frame=0,visible=true;const clock=new THREE.Clock();
    const onMove=(e:PointerEvent)=>{mouseX=(e.clientX/window.innerWidth-.5)*2;mouseY=(e.clientY/window.innerHeight-.5)*2;};
    const onScroll=()=>{scroll=Math.min(1.5,window.scrollY/window.innerHeight);};
    const resize=()=>{const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);};resize();
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting; if(visible&&!frame)tick();},{threshold:0});observer.observe(host);
    const tick=()=>{frame=0;if(!visible||document.hidden)return;const t=clock.getElapsedTime();const lerp=(a:number,b:number)=>a+(b-a)*.045;rig.rotation.y=lerp(rig.rotation.y,mouseX*.18+Math.sin(t*.28)*.08+scroll*.36);rig.rotation.x=lerp(rig.rotation.x,-mouseY*.1+scroll*.13);rig.position.y=lerp(rig.position.y,Math.sin(t*.8)*.1-scroll*.45);rig.scale.setScalar(1-Math.min(scroll*.16,.25));orbit.rotation.y=t*.18+scroll*.5;atom.rotation.y=t*.6;db.position.y=.35+Math.sin(t*1.2)*.15;particles.rotation.y=t*.008+scroll*.13;if(!reduced&&Math.floor(t*2)%2===0)draw(t*1000);renderer.render(scene,camera);frame=requestAnimationFrame(tick);};draw(0);tick();
    window.addEventListener('pointermove',onMove);window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',resize);const onVisibility=()=>{if(!document.hidden&&!frame)tick()};document.addEventListener('visibilitychange',onVisibility);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',onMove);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',onVisibility);scene.traverse(o=>{if(o instanceof THREE.Mesh||o instanceof THREE.Points){o.geometry.dispose();const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>m.dispose());}});texture.dispose();renderer.dispose();renderer.domElement.remove();};
  },[]);
  return <div ref={mount} className="workspace" aria-label="Animated 3D developer laptop" role="img"/>;
}
