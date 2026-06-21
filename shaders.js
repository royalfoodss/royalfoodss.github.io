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

    vec2 mouse=uMouse;

    float d=distance(uv,mouse);

    float pit=smoothstep(.45,.0,d);

    vec2 dir=normalize(mouse-uv);

    uv+=dir*pit*0.08;

    float n=0.0;

    n+=noise(uv*5.0+uTime*.05);
    n+=noise(uv*10.0-uTime*.03)*0.5;
    n+=noise(uv*20.0+uTime*.02)*0.25;

    n/=1.75;

    vec3 color=vec3(0.0);

    color+=vec3(.03)*n;

    color+=vec3(
        1.0,
        .82,
        .15
    )*pow(pit,2.0)*0.25;

    color+=vec3(
        1.0,
        .65,
        .05
    )*n*pit*0.18;

    gl_FragColor=vec4(color,1.0);

}
`;
