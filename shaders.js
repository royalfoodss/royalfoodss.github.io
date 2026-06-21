export const vertexShader = `

varying vec2 vUv;

void main(){

    vUv = uv;

    gl_Position = vec4(position,1.0);

}

`;

export const fragmentShader = `

uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

void main(){

    vec2 uv = vUv;

    vec2 mouse = uMouse;

    float d = distance(uv,mouse);

    float glow = smoothstep(0.45,0.0,d);

    float wave =
        sin((uv.x*12.0)+uTime*0.8) *
        sin((uv.y*12.0)-uTime*0.6);

    wave *= 0.03;

    uv += wave;

    vec3 color = vec3(0.0);

    color += vec3(1.0,0.82,0.15) * glow * 0.18;

    color += vec3(1.0,0.75,0.10) * wave * 0.2;

    gl_FragColor = vec4(color,1.0);

}
`;
