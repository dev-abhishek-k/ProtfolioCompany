'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PhoneScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current; if (!el || !window.matchMedia('(min-width: 720px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 100); camera.position.z = 8.3;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7)); renderer.setSize(el.clientWidth, el.clientHeight); el.appendChild(renderer.domElement);
    const phone = new THREE.Group(); scene.add(phone);
    const shellMat = new THREE.MeshPhysicalMaterial({ color: 0x30252b, metalness: .8, roughness: .19, clearcoat: 1 });
    const trimMat = new THREE.MeshPhysicalMaterial({ color: 0xe8c6a1, metalness: .8, roughness: .15 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.26, 4.58, .19), shellMat); phone.add(body);
    const trim = new THREE.Mesh(new THREE.BoxGeometry(2.3, 4.62, .12), trimMat); trim.position.z = -.025; phone.add(trim);
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 1024; const ctx = canvas.getContext('2d')!;
    ctx.fillStyle='#f9eee8'; ctx.fillRect(0,0,512,1024); ctx.fillStyle='#241c20'; ctx.font='bold 28px Arial'; ctx.fillText('THE EDIT',35,66); ctx.font='19px Arial';ctx.fillText('✦',445,64);
    const photo = new Image(); photo.crossOrigin='anonymous'; photo.src='https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80';
    const draw = () => { try {ctx.drawImage(photo,20,106,472,690);} catch {} ctx.fillStyle='#241c20';ctx.font='bold 24px Arial';ctx.fillText('A little more magic',30,850);ctx.font='18px Arial';ctx.fillText('STYLE  /  STORIES  /  MOMENTS',30,885); texture.needsUpdate=true; }; photo.onload=draw;
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace=THREE.SRGBColorSpace;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.08,4.34),new THREE.MeshBasicMaterial({map:texture}));screen.position.z=.105;phone.add(screen);
    const notch = new THREE.Mesh(new THREE.BoxGeometry(.59,.095,.015),shellMat);notch.position.set(0,2.13,.12);phone.add(notch);
    const glow = new THREE.PointLight(0xff6b9a, 45, 10);glow.position.set(-2,2,3);scene.add(glow);scene.add(new THREE.AmbientLight(0xffffff,2.4));
    let mx=0,my=0, scroll=0, raf=0; const pointer=(e:PointerEvent)=>{mx=(e.clientX/window.innerWidth-.5)*.25;my=(e.clientY/window.innerHeight-.5)*.18};const onScroll=()=>{scroll=window.scrollY/window.innerHeight};
    const resize=()=>{const w=el.clientWidth,h=el.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)}; const observer=new ResizeObserver(resize);observer.observe(el);
    window.addEventListener('pointermove',pointer);window.addEventListener('scroll',onScroll,{passive:true});
    const tick=(t:number)=>{phone.rotation.y=.29+Math.sin(t*.00045)*.11+mx+Math.min(scroll,2)*.22;phone.rotation.x=-.08+my+Math.sin(t*.0006)*.025;phone.rotation.z=-.085+Math.sin(t*.00035)*.025;phone.position.y=Math.sin(t*.00065)*.09;renderer.render(scene,camera);raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('pointermove',pointer);window.removeEventListener('scroll',onScroll);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose())}});texture.dispose();renderer.dispose();el.removeChild(renderer.domElement)};
  },[]);
  return <div ref={host} className="phone-scene" aria-hidden="true"/>;
}
