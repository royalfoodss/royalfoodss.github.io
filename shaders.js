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

    float dist = distance(uv,mouse);

    float glow = smoothstep(0.40,0.0,dist);

    vec3 color = vec3(0.0);

    color += vec3(
        1.0,
        0.82,
        0.12
    ) * glow * 0.15;

    gl_FragColor = vec4(color,1.0);

}

`;
