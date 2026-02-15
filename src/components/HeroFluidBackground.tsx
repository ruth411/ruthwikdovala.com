import { useEffect, useRef } from 'react'

type Props = {
  className?: string
  rounded?: boolean
}

type PointerState = {
  x: number
  y: number
  vx: number
  vy: number
}

const VERT = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const UPDATE_FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_prev;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec2 u_velocity;
uniform float u_radius;
uniform float u_time;

vec3 palette(float t) {
  vec3 a = vec3(0.06, 0.07, 0.12);
  vec3 b = vec3(0.45, 0.20, 0.70);
  vec3 c = vec3(0.10, 0.45, 0.95);
  vec3 d = vec3(0.18, 0.78, 0.56);
  return a + b * sin(6.2831 * (c * t + d));
}

void main() {
  vec2 px = 1.0 / u_res;

  vec2 curl = vec2(
    texture2D(u_prev, v_uv + vec2(0.0, px.y)).r - texture2D(u_prev, v_uv - vec2(0.0, px.y)).r,
    texture2D(u_prev, v_uv + vec2(px.x, 0.0)).g - texture2D(u_prev, v_uv - vec2(px.x, 0.0)).g
  );

  vec2 advectUv = v_uv - 0.012 * curl;
  vec3 prev = texture2D(u_prev, advectUv).rgb;
  prev *= 0.988;

  float d = distance(v_uv, u_mouse);
  float splat = exp(-d * d / max(0.0005, u_radius));
  float motion = length(u_velocity);
  float moveMask = smoothstep(0.0002, 0.003, motion);
  vec3 ink = palette(fract(u_time * 0.03 + motion * 3.0));
  prev += ink * splat * (moveMask * (0.35 + motion * 18.0));

  prev = clamp(prev, 0.0, 1.0);
  gl_FragColor = vec4(prev, 1.0);
}`

const DISPLAY_FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;

void main() {
  vec3 c = texture2D(u_tex, v_uv).rgb;
  vec3 base = vec3(0.04, 0.05, 0.08);
  vec3 mixed = base + c * vec3(0.9, 0.85, 1.0);
  float vignette = smoothstep(0.92, 0.2, distance(v_uv, vec2(0.5)));
  mixed *= vignette;
  gl_FragColor = vec4(mixed, 1.0);
}`

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext, vert: string, frag: string) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vert)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, frag)
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  if (!prog) return null
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog)
    return null
  }
  return prog
}

export default function HeroFluidBackground({ className = '', rounded = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false })
    if (!gl) return

    const updateProgram = createProgram(gl, VERT, UPDATE_FRAG)
    const displayProgram = createProgram(gl, VERT, DISPLAY_FRAG)
    if (!updateProgram || !displayProgram) return

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const mkTex = (w: number, h: number) => {
      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      return tex
    }

    const mkFbo = (tex: WebGLTexture) => {
      const fb = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
      return fb
    }

    const pointer: PointerState = { x: -10, y: -10, vx: 0, vy: 0 }

    let simW = 0
    let simH = 0
    let texA: WebGLTexture | null = null
    let texB: WebGLTexture | null = null
    let fbA: WebGLFramebuffer | null = null
    let fbB: WebGLFramebuffer | null = null

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }

      simW = Math.max(128, Math.floor(w / 2))
      simH = Math.max(128, Math.floor(h / 2))

      if (texA) gl.deleteTexture(texA)
      if (texB) gl.deleteTexture(texB)
      if (fbA) gl.deleteFramebuffer(fbA)
      if (fbB) gl.deleteFramebuffer(fbB)

      texA = mkTex(simW, simH)
      texB = mkTex(simW, simH)
      fbA = mkFbo(texA)
      fbB = mkFbo(texB)
    }

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      const nx = (clientX - rect.left) / rect.width
      const ny = 1 - (clientY - rect.top) / rect.height
      if (!Number.isFinite(nx) || !Number.isFinite(ny)) return
      const clampedX = Math.max(0, Math.min(1, nx))
      const clampedY = Math.max(0, Math.min(1, ny))
      pointer.vx = clampedX - pointer.x
      pointer.vy = clampedY - pointer.y
      pointer.x = clampedX
      pointer.y = clampedY
    }

    const onMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('resize', resize)
    window.visualViewport?.addEventListener('resize', resize)

    resize()

    const posLocUpdate = gl.getAttribLocation(updateProgram, 'a_position')
    const posLocDisplay = gl.getAttribLocation(displayProgram, 'a_position')

    let raf = 0
    const start = performance.now()

    const render = () => {
      if (!texA || !texB || !fbA || !fbB) return

      // update sim texture (A -> B)
      gl.useProgram(updateProgram)
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbB)
      gl.viewport(0, 0, simW, simH)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(posLocUpdate)
      gl.vertexAttribPointer(posLocUpdate, 2, gl.FLOAT, false, 0, 0)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texA)
      gl.uniform1i(gl.getUniformLocation(updateProgram, 'u_prev'), 0)
      gl.uniform2f(gl.getUniformLocation(updateProgram, 'u_res'), simW, simH)
      gl.uniform2f(gl.getUniformLocation(updateProgram, 'u_mouse'), pointer.x, pointer.y)
      gl.uniform2f(gl.getUniformLocation(updateProgram, 'u_velocity'), pointer.vx, pointer.vy)
      gl.uniform1f(gl.getUniformLocation(updateProgram, 'u_radius'), reduced ? 0.012 : 0.006)
      gl.uniform1f(gl.getUniformLocation(updateProgram, 'u_time'), (performance.now() - start) * 0.001)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // display B on screen
      gl.useProgram(displayProgram)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(posLocDisplay)
      gl.vertexAttribPointer(posLocDisplay, 2, gl.FLOAT, false, 0, 0)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texB)
      gl.uniform1i(gl.getUniformLocation(displayProgram, 'u_tex'), 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // swap
      ;[texA, texB] = [texB, texA]
      ;[fbA, fbB] = [fbB, fbA]

      pointer.vx *= 0.94
      pointer.vy *= 0.94
      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      window.visualViewport?.removeEventListener('resize', resize)
      if (buffer) gl.deleteBuffer(buffer)
      if (texA) gl.deleteTexture(texA)
      if (texB) gl.deleteTexture(texB)
      if (fbA) gl.deleteFramebuffer(fbA)
      if (fbB) gl.deleteFramebuffer(fbB)
      gl.deleteProgram(updateProgram)
      gl.deleteProgram(displayProgram)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 block h-screen w-screen ${rounded ? 'rounded-3xl' : ''} ${className}`}
    />
  )
}
