import{readFileSync,readdirSync,mkdirSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
function run(p,q){
let S=[],C=[],M=new Int32Array(256),o=new Uint8Array(65536),n=p.length,pc=0,s=0,l=0,i=0;
const d=e=>[o.slice(0,l),e];
for(;;){
if(s==1e6)return d(10);
if(pc<0||pc>=n)return d(9);
let op=p[pc],im=op==1?1:op==2?4:op>47&&op<52?2:0;
if(pc+im>=n)return d(9);
s++;pc+=1+im;
if(op==0)return d(0);
if(op<8){
if(op==1){if(S.length>255)return d(3);S.push((p[pc-1]<<24)>>24)}
else if(op==2){if(S.length>255)return d(3);S.push(p[pc-4]|p[pc-3]<<8|p[pc-2]<<16|p[pc-1]<<24)}
else if(op==3){if(!S.length)return d(2);S.pop()}
else if(op==4){if(!S.length)return d(2);if(S.length>255)return d(3);S.push(S[S.length-1])}
else if(op==5){if(S.length<2)return d(2);let t=S[S.length-1];S[S.length-1]=S[S.length-2];S[S.length-2]=t}
else if(op==6){if(S.length<2)return d(2);if(S.length>255)return d(3);S.push(S[S.length-2])}
else{if(S.length<3)return d(2);let a=S[S.length-3];S[S.length-3]=S[S.length-2];S[S.length-2]=S[S.length-1];S[S.length-1]=a}
continue}
if(op>15&&op<35&&op!=23&&op!=27&&op!=31){
if(S.length<2)return d(2);
let b=S.pop(),a=S.pop(),r;
if(op>18&&op<23&&!b)return d(4);
r=op==16?(a+b)|0:op==17?(a-b)|0:op==18?Math.imul(a,b):op==19?a==-2147483648&&b==-1?a:(a/b)|0:op==20?b==-1?0:a%b|0:op==21?((a>>>0)/(b>>>0))|0:op==22?(a>>>0)%(b>>>0)|0:op==24?a&b:op==25?a|b:op==26?a^b:op==28?a<<(b&31):op==29?a>>(b&31):op==30?(a>>>(b&31))|0:op==32?a==b?1:0:op==33?a<b?1:0:a>>>0<b>>>0?1:0;
S.push(r);continue}
if(op==23){if(!S.length)return d(2);S[S.length-1]=-S[S.length-1]|0;continue}
if(op==27){if(!S.length)return d(2);S[S.length-1]=~S[S.length-1];continue}
if(op>47&&op<52){
let r=((p[pc-2]|p[pc-1]<<8)<<16)>>16;
if(op==51){if(C.length==64)return d(7);C.push(pc);pc=p[pc-2]|p[pc-1]<<8}
else{let t=1;if(op>48){if(!S.length)return d(2);let v=S.pop();t=op==49?v==0:v!=0}if(t)pc+=r}
continue}
if(op==52){if(!C.length)return d(8);pc=C.pop();continue}
if(op==64){if(!S.length)return d(2);let a=S[S.length-1];if(a<0||a>255)return d(6);S[S.length-1]=M[a];continue}
if(op==65){if(S.length<2)return d(2);let a=S[S.length-1],v=S[S.length-2];if(a<0||a>255)return d(6);S.length-=2;M[a]=v;continue}
if(op==80){if(!S.length)return d(2);let t=String(S[S.length-1]);if(l+t.length>65536)return d(11);S.pop();for(let c of t)o[l++]=c.charCodeAt(0);continue}
if(op==81){if(!S.length)return d(2);if(l>=65536)return d(11);o[l++]=S.pop()&255;continue}
if(op==82){if(S.length>255)return d(3);S.push(i<q.length?q[i++]:-1);continue}
if(op==83){if(!S.length)return d(2);return d(S.pop()&255)}
return d(5)
}
}
for(const id of readdirSync(I).sort()){
let r=run(new Uint8Array(readFileSync(join(I,id,"program.bin"))),new Uint8Array(readFileSync(join(I,id,"input.bin"))));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,"stdout.bin"),r[0]);
writeFileSync(join(O,id,"exit.txt"),r[1]+"\n")
}
