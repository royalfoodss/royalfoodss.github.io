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

float random(vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 st){

    vec2 i=floor(st);
    vec2 f=fract(st);

    float a=random(i);
    float b=random(i+vec2(1.0,0.0));
    float c=random(i+vec2(0.0,1.0));
    float d=random(i+vec2(1.0,1.0));

    vec2 u=f*f*(3.0-2.0*f);

    return mix(a,b,u.x)
         + (c-a)*u.y*(1.0-u.x)
         + (d-b)*u.x*u.y;
}

void main(){

    vec2 uv=vUv;

    //--------------------------
    // Cursor
    //--------------------------

    vec2 center=uMouse;

    vec2 dir=center-uv;

    float dist=length(dir);

    //--------------------------
    // Gravity Strength
    //--------------------------

    float gravity=smoothstep(.45,.0,dist);

    //--------------------------
    // Pull the background
    //--------------------------

    uv+=normalize(dir)*gravity*0.06;

    //--------------------------
    // Subtle swirl
    //--------------------------

    float angle=gravity*0.8;

    float s=sin(angle);
    float c=cos(angle);

    uv-=center;

    uv=mat2(c,-s,s,c)*uv;

    uv+=center;

    //--------------------------
    // Marble Noise
    //--------------------------

    float n=0.0;

    n+=noise(uv*4.0+uTime*0.02);
    n+=noise(uv*8.0-uTime*0.01)*0.5;
    n+=noise(uv*16.0)*0.25;

    n/=1.75;

    //--------------------------
    // Almost black
    //--------------------------

    vec3 color=vec3(0.0);

    color+=vec3(n*0.025);

    //--------------------------
    // Dark pit
    //--------------------------

    float pit=exp(-dist*22.0);

    color-=pit*0.18;

    gl_FragColor=vec4(color,1.0);

}
`;
