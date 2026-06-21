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

//------------------------------
// Grid
//------------------------------

float grid(vec2 uv,float size,float width){

    vec2 g=abs(fract(uv*size)-0.5);

    float line=min(g.x,g.y);

    return smoothstep(width,0.0,line);

}

void main(){

    vec2 uv=vUv;

    vec2 center=uMouse;

    //------------------------------
    // Gravity
    //------------------------------

    vec2 dir = center - uv;

float dist = length(dir);

// Strong gravity only near cursor
float gravity = smoothstep(0.45,0.0,dist);

// Falloff curve
gravity = pow(gravity,2.2);

// Pull inward
uv += normalize(dir) * gravity * 0.12;

// Sink effect
uv.y += gravity * gravity * 0.05;

    //------------------------------
    // Swirl
    //------------------------------

    vec2 p = uv - center;

float r = length(p);

float theta = atan(p.y,p.x);

// Swirl stronger near center
theta += gravity * 1.6;

p = vec2(cos(theta), sin(theta)) * r;

uv = center + p;

    //------------------------------
    // Perspective Grid
    //------------------------------

    float g1=grid(uv,25.0,.018);

    //------------------------------
    // Background
    //------------------------------

    vec3 color=vec3(0.0);

    color+=vec3(.08)*g1;

    //------------------------------
    // Dark Pit
    //------------------------------

   float pit = pow(smoothstep(.35,.0,dist),3.0);

color *= 1.0 - pit;
    //------------------------------
    // Small Cursor Glow
    //------------------------------

    color+=vec3(
        1.0,
        .82,
        .12
    )*pit*.08;

    gl_FragColor=vec4(color,1.0);

}
`;
