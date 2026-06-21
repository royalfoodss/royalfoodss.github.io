export const vertexShader = `

varying vec2 vUv;

void main(){

    vUv = uv;

    gl_Position = vec4(position,1.0);

}

`;

export const fragmentShader = `

uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;

float hash(vec2 p){
    return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);
}

float noise(vec2 p){
    vec2 i=floor(p);
    vec2 f=fract(p);

    vec2 u=f*f*(3.0-2.0*f);

    return mix(
        mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),
        mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),
        u.y
    );
}

void main(){

    vec2 uv = vUv;

    vec2 center = uMouse;

    vec2 p = uv - center;

    float r = length(p);

    float angle = atan(p.y,p.x);

    //-----------------------------
    // Gravity Distortion
    //-----------------------------

    float gravity = 0.15 * exp(-r*5.5);

    p *= (1.0 - gravity);

    //-----------------------------
    // Swirl
    //-----------------------------

    angle += gravity * 4.0;

    vec2 warped =
        center +
        vec2(cos(angle),sin(angle)) *
        length(p);

    //-----------------------------
    // Liquid Noise
    //-----------------------------

    float n = 0.0;

    n += noise(warped*6.0 + uTime*0.04);
    n += noise(warped*12.0 - uTime*0.03)*0.5;
    n += noise(warped*24.0 + uTime*0.02)*0.25;

    n /= 1.75;

    //-----------------------------
    // Glow
    //-----------------------------

    float glow = smoothstep(.40,.0,r);

    //-----------------------------
    // Gold Ring
    //-----------------------------

    float ring =
        smoothstep(.20,.18,r)
      - smoothstep(.18,.16,r);

    //-----------------------------
    // Dark Core
    //-----------------------------

    float core =
        smoothstep(.06,.03,r);

    //-----------------------------
    // Final Color
    //-----------------------------

    vec3 color = vec3(0.0);

    // subtle moving background

    color += vec3(0.02) * n;

    // flowing gold

    color += vec3(1.0,0.80,0.12)
             * glow
             * n
             * 0.45;

    // bright ring

    color += vec3(1.0,0.92,0.55)
             * ring
             * 1.2;

    // black hole center

    color *= (1.0-core);

    gl_FragColor = vec4(color,1.0);

}
`;
