define(["exports","./Matrix2-c6c16658","./RuntimeError-5b082e8f","./when-4bbc8319","./ComponentDatatype-3d0a0aac"],(function(t,a,i,n,e){"use strict";function s(t,a,i,n,e,s,o){const r=function(t,a){return t*a*(4+t*(4-3*a))/16}(t,i);return(1-r)*t*a*(n+r*e*(o+r*s*(2*o*o-1)))}const o=new a.Cartesian3,r=new a.Cartesian3;function h(t,i,n,h){a.Cartesian3.normalize(h.cartographicToCartesian(i,r),o),a.Cartesian3.normalize(h.cartographicToCartesian(n,r),r),function(t,a,i,n,o,r,h){const c=(a-i)/a,d=r-n,u=Math.atan((1-c)*Math.tan(o)),l=Math.atan((1-c)*Math.tan(h)),M=Math.cos(u),g=Math.sin(u),p=Math.cos(l),_=Math.sin(l),f=M*p,m=M*_,C=g*_,H=g*p;let v,O,S,q,b,U=d,w=e.CesiumMath.TWO_PI,A=Math.cos(U),R=Math.sin(U);do{A=Math.cos(U),R=Math.sin(U);const t=m-H*A;let a;S=Math.sqrt(p*p*R*R+t*t),O=C+f*A,v=Math.atan2(S,O),0===S?(a=0,q=1):(a=f*R/S,q=1-a*a),w=U,b=O-2*C/q,isFinite(b)||(b=0),U=d+s(c,a,q,v,S,O,b)}while(Math.abs(U-w)>e.CesiumMath.EPSILON12);const y=q*(a*a-i*i)/(i*i),E=y*(256+y*(y*(74-47*y)-128))/1024,x=b*b,D=i*(1+y*(4096+y*(y*(320-175*y)-768))/16384)*(v-E*S*(b+E*(O*(2*x-1)-E*b*(4*S*S-3)*(4*x-3)/6)/4)),P=Math.atan2(p*R,m-H*A),T=Math.atan2(M*R,m*A-H);t._distance=D,t._startHeading=P,t._endHeading=T,t._uSquared=y}(t,h.maximumRadius,h.minimumRadius,i.longitude,i.latitude,n.longitude,n.latitude),t._start=a.Cartographic.clone(i,t._start),t._end=a.Cartographic.clone(n,t._end),t._start.height=0,t._end.height=0,function(t){const a=t._uSquared,i=t._ellipsoid.maximumRadius,n=t._ellipsoid.minimumRadius,e=(i-n)/i,s=Math.cos(t._startHeading),o=Math.sin(t._startHeading),r=(1-e)*Math.tan(t._start.latitude),h=1/Math.sqrt(1+r*r),c=h*r,d=Math.atan2(r,s),u=h*o,l=u*u,M=1-l,g=Math.sqrt(M),p=a/4,_=p*p,f=_*p,m=_*_,C=1+p-3*_/4+5*f/4-175*m/64,H=1-p+15*_/8-35*f/8,v=1-3*p+35*_/4,O=1-5*p,S=C*d-H*Math.sin(2*d)*p/2-v*Math.sin(4*d)*_/16-O*Math.sin(6*d)*f/48-5*Math.sin(8*d)*m/512,q=t._constants;q.a=i,q.b=n,q.f=e,q.cosineHeading=s,q.sineHeading=o,q.tanU=r,q.cosineU=h,q.sineU=c,q.sigma=d,q.sineAlpha=u,q.sineSquaredAlpha=l,q.cosineSquaredAlpha=M,q.cosineAlpha=g,q.u2Over4=p,q.u4Over16=_,q.u6Over64=f,q.u8Over256=m,q.a0=C,q.a1=H,q.a2=v,q.a3=O,q.distanceRatio=S}(t)}function c(t,i,e){const s=n.defaultValue(e,a.Ellipsoid.WGS84);this._ellipsoid=s,this._start=new a.Cartographic,this._end=new a.Cartographic,this._constants={},this._startHeading=void 0,this._endHeading=void 0,this._distance=void 0,this._uSquared=void 0,n.defined(t)&&n.defined(i)&&h(this,t,i,s)}Object.defineProperties(c.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},startHeading:{get:function(){return this._startHeading}},endHeading:{get:function(){return this._endHeading}}}),c.prototype.setEndPoints=function(t,a){h(this,t,a,this._ellipsoid)},c.prototype.interpolateUsingFraction=function(t,a){return this.interpolateUsingSurfaceDistance(this._distance*t,a)},c.prototype.interpolateUsingSurfaceDistance=function(t,i){const e=this._constants,o=e.distanceRatio+t/e.b,r=Math.cos(2*o),h=Math.cos(4*o),c=Math.cos(6*o),d=Math.sin(2*o),u=Math.sin(4*o),l=Math.sin(6*o),M=Math.sin(8*o),g=o*o,p=o*g,_=e.u8Over256,f=e.u2Over4,m=e.u6Over64,C=e.u4Over16;let H=2*p*_*r/3+o*(1-f+7*C/4-15*m/4+579*_/64-(C-15*m/4+187*_/16)*r-(5*m/4-115*_/16)*h-29*_*c/16)+(f/2-C+71*m/32-85*_/16)*d+(5*C/16-5*m/4+383*_/96)*u-g*((m-11*_/2)*d+5*_*u/2)+(29*m/96-29*_/16)*l+539*_*M/1536;const v=Math.asin(Math.sin(H)*e.cosineAlpha),O=Math.atan(e.a/e.b*Math.tan(v));H-=e.sigma;const S=Math.cos(2*e.sigma+H),q=Math.sin(H),b=Math.cos(H),U=e.cosineU*b,w=e.sineU*q,A=Math.atan2(q*e.sineHeading,U-w*e.cosineHeading)-s(e.f,e.sineAlpha,e.cosineSquaredAlpha,H,q,b,S);return n.defined(i)?(i.longitude=this._start.longitude+A,i.latitude=O,i.height=0,i):new a.Cartographic(this._start.longitude+A,O,0)},t.EllipsoidGeodesic=c}));
