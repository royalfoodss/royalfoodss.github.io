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
        mix(hash(i),hash(i+vec2(1.,0.)),u.x),
        mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),
        u.y
    );
}

void main(){

    vec2 uv=vUv;

    vec2 center=uMouse;

    vec2 p=uv-center;

    float r=length(p);

    float angle=atan(p.y,p.x);

    // Swirl
    angle += (0.18/(r+0.15))*sin(uTime*0.8);

    // Pull inward
    r -= 0.06*exp(-r*6.0);

    vec2 warped=center+vec2(cos(angle),sin(angle))*r;

    float n=noise(warped*8.0+uTime*0.08);

    float pit=smoothstep(0.35,0.0,r);

    float ring=smoothstep(0.23,0.20,r);

    vec3 color=vec3(0.0);

    // Moving gold texture
    color+=vec3(0.04)*n;

    // Gold glow
    color+=vec3(1.0,0.82,0.15)*pit*0.35;

    // Bright ring
    color+=vec3(1.0,0.92,0.55)*ring*0.6;

    gl_FragColor=vec4(color,1.0);

}
`;
